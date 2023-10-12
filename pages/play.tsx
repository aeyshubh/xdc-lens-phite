'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import { abi2 } from '../utils/lensOracle';
import {ethers } from "ethers";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { abi4 } from '../utils/nft';
import  dotenv from 'dotenv';
import * as PushAPI from "@pushprotocol/restapi";
const buttonClickSound = '/sounds/smb_coin.mp3';

function Play() {
dotenv.config();
  const PK = process.env.PK // channel private key
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [profile, setProfile] = useState('');
  const [secondP, setsecondP] = useState('');
  const [secondId, setsecondId] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
const [a1,seta1] = useState(0);
const [a2,seta2] = useState(0);
const [a3,seta3] = useState(0);

const [a4,seta4] = useState(0);
const [a5,seta5] = useState(0);
const [a6,seta6] = useState(0);

const [n1,setn1] = useState('');
const [n2,setn2] = useState('');


  const [winner, setWinner] = useState(false);
  const [secondAddress, setSecondAddress] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  // Animation and battle function
  const abi_OueryOracle = abi2;
  //const contractAddress_OueryOracle = '0x72479FBcF03C749D7687000a403Db2061c8cc475';


  const playedOnce = 0;
  const sendNotification = async(p1:string,p2:string,_s1:number) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `Lens Phite Match Results`,
          body: `We just had a Fight in Lens Phite`
        },
        payload: {
          title: `Lens Phite Results`,
          body: `${p1} WON against ${p2} with ${_s1} Score`,
          cta: '',
          img: ''
        },
        channel: 'eip155:5:0x82a7A0828fa8EB902f0508620Ee305b08634318A',
        env: 'staging',
      });
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  //const users = ["0x01", "0x7a", "0x8fef", "0x02", "0x015", "0x3aed", "0x06", "0x0202"]
  //const users = ["0x27f9","0x149d","0x015777","0x015f34","0x0134b0","0x0f85"]
  const users = ["0x27f9","0x149d","0x015777","0x015f34","0x0134b0","0x0f85"]

  //const users = ["0x02","0x8fef", "0x7a"];
  // const { address, isConnected, isDisconnected } = useAccount();
  // const address = data?.address;
  var response;
  let provider;
  let signer;
  const { address, isConnected, isDisconnected } = useAccount();
  // const address = data?.address;
  const API_URL = 'https://api.lens.dev/'
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  })
  let contractWrite;
  useEffect(() => {
    fetchProfiles(),
    fetchSecondProfile()

  },[])
