import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  throw new Error('Private key is not found');
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  throw new Error('Wallet address is not found');
}

if (!process.env.QUICKNODE_API_URL || process.env.QUICKNODE_API_URL === "") {
  throw new Error('Quicknode API URL is not found');
}

const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY,
    process.env.QUICKNODE_API_URL
);

(async () => {
    try{
        const address = await sdk.getSigner().getAddress();
        console.log("SDK initialized by address: ", address);
    } catch (err){
        console.log("Error: ", err);
        process.exit(1);
    }
}
) ();

export default sdk;