import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const vote = await sdk.getContract("0x6eE2E4DD40377fcA804814d8B37F3b7dA1639c9C", "vote");
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    const vote = await sdk.getContract("0x6eE2E4DD40377fcA804814d8B37F3b7dA1639c9C", "vote");
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent50 = Number(ownedAmount) / 100 * 50;
    await token.transfer(
      vote.getAddress(),
      percent50
    ); 
    console.log("Successfully transferred " + percent50 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();