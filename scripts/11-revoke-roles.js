import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const token = await sdk.getContract("0x2E068D1BF076551c83AdCc477c53d6C9a9684869", "token");
    const allRoles = await token.roles.getAll();
    console.log("Roles that exist now:", allRoles);
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "Roles after revoking me",
      await token.roles.getAll()
    );
    console.log("Successfully revoked roles from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke me from the DAO treasury", error);
  }
})();