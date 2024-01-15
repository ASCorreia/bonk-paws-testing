import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"
import { readFile } from 'fs/promises'

import wallet from "../wallet/admin.json"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(myKeypairSigner));

(async () => {
    try {
        const image = await readFile('./image/watch.png');
        const nft_image = createGenericFile(image, "Watch")

        const [myUri] = await bundlrUploader.upload([nft_image]);
 
        console.log(myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();