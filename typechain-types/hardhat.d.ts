/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AggregatorInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorInterface__factory>;
    getContractFactory(
      name: "AggregatorV2V3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV2V3Interface__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "AggregatorV3Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AggregatorV3Interface__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20Snapshot",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Snapshot__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "NDTToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NDTToken__factory>;
    getContractFactory(
      name: "MockDai",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockDai__factory>;
    getContractFactory(
      name: "MockV3Aggregator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockV3Aggregator__factory>;
    getContractFactory(
      name: "MockWeth",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockWeth__factory>;
    getContractFactory(
      name: "TokenFarm",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenFarm__factory>;

    getContractAt(
      name: "AggregatorInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorInterface>;
    getContractAt(
      name: "AggregatorV2V3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV2V3Interface>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "AggregatorV3Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AggregatorV3Interface>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "ERC20Snapshot",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Snapshot>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "NDTToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NDTToken>;
    getContractAt(
      name: "MockDai",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockDai>;
    getContractAt(
      name: "MockV3Aggregator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockV3Aggregator>;
    getContractAt(
      name: "MockWeth",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockWeth>;
    getContractAt(
      name: "TokenFarm",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenFarm>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}