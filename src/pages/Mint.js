import React from "react";
import "./mint.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/SLM.png";
import { NFT, ConnectButton, Icon, Button, useNotification } from "web3uikit";
import bg from "../images/bg.jpg";
import styled from "styled-components";
import { useMoralis, useWeb3ExecuteFunction, useChain } from "react-moralis";

const Mint = () => {
  const { state: id } = useLocation();
  const { switchNetwork, chainId } = useChain();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const dispatch = useNotification();
  const contractAddress = "0xc4F7DA4075f6fF0eCbAAeb6AE7b5fD4F630C21c9";
  const chainID = "0x13881";
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const StyledNFT = styled.div`
    #nft {
      width: 300px;
      height: 400px;
    }
    #nft img {
      width: 300px;
      height: 300px;
    }
  `;

  const handleSuccess = () => {
    dispatch({
      type: "success",
      message: `Nice! You have successfully minted Stinky Little Monster #${id.id}!!`,
      title: "Mint Successful",
      position: "topL",
    });
  };

  const handleError = (msg) => {
    dispatch({
      type: "error",
      message: `${msg}`,
      title: "Mint Failed",
      position: "topL",
    });
  };

  const handleNoAccount = () => {
    dispatch({
      type: "error",
      message: `You need to connect your wallet to Mint a Monster`,
      title: "Not Connected",
      position: "topL",
    });
  };

  const mintNFT = async function (id) {
    let options = {
      contractAddress: contractAddress,
      functionName: "mint",
      abi: abi,
      params: {
        id: id,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (error) => {
        handleError(error.data.message);
      },
    });
  };

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="topBanner">
        <div>
          <Link to="/">
            <img className="logo" src={logo} alt="logo"></img>
            <div className="header">Stinky Little Monsters</div>
          </Link>
        </div>
        <div className="searchReminder">
          <div className="filter">{id.id}</div>
          <div className="searchFiltersIcon">
            <Icon fill="#ffffff" size={20} svg="search" />
          </div>
        </div>
        <div className="lrContainers">
          <ConnectButton />
        </div>
      </div>
      <div className="canvas">
        <StyledNFT>
          <NFT
            address={contractAddress}
            chain="mumbai"
            fetchMetadata
            tokenId={id.id}
          />
        </StyledNFT>
      </div>
      <div class="btn">
        <Button
          text="Mint"
          onClick={() => {
            if (chainId === chainID) {
              if (account) {
                mintNFT(id.id);
              } else {
                handleNoAccount();
              }
            } else {
              switchNetwork(chainID);
            }
          }}
        />
      </div>
    </>
  );
};

export default Mint;
