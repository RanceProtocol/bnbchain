export const ranceProtocol = {
    staging: "0xaca2d837a52e141e9a6cEbE33f685cc90F311356",
    mainnet: "0x794888cfFf41262E5e5085e696Ac1b10A6DbaC30",
};

export const stakingContractAddresses = {
    staging: [
        "0xac3c475db75c8fc105B8EA3e80d0782c0ba8787c",
        "0xe0353c1E73FFAa42b77B3Ce9A7e2e80B70f05c12",
    ],
    mainnet: [
        "0xac3c475db75c8fc105B8EA3e80d0782c0ba8787c",
        "0xe0353c1E73FFAa42b77B3Ce9A7e2e80B70f05c12",
    ],
};

export const tokens = {
    mainnet: {
        RANCE: "0x42081fece4bc26a65cccb3b352379e1f3663b435", // to be changed
        BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        USDT: "0x141826bbA445c8972883A1FAA06e73c7286A2A07",
    },
    staging: {
        RANCE: "0x42081fece4bc26a65cccb3b352379e1f3663b435",
        BUSD: "0x82522a5088c0AFc0Be56eEB7B423ba9ebC25E225",
        USDT: "0x141826bbA445c8972883A1FAA06e73c7286A2A07",
    },
};

export const stakingAddressToPool: { [key: string]: number } = {
    "0xac3c475db75c8fc105B8EA3e80d0782c0ba8787c": 0, //staging
    "0xe0353c1E73FFAa42b77B3Ce9A7e2e80B70f05c12": 1, //staging
};

export const masterRanceWallet = {
    staging: "0x56b1df1dCf10F2d5Db3A1B8e508B77bDf5e88f05",
    mainnet: "0x56b1df1dCf10F2d5Db3A1B8e508B77bDf5e88f05", // replaced with mainnet wallet later
};

export const AUTOSHARK_ADDRESSES = "0xB0EeB0632bAB15F120735e5838908378936bd484";
export const multicall2Address = "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B";
