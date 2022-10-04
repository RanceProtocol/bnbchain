export const ranceProtocol = {
    staging: "0xaca2d837a52e141e9a6cEbE33f685cc90F311356",
    mainnet: "0x9BdD2716Df5b173C54f6f08b4C38cC849F162139",
};

export const stakingContractAddresses = {
    staging: [
        "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455",
        "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605",
    ],
    mainnet: [
        "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455",
        "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605",
    ],
};

export const tokens = {
    mainnet: {
        RANCE: "0x42081fece4bc26a65cccb3b352379e1f3663b435", // to be changed
        BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        USDT: "0x55d398326f99059fF775485246999027B3197955",
    },
    staging: {
        RANCE: "0x42081fece4bc26a65cccb3b352379e1f3663b435",
        BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        USDT: "0x55d398326f99059fF775485246999027B3197955",
    },
};

export const stakingAddressToPool: { [key: string]: number } = {
    "0xB1ad1e8612C228e4A6C9cDed64d8A270157c9455": 0, //staging
    "0x1D17EE3b2eD935305b77D72Ab883D3827bC2E605": 1, //staging
};

export const masterRanceWallet = {
    staging: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0",
    mainnet: "0x91A8BEF2bEBD46fBD079667DcE72865C1f015df0", // replaced with mainnet wallet later
};

export const AUTOSHARK_ADDRESSES = "0xB0EeB0632bAB15F120735e5838908378936bd484";
export const multicall2Address = "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B";
