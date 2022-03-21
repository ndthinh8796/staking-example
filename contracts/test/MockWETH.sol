// SPDX-License-Identifier: MIT
// solhint-disable
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockWeth is ERC20 {
	constructor() ERC20("Mock WETH", "WETH") {}
}
