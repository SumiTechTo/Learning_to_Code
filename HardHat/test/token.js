//using mocha framework
const {expect}=require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract",function(){ //it keyword is used toi write tests 
    it("Deployment should assign the total supply of tokens to the owner",async function(){
        const [owner]= await ethers.getSigners(); //getSigners accesses accounts information like balance and address
        console.log("Signers object", owner);
        const Token=await ethers.getContractFactory("Token"); //creates instance

        const hardhatToken = await Token.deploy();//deploying the contract using instance
        const ownerBalance = await hardhatToken.check(owner.address);
        console.log("Owner Address :",owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);//checking if total supply is in the owner's account initially 

    });
    it("Should transfer between accounts",async function(){
        const [owner,addr1,addr2]= await ethers.getSigners(); //getSigners accesses accounts information like balance and address
        console.log("Got info",);
        const Token=await ethers.getContractFactory("Token"); //creates instance

        const hardhatToken = await Token.deploy();//deploying the contract using instance
        await hardhatToken.transfer(addr1.address,10);
        expect(await hardhatToken.check(addr1.address)).to.equal(10); //tranferring 10 tokens from owner to addr1
        //transferring 5 tokens from adr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.check(addr2.address)).to.equal(5);


    });

});