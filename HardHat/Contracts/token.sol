//SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

contract Token{
    string public name="First Token";
    string public symbol="FTN";
    uint public totalSupply=10000;

    address public owner;
    mapping(address=> uint) balances;
    constructor(){
            balances[msg.sender]=totalSupply;
            owner=msg.sender;

    }

    function transfer(address to,uint amount) external {
        require(balances[msg.sender]>=amount,"Not enough tokens");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
    } 

    function check(address account) external view returns(uint){
        return balances[account];
    }
}