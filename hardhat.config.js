require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
	defaultNetwork: "hardhat",
	paths: {
    	artifacts: './src/artifacts',
  	},

  networks: {
    hardhat: {
      chainId: 1337
    },
   ropsten:{
   	url: "https://ropsten.infura.io/v3/9af1cbbc9d7444999916033301f971e3" ,
   	accounts: [`0x${process.env.CASPER_PK}`]
   }
  },
	solidity: {compilers: [   {version: "0.8.0"},{version: "0.8.3"}]}

	//"0.7.3",
};


