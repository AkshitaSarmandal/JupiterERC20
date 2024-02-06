// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.15;

contract JupiterERC{
    string public name = "Jupiter";
    string public symbol = "JTR";
    uint public totalSupply = 1000;
    mapping (address => uint) userBalance;

    constructor(){
        userBalance[msg.sender] = totalSupply;
    }
    event Transfer (address recipient, address sender, uint amount);

    function balanceOf(address _userAddress) public view returns(uint){
        return userBalance[_userAddress];   
    }

    function transfer(address _recipient, uint _amount) public {
        require(balanceOf(msg.sender) >= _amount, "JupiterERC: Insufficient balance to perform transfer");
        userBalance[msg.sender] -= _amount;
        userBalance[_recipient] += _amount;
        emit Transfer(_recipient, msg.sender, _amount);
    }
}