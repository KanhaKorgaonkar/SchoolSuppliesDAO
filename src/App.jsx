import { useAddress, ConnectWallet, Web3Button, useContract, useNFTBalance } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  const address = useAddress();
  console.log("Address: ", address);
  const editionDropAddress = "0x1942E920244e8e3AdAeFA770Ea19FA7223Bb0302";
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");
  const { contract: token } = useContract('0x2E068D1BF076551c83AdCc477c53d6C9a9684869', 'token');
  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance]);

  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddresses, setMemberAddresses] = useState([]);

  const shortenAddress = (str) => {
    return str.substring(0,6) + '...' + str.substring(str.length - 4);
  };

  useEffect(() => {
    if (!hasClaimedNFT){
      return;
    }
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop?.history.getAllClaimerAddresses(0);setMemberAddresses(memberAddresses);
        console.log("Member Addresses: ", memberAddresses);
      } catch (error) {
        console.log("Failed to get member list ", error);
      }    
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  useEffect(() => {
    if (!hasClaimedNFT){
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("Member Token Amounts: ", amounts);
      } catch (error) {
        console.log("Failed to get member list ", error);
      }
    };
    getAllBalances();
    }, [hasClaimedNFT, token?.history]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(({holder}) => holder === address);
      return{
        address,
        tokenAmount: member?.balance.displayValue || '0',
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  if(!address) {
  return (
    <div className="landing">
      <h1>SchoolSuppliesDAO</h1>
      <div className="btn-hero">
        <ConnectWallet />
      </div>
    </div>
  );
  }
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🎒DAO Member Page</h1>
        <p>Congratulations on being a member</p>
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mint-nft">
      <h1>Mint a 🎒DAO Membership NFT</h1>
      <div className="btn-hero">
        <Web3Button 
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT
        </Web3Button>
      </div>
    </div>
  );
}
export default App;
