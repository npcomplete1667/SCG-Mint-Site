/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

export default function AnNFT({ nft }: any) {
  useEffect(() => {
    console.log(nft);
  }, []);

  return (
    <div className="nftCard">
      <img src={nft.image} alt={nft.description || nft.name} />
      <div className="nftCardText">
        <p>{nft.name}</p>
        <p className="font-bold">{nft.symbol}</p>
      </div>
    </div>
  );
}
