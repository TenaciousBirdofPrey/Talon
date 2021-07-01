import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Talon from './artifacts/contracts/Talon.sol/Talon.json'
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import Profile from "./Profile"
import { useAuth0 } from "@auth0/auth0-react";

const randoAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
const talonAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
//set consts


function App() {

  //const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  const [name, setName] = useState()
  const [data, setData] = useState()
  const [symbol, setSymbol] = useState()
  // passing variables
  const { user, isAuthenticated, isLoading } = useAuth0();


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

// call the smart contract, get contract name--mainly to test if connection is live
  async function fetchName() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(talonAddress, Talon.abi, provider)
      try {
        const data = await contract.name()
        const symbol = await contract.symbol()
       
        setData(data)
        setSymbol(symbol)
        
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

// call the smart contract, Mint
  async function setMint() {

   // if (!name) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      console.log("signer: ", provider.getAddress)
      const contract = new ethers.Contract(talonAddress, Talon.abi, signer)
      const transaction = await contract.safeMint( randoAddress ,user.sub.slice(8))
      await transaction.wait()

      //fetchName()
    }
  }
// get owner and stuff- takes in tokenID which is twittuser?
async function fetchOwnerOf() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(talonAddress, Talon.abi, provider)
      try {
        const ownerOf = await contract.ownerOf(user.sub.slice(8))
        console.log('Owner Of ', ownerOf)
       
    
        
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  return (
    <div className="App">
       <div className ="Content">
       <h1> TALON </h1>
       <p>Create a Talon to link your NFT Collection to Your Twitter Account</p>
    
       </div>
       < LoginButton />
        < Profile />
             
              <h3>Your Twitter Account Number:</h3>
        <p>  {isAuthenticated && (user.sub.slice(8) ) } </p>
        <button onClick={fetchName}>Fetch Contract Info</button>
     <h4>Contract Name: { data }</h4>
     <h4>Contract symbol: { symbol }</h4>
       
     <button onClick={setMint}>Mint</button>
      <div>
     <button onClick={fetchOwnerOf}>Fetch Owner</button>
      </div>

      <LogoutButton />
      

    </div>
    
  );
}

export default App;
/* 
 // https://www.youtube.com/watch?v=a0osIaAOFSE&t=3296s
// https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13


*/