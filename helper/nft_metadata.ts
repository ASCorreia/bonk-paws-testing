import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"

import wallet from "../wallet/admin.json"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/bheonnmrSZPuSOn-DNhnt6YZUYw5V0D0sjC8xj4aB1Y"
        const metadata = {
            name: "Rolex Daytona - 16520",
            symbol: "ARTSN",
            description: "This is a watch",
            image,
            attributes: [
                {
                  "trait_type": "Brand",
                  "value": "Rolex"
                },
                {
                  "trait_type": "Model",
                  "value": "Daytona"
               },
               {
                  "trait_type": "Reference Number",
                  "value": "16520"
                },
                {
                    "trait_type": "Diamater",
                    "value": "44"
                },
                {
                    "trait_type": "Movement",
                    "value": "Automatic"
                },
                {
                    "trait_type": "Dial Color",
                    "value": "Black"
                },
                {
                    "trait_type": "Case Material",
                    "value": "Steel"
                },
                {
                    "trait_type": "Bracelet Material",
                    "value": "Steel"
                },
                {
                    "trait_type": "Year of Production",
                    "value": "1995"
                },
              ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
        };
        const myUri = await bundlrUploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();