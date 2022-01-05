/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";
import InputRange from 'react-input-range';


export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(1);

    const myMin = 1
    const myMax = 5

    return (
      <>

        <button
          onClick={() => mintCount > myMin ? setMintCount(mintCount - 1) : setMintCount(mintCount)}
          disabled={isMinting}
          className="stepperButton"
        >-</button>
        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="startMintButton"
        >
          {isMinting ? "loading" : `mint ${mintCount}`}
        </button>
        <button
          onClick={() => mintCount < myMax ? setMintCount(mintCount + 1) : setMintCount(mintCount)}
          disabled={isMinting}
          className="stepperButton"
        >+</button>
      </>
    );
  };


  return (
    <>
      <Head>
        <title>SCG Mint</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="background-image">
        <Toaster />
        <div className="navBar">
          {connected && (
          <div className="nftHeading tab mr-auto text-sm">
            <p>Remaining: {nftsData.itemsRemaining}</p>
          </div>
            <div className="solBalance">
              <p>Balance: {balance.toFixed(2)} SOL</p>
              <p></p>
            </div>
          )}
          <WalletMultiButton />
        </div>

        <div className="mint-container">
          <h1 className="specialFont" >Solana Cat Gang Mint</h1>
          <p className="specialFont">0.25 SOL</p>
          <img className="main_image" src="/imgs/main_image.gif" alt="logo" />
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                  <div className="soldOut">
                    <p>SOLD OUT</p>
                  </div>
                  ) : (
                    <div>
                                <div className="tipsFont">
                        <p>Tips:</p>
                        <p className="tab">1. Use the - and + signs to adjust how many NFTs you want to mint</p>
                        <p className="tab">2. Once you click approve and see "loading", refresh the page to mint again.  Network issues may cause it to get stuck, refreshing will resolve this issue.</p>
                      </div>
                      <div className="mintButton">
                        <MintMany />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
                  onComplete={() => setIsMintLive(true)}
                  className="connectWalletPrompt specialFont"
                />
              )}
            </>
          ) : (
            <div className="connectWalletPrompt specialFont">
              <p>Connect wallet to mint</p>
            </div>
          )}
        </div>


        {/* {connected && (
        <div className="nftContainer">
          <div className="nftHeading">
            <p>My Gremlins</p>
          </div>
          <div className="nftDisplayWrapper">
            {(nfts as any).map((nft: any, i: number) => {
              return <AnNFT key={i} nft={nft} />;
            })}
          </div>
        </div>
        )} */}
      </div>
        
    </>
  );
}
