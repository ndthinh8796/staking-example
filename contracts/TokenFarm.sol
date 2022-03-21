// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

error noTokenStaked();
error notEnoughAmount();
error tokenNotAllowed();
error emptyStakingBalance();

contract TokenFarm is Ownable {
	// map token adress => staker adress => amount
	mapping(address => mapping(address => uint256)) public stakingBalance;
	mapping(address => uint256) public uniqueTokenStaked;
	mapping(address => address) public tokenPriceFeedMapping;
	address[] public allowedTokens;
	address[] public stakers;
	IERC20 public ndtToken;

	constructor(address _ndtTokenAddress) {
		ndtToken = IERC20(_ndtTokenAddress);
	}

	function setPriceFeedContract(address _token, address _priceFeed) public onlyOwner {
		tokenPriceFeedMapping[_token] = _priceFeed;
	}

	function issueTokensReward() public onlyOwner {
		for (uint256 stakersIndex; stakersIndex < stakers.length; stakersIndex++) {
			address recipient = stakers[stakersIndex];
			uint256 userTotalValueStaked = getUserTotalStakedValue(recipient);
			// send user token reward base on their total staking value
			ndtToken.transfer(recipient, userTotalValueStaked);
		}
	}

	function getUserTotalStakedValue(address _user) public view returns (uint256 total) {
		if (uniqueTokenStaked[_user] <= 0) revert noTokenStaked();
		for (
			uint256 allowedTokensIndex = 0;
			allowedTokensIndex < allowedTokens.length;
			allowedTokensIndex++
		) {
			total += getUserSingleTokenValue(_user, allowedTokens[allowedTokensIndex]);
		}
		return total;
	}

	function getUserSingleTokenValue(address _user, address _token) public view returns (uint256) {
		if (uniqueTokenStaked[_user] <= 0) {
			return 0;
		}
		// Price of the token * stakingBalance[_token][user]
		(uint256 price, uint256 decimals) = getTokenValue(_token);

		return (stakingBalance[_token][_user] * price) / (10**decimals);
	}

	// Return token value from Chainlink Pricefeed
	function getTokenValue(address _token) public view returns (uint256, uint256) {
		address priceFeedAddress = tokenPriceFeedMapping[_token];
		AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeedAddress);
		(, int256 price, , , ) = priceFeed.latestRoundData();
		uint256 decimals = priceFeed.decimals();
		return (uint256(price), decimals);
	}

	function stakeTokens(uint256 _amount, address _token) public {
		if (_amount <= 0) revert notEnoughAmount();
		if (!isTokenAllowed(_token)) revert tokenNotAllowed();
		IERC20(_token).transferFrom(msg.sender, address(this), _amount);
		updateUniqueTokenStaked(msg.sender, _token);
		// Add total amount user have staked this token
		stakingBalance[_token][msg.sender] += _amount;
		// User's first time staking, add to stakers array
		if (uniqueTokenStaked[msg.sender] == 1) {
			stakers.push(msg.sender);
		}
	}

	function unStakeToken(address _token) public {
		uint256 balance = stakingBalance[_token][msg.sender];
		if (balance <= 0) revert emptyStakingBalance();
		// reset balance
		stakingBalance[_token][msg.sender] = 0;
		// decrease number of unique token staked
		uniqueTokenStaked[msg.sender] = uniqueTokenStaked[msg.sender] - 1;
		// remove staker
		if (uniqueTokenStaked[msg.sender] == 0) {
			removeStaker(msg.sender);
		}
		IERC20(_token).transfer(msg.sender, balance);
	}

	function removeStaker(address _user) internal {
		for (uint256 stakersIndex = 0; stakersIndex < stakers.length; stakersIndex++) {
			if (stakers[stakersIndex] == _user) {
				stakers[stakersIndex] = stakers[stakers.length - 1];
				stakers.pop();
				break;
			}
		}
	}

	// Count how many unique token user have staked
	function updateUniqueTokenStaked(address _user, address _token) internal {
		if (stakingBalance[_token][_user] <= 0) {
			uniqueTokenStaked[_user] += 1;
		}
	}

	// Check if token is in allowed tokens
	function isTokenAllowed(address _token) public view returns (bool) {
		for (
			uint256 allowedTokensIndex = 0;
			allowedTokensIndex < allowedTokens.length;
			allowedTokensIndex++
		) {
			if (allowedTokens[allowedTokensIndex] == _token) {
				return true;
			}
		}
		return false;
	}

	// Add token to allowed tokens
	function addAllowedToken(address _token) public onlyOwner {
		allowedTokens.push(_token);
	}
}
