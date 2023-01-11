import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {

  try {
    const vote = await sdk.getContract("0x6eE2E4DD40377fcA804814d8B37F3b7dA1639c9C", "vote");
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    const amount = 0;
    const description =
      "Should the DAO transfer " +
      amount +
      " tokens from the treasury to " +
      process.env.WALLET_ADDRESS +
      " for helping out with logistics?";
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create proposal", error);
  }
})();