// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
   
    
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(recipient != address(0), "ERC20: transfer to the zero address");
        return super.transfer(recipient, amount);
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function burn(uint256 amount) public {
    require(balanceOf(msg.sender) >= amount, "ERC20: insufficient balance");
    _burn(msg.sender, amount);
}
}


