import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
import Talon from './artifacts/contracts/Talon.sol/Talon.json'
import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import Profile from "./Profile"
import { useAuth0 } from "@auth0/auth0-react";

//Greeter deployed to: 0x8E5F868d350E7b3D1c453E2c1CfD655fE22226fd
const greeterAddress = "0x8E5F868d350E7b3D1c453E2c1CfD655fE22226fd"
const tokenAddress = "0x94fD79EcA3e995C939876eBAaB4f25cf83bFCC8c"
const talonAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
//set consts


function App() {

  const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  const [name, setName] = useState()
  // passing variables
  const { user, isAuthenticated, isLoading } = useAuth0();


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }




  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
        // me
        setGreetingValue(data)
        //greetx = data;
        //console.log('greetx: ', greetx)

      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
/*
  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }
*/
  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }
/*
  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }

  }
*/ 
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
         <div>
        <button onClick={fetchGreeting}>Fetch Greeting</button>
          </div>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
        <div>
        <p></p>
         <fetchGreeting/>
         </div> 
 
      <button onClick={getName}>get name</button>
      < LogoutButton />
      

    </div>
    
  );
}

export default App;
// https://www.youtube.com/watch?v=a0osIaAOFSE&t=3296s
// https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13

//Greeter deployed to: 0xcBeD787E8e2b32F679a7e1E31Fb411B3a94E6D24


//Greeter deployed to: 0x8E5F868d350E7b3D1c453E2c1CfD655fE22226fd
//Token deployed to: 0x94fD79EcA3e995C939876eBAaB4f25cf83bFCC8c
