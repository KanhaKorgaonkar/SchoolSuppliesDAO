import sdk from './1-initialize-sdk.js';

(async () => {
    try{
        const editionDrop = await sdk.getContract("0x1942E920244e8e3AdAeFA770Ea19FA7223Bb0302", "edition-drop");
        const claimConditions = [
            {
                startTime: new Date(),
                maxClaimable: 50_000,
                maxClaimablePerWallet: 10,
                price: 0.05,
                currency: "ETH",
                waitInSeconds: 0,
            }
        ]
        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("Successfully set claim conditions for the drop!");
    } catch (err){
        console.log("Error: ", err);
    }
})();