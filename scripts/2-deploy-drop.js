import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try{
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "SchoolSuppliesDAO",
            description: "A DAO to provide school supplies to underprivileged students.",
            image: readFileSync("scripts/assets/image.jpeg"),
            primary_sale_recipient: AddressZero,
        });
        const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
        const metadata = await editionDrop.metadata.get();
        console.log("Edition drop deployed at address: ", editionDropAddress);
        console.log("Edition drop metadata: ", metadata);
    } catch (err){
        console.log("Error: ", err);
    }
})();