require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");

const main = async() =>{

    const gameContractFactory = await hre.ethers.getContractFactory('EpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Doge", "Pepe", "Pikachu"],       // Names
        ["https://i.imgur.com/LjjNk4i.jpeg", // Images
        "https://i.imgur.com/8nLFCVP.png", 
        "https://i.imgur.com/WMB6g9u.png"],
        [250,400,150],                    // HP values
        [100, 25, 50],           //Attack values
        "Giga Chad",
        "https://i.imgur.com/5BQHDzh.jpeg",
        6900,
        42
    );
    await gameContract.deployed();

    console.log("Deployed too", gameContract.address);

    await pending(60000);
  
  await hre.run("verify:verify", {
    address:gameContract.address,
    constructorArguments: [
        ["Doge", "Pepe", "Pikachu"],       // Names
        ["https://i.imgur.com/LjjNk4i.jpeg", // Images
        "https://i.imgur.com/8nLFCVP.png", 
        "https://i.imgur.com/WMB6g9u.png"],
        [250,400,150],                    // HP values
        [100, 25, 50],           //Attack values
        "Giga Chad",
        "https://i.imgur.com/5BQHDzh.jpeg",
        6900,
        42
    ],
  });


}

function pending(ms){
    return new Promise(resolve => setTimeout(resolve, ms)) ;
  }


const runMain = async() => {
  
    try{
        await main();
        process.exit(0);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

runMain();