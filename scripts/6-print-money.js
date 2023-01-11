import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    const amount = 1_000_000;
    await token.mint(amount);
    const totalSupply = await token.totalSupply();

    console.log("Currently, ", totalSupply.displayValue, "$SSDAO are in circulation");
  } catch (error) {
    console.error("Error: ", error);
  }
})();