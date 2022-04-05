// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/// @custom:security-contact dinhthinh.ng@gmail.com
contract NDTToken is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable {
	constructor() ERC20("DThinh", "NDT") {
		_mint(msg.sender, 1000000 * 10**decimals());
	}

	function snapshot() public onlyOwner {
		_snapshot();
	}

	function pause() public onlyOwner {
		_pause();
	}

	function unpause() public onlyOwner {
		_unpause();
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 amount
	) internal override(ERC20, ERC20Snapshot) whenNotPaused {
		super._beforeTokenTransfer(from, to, amount);
	}
}