const specialAttacks = async() =>{
}
  const handleEvent = async () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 1000);
    try{
mintNft();
  
  }catch(error){
    console.log("erros sporrted",error);
    }
  };


  const fetchProfiles = async () => {
    try {
      /* fetch profiles from Lens API */
      let defaultProfile = gql`
query DefaultProfile {
  defaultProfile(
    request: { ethereumAddress: "${address}" }
  ) {
    id
    name
    bio
    followNftAddress
    metadata
    handle
    ownedBy
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
  }
}
 
`
      response = await client.query({ query: defaultProfile }).then(async (value) => {
        /* return profiles with profile pics  */
        console.log(`Profile : ${value.data.defaultProfile.stats.totalFollowers}`)
        seta1(value.data.defaultProfile.stats.totalFollowers *500)
        seta2(value.data.defaultProfile.stats.totalFollowing *500)
        seta3(value.data.defaultProfile.stats.totalPosts *300)

        setHandle(value.data.defaultProfile.handle)
        setId(value.data.defaultProfile.id)
console.log("id is",pid);
setScore1(a1+a2+a3);

        // write?.()

      })
      console.log(address)

    } catch (err) {
      console.log({ err })
    }
  }

  const fetchSecondProfile = async () => {
    try {
      /* fetch profiles from Lens API */
      //const contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
console.log("In fetch second")
      let index = Math.floor(Math.random() * users.length);
      let profile = users[index]
      console.log(`Index : ${profile}`)
      let defaultProfile = gql`query Profile {
profile(request: { profileId: "${profile}" }) {
id
name
handle
followNftAddress
ownedBy
stats {
totalFollowers
totalFollowing
totalPosts
totalComments
totalMirrors
totalPublications
totalCollects
}

}
}`
      setsecondId(profile);
      response = await client.query({ query: defaultProfile }).then(async (value) => {
        /* return profiles with profile pics  */
        //console.log("second Player", value.data.profile.handle);
        console.log(`Value is ${JSON.stringify(value)}`)
        seta4(value.data.profile.stats.totalFollowers *500)
        seta5(value.data.profile.stats.totalFollowing *500)
        seta6(value.data.profile.stats.totalPosts *300)

        setsecondP(value.data.profile.handle);
        setsecondId(profile)
        setSecondAddress(value.data.profile.ownedBy)
        setScore2(a4+a5+a6);
      })
      //console.log(address)

    } catch (err) {
      console.log({ err })
    }
  }


  async function mintNft() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    const nftContract = "0x72C86E4C9f5da968093f3bB23D9fD8d028B6B965";
    //const nftContract = "0x9926566A54B0fBA12F1773877492d350c5d2ad26";

    const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);
  
    //console.log("Adderss 2nd",secondAddress);
    let s1 = a1+a2+a3;
    let s2 = a4+a5+a6;
    console.log(s1+ "" + s2)
    if (s1 > s2 && s2 != 0) {
      console.log('Player 1 is winner')
      alert("Winner is Player 1");
      const writen2 = await contractWrite2.train();
      sendNotification(handle,secondP,s1);

    }
    if (score1 == score2 && score1 != 0) {
      console.log("That's a Draw")
      alert("That's a Draw");

      const writen2 = await contractWrite2.train();
      const writen3 = await contractWrite2.trainop(secondAddress,secondP, { gasLimit: 5000000 });
    }
    if (s2 > s1) {
      alert("Player 2 has higher scores,use Special attacks");
      const nft = await contractWrite2.balanceOf(secondAddress);
      console.log(`balance = ${nft}`)
      if(nft ==0){
        console.log("In minting")
        const sts = await contractWrite2.mintOtherNft(secondAddress , {gasLimit:5000000} )
        console.log(sts);
        const nft = await contractWrite2.balanceOf(secondAddress);
        console.log(`balance = ${nft}`)
        const writen3 = await contractWrite2.trainop(secondAddress,secondP , { gasLimit: 5000000 } );
        sendNotification(secondP,handle,s2);
      }else{
        const writen3 = await contractWrite2.trainop(secondAddress,secondP, { gasLimit: 5000000 });
        sendNotification(secondP,handle,s2);
     
      }
      setScore1(0);

 // const writen3 = await contractWrite2.trainop(secondAddress,secondP, { gasLimit: 500000 });
    }
  }

  return (
    <>

      <div className="w-9/12 h-4/6 mt-6 flex items-start justify-between bg-black bg-[url('/images/battle-arena.png')] bg-[77%]">

        {/*     {winner && <Confetti
      width={width}
      height={height}
    />} */}
        <div className="w-4/12 p-2 ml-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{handle}</h5>
          <h5 className="text-xl font-bold font-jose">{a1+a2+a3}</h5>
          <p className="text-base font-jose">{pid}</p>
          <p className="text-base font-jose">Followers(*500):  {a1}</p>
          <p className="text-base font-jose">Following(*500):  {a2}</p>
          <p className="text-base font-jose">Post(*300): {a3}</p>

        </div>
        <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? 'translate-x-16 transition-transform' : ''
          }`} width={225} height={225} />
        <div className='self-center'>
          <h1 className="text-8xl mb-5 text-center font-extrabold tracking-tight leading-none customText font-vt">VS</h1>
          <button onClick={handleEvent} className='play-battle-btn font-jose'>BATTLE</button>
          <button onClick={specialAttacks} className='play-battle-btn font-jose'>Use Attacks</button>

        </div>
        <img src='/images/avatar-right.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? '-translate-x-16 transition-transform' : ''
          }`} width={225} height={225} />
        <div className="w-4/12 p-2 mr-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{(secondP)}</h5>
          <h5 className="text-xl font-bold font-jose">{a4+a5+a6}</h5>
          <p className="text-base font-jose">{secondId}</p>
          <p className="text-base font-jose">Followers(*500): {a4}</p>
          <p className="text-base font-jose">Following(*500):  {a5}</p>
          <p className="text-base font-jose">Post(*300): {a6}</p>
        </div>
      </div>
    </>
  )
}
export default Play