# Staking Example DApp

A simple staking contract connected to a Nextjs Front end.

## Features

- User can connect Metamask wallet to stake and withdraw
- Owner can issue reward to staked users
- Issue and reward your own token
- Supported tokens: Wone, Weth, Dai

## Tech

- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [NextJS](https://nextjs.org/) - The React Framework
  for Production!
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework

## Configuration

These following steps is for deploying and using contract on Harmony testnet. You can change to any network you like by changing the config.

### Step 1. Set up environment variables

Copy the .env.example file in this directory to .env (which will be ignored by Git):

```
cp .env.example .env
```

Then set each variable on .env.local:

- PRIVATE_KEY should be the [private key of your Metamask wallet.](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

Your .env file should look like this:

```
PRIVATE_KEY=...
```

### Step 2. Install dependencies

```shell
npm install

# or

yarn
```

### Step 3. Deploy your own contract

```shell
npx hardhat run scripts/deployToHarmony.ts --network harmony_testnet

# or

hh run scripts/deployToHarmony.ts --network harmony_testnet
```

Your contract should be deployed to Harmony Testnet. The staking contract and token contract address should be printed on terminal.

```shell
NDTToken deployed to: ...
TokenFarm deployed to: ...
```

You can check the address on https://explorer.pops.one/

### Step 4. Copy contract abi to front end

```shell
cp -R artifacts front_end/src/lib/
```

### Step 4. Run Next.js in development mode

```shell
cd front_end && npm install && npm run dev

# or

cd front_end && yarn && yarn dev

```

Your DApp should be up and running on http://localhost:3000!
