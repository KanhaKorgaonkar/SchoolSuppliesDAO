import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x1942E920244e8e3AdAeFA770Ea19FA7223Bb0302", "edition-drop");
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to buy SSDAO NFTs!",
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("Airdropping", randomAmount, "tokens to", address);
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();