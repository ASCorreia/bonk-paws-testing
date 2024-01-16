import { Connection, Keypair, PublicKey, VersionedTransaction, SystemProgram, SYSVAR_INSTRUCTIONS_PUBKEY, Transaction, TransactionInstruction, AddressLookupTableAccount, TransactionMessage, Ed25519Program } from '@solana/web3.js';
import { IDL, BonkForPaws } from '../programs/bonkForPaws';
import { Program, Wallet, AnchorProvider, Address, BN } from "@project-serum/anchor"
import {Key, MPL_TOKEN_METADATA_PROGRAM_ID} from '@metaplex-foundation/mpl-token-metadata';

import fetch from 'cross-fetch';

import wallet from "../wallet/admin.json";
// add bonkWallet

import { TOKEN_PROGRAM_ID, createBurnInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { token } from '@project-serum/anchor/dist/cjs/utils';

let donor = Keypair.fromSecretKey(new Uint8Array(wallet));
let authority = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.mainnet-beta.solana.com");
const provider = new AnchorProvider(connection, new Wallet(donor), { commitment: "confirmed"});
const program = new Program<BonkForPaws>(IDL, "..." as Address, provider);

const confirm = async (signature: string): Promise<string> => {
    const block = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        signature,
        ...block
    })
    return signature
}

const log = async(signature: string): Promise<string> => {
    console.log(`Your transaction signature: https://explorer.solana.com/transaction/${signature}`);
    return signature;
}

const getQuote = async (
    amount: number
) => {
    return fetch(
        `https://quote-api.jup.ag/v6/quote?outputMint=So11111111111111111111111111111111111111112&inputMint=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263&amount=${amount}&slippage=0.5&onlyDirectRoutes=true`
    ).then((response) => response.json());
};

const deserializeInstruction = (instruction: any) => {
    return new TransactionInstruction({
      programId: new PublicKey(instruction.programId),
      keys: instruction.accounts.map((key: any) => ({
        pubkey: new PublicKey(key.pubkey),
        isSigner: key.isSigner,
        isWritable: key.isWritable,
      })),
      data: Buffer.from(instruction.data, "base64"),
    });
};
  
const getAddressLookupTableAccounts = async (
    keys: string[]
): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccountInfos =
      await connection.getMultipleAccountsInfo(
        keys.map((key) => new PublicKey(key))
      );
  
    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
      const addressLookupTableAddress = keys[index];
      if (accountInfo) {
        const addressLookupTableAccount = new AddressLookupTableAccount({
          key: new PublicKey(addressLookupTableAddress),
          state: AddressLookupTableAccount.deserialize(accountInfo.data),
        });
        acc.push(addressLookupTableAccount);
      }
  
      return acc;
    }, new Array<AddressLookupTableAccount>());
};
  
const addressLookupTableAccounts: AddressLookupTableAccount[] = [];

(async () => {

    // @Resiquent => do this
    // Fetch ID for the Charity Org

    const id = new BN(123456)
    const charity = new Keypair().publicKey;

    const wsol = new PublicKey("So11111111111111111111111111111111111111112")
    const donorWsol = getAssociatedTokenAddressSync(donor.publicKey, wsol);
    const bonk = new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263")
    const donorBonk = getAssociatedTokenAddressSync(donor.publicKey, bonk);
    const authorityBonk = getAssociatedTokenAddressSync(authority.publicKey, bonk);

    let amountDonated = 10

    const quoteResponse = await getQuote(amountDonated);
    console.log(quoteResponse);

    let minAmount = new BN(quoteResponse.outAmount);

    const signatureIx = Ed25519Program.createInstructionWithPrivateKey({
      privateKey: donor.secretKey, // @Leo, ping me to sync + double check the signing authority
      message: charity.toBuffer(), // This can be replaced by the ID (Program to be changed accordingly)
    });

    let donationState = PublicKey.findProgramAddressSync([Buffer.from('donation_state')], program.programId)[0];

    const donateIx = await program.methods
    .donate(new BN(amountDonated), minAmount)
    .accounts({
        donor: donor.publicKey,
        authority: authority.publicKey,
        charity,
        bonk,
        donorBonk,
        authorityBonk,
        wsol,
        donorWsol,
        donationState,
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedTokenProgram: TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
    })
    .instruction()
    
    const instructions = await (
        await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteResponse,
                userPublicKey: donor.publicKey.toBase58(),
            })
        })
    ).json();
      
    if (instructions.error) {
        throw new Error("Failed to get swap instructions: " + instructions.error);
    }

    const {
        tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
        computeBudgetInstructions, // The necessary instructions to setup the compute budget.
        setupInstructions, // Setup missing ATA for the users.
        swapInstruction: swapInstructionPayload, // The actual swap instruction.
        cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
        addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
    } = instructions;
      
    addressLookupTableAccounts.push(
        ...(await getAddressLookupTableAccounts(addressLookupTableAddresses))
    );

    const finalizeIx = await program.methods
    .finalize()
    .accounts({
        donor: donor.publicKey,
        charity,
        wsol,
        donorWsol,
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        associatedTokenProgram: TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
    })
    .instruction()

    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const messageV0 = new TransactionMessage({
        payerKey: donor.publicKey,
        recentBlockhash: blockhash,
        instructions: [
            signatureIx,
            donateIx,
            deserializeInstruction(swapInstructionPayload),
            finalizeIx
        ],
    }).compileToV0Message(addressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([donor]);

    try {
        // const txid = await connection.sendTransaction(transaction);
        // console.log(`https://explorer.solana.com/tx/${txid}`);
    } catch (e) {
        console.log(e);
        throw e;
    }

})();
