import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

(async () => {
    try{
        const editionDrop = await sdk.getContract("0x1942E920244e8e3AdAeFA770Ea19FA7223Bb0302", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Red Backpack",
                description: "This NFT will give you access to SchoolSuppliesDAO",
                image: readFileSync("scripts/assets/backpack.jpeg"),
            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    }
    catch (err){
        console.log("Error: ", err);
    }
})();