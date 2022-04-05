// SPDX-License-Identifier: MIT
// solhint-disable
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockDai is ERC20 {
	constructor() ERC20("Mock Dai", "DAI") {
		_mint(msg.sender, 1000000 * 10**decimals());
	}
}
