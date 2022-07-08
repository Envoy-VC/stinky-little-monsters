import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/bg.jpg";
import logo from "../images/SLM.png";
import { ConnectButton, Icon, Input, Button, LinkTo } from "web3uikit";
import { useState } from "react";

const Home = () => {
  const [id, setId] = useState(1);
  const contractAddress = "0xc4F7DA4075f6fF0eCbAAeb6AE7b5fD4F630C21c9";
  const polygonscan =
    "https://mumbai.polygonscan.com/address/" + contractAddress;
  const random = () => {
    return Math.floor(Math.random() * 10 + 1);
  };

  return (
    <>
      <div className="container" style={{ backgroundImage: `url(${bg})` }}>
        <div className="containerGradinet"></div>
      </div>
      <div className="topBanner">
        <div>
          <img className="logo" src={logo} alt="logo"></img>
          <div className="header">Stinky Little Monsters</div>
        </div>
        <div className="tabs">
          <div className="selected">Mint</div>
        </div>
        <div className="lrContainers">
          <LinkTo text="Polygonscan" type="external" address={polygonscan} />
          <ConnectButton />
        </div>
      </div>
      <div className="tabContent">
        <div className="searchFields">
          <div className="inputs">
            Id
            <Input
              value={1}
              name="Search Id"
              type="number"
              onChange={(event) => setId(Number(event.target.value))}
              traditionalHTML5
            />
          </div>
          <Link
            to={"/mint"}
            state={{
              id: id,
            }}
          >
            <div className="searchButton">
              <Icon fill="#ffffff" size={24} svg="search" />
            </div>
          </Link>
        </div>
      </div>
      <div className="randomLocation">
        <div className="title">Feel Adventurous</div>
        <div className="text">Search for a random Monster to Tame.</div>
        <Link
          to={"/mint"}
          state={{
            id: random(),
          }}
        >
          <Button text="Let's Go!" onClick={() => console.log("hello")} />
        </Link>
      </div>
    </>
  );
};

export default Home;
