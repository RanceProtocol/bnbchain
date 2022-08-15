export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

export type IinsurableCoins = "WBTC" | "WETH" | "WCRO" | "MMF";

export const insurableCoins: IinsurableCoins[] = [
    "WBTC",
    "WETH",
    "WCRO",
    "MMF",
];

export interface IinsurancePackagePlanDetails {
    packageType: PackageEnum;
    name: string;
    duration: number;
    timeUnit: "MTH" | "YR" | "YRS";
    timeUnitFull: "months" | "year" | "years";
}

export const periodInMonthsToPlanData: {
    [key: number]: IinsurancePackagePlanDetails;
} = {
    6: {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
    },
    12: {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
    },
    24: {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
    },
};

export const getDurationData = (periodInSeconds: number) => {
    const months = Math.round(periodInSeconds / (60 * 60 * 24 * 30));
    return periodInMonthsToPlanData[months];
};

export const tokenLogoBaseUri = "https://tokens.pancakeswap.finance/images/";

export const addressToCoinDetails: {
    [key: string]: any;
} = {
    "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
        id: "binance-bitcoin",
        symbol: "btcb",
        name: "Binance Bitcoin",
    },
    "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
    },
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
        id: "wbnb",
        symbol: "wbnb",
        name: "Wrapped BNB",
    },
    "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47": {
        id: "binance-peg-cardano",
        symbol: "ada",
        name: "Binance-Peg Cardano",
    },
    "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE": {
        id: "binance-peg-xrp",
        symbol: "xrp",
        name: "Binance-Peg XRP",
    },
    "0xbA2aE424d960c26247Dd6c32edC70B295c744C43": {
        id: "binance-peg-dogecoin",
        symbol: "doge",
        name: "Binance-Peg Dogecoin",
    },
    "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94": {
        id: "binance-peg-litecoin",
        symbol: "ltc",
        name: "Binance-Peg Litecoin",
    },
    "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402": {
        id: "binance-peg-polkadot",
        symbol: "dot",
        name: "Binance-Peg Polkadot",
    },
    "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD": {
        id: "chainlink",
        symbol: "link",
        name: "Chainlink",
    },
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82": {
        id: "pancakeswap-token",
        symbol: "cake",
        name: "PancakeSwap",
    },
    "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3": {
        id: "tron-bsc",
        symbol: "trx",
        name: "TRON (BSC)",
    },
    "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1": {
        id: "uniswap",
        symbol: "uni",
        name: "Uniswap",
    },
    "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4": {
        id: "sushi",
        symbol: "sushi",
        name: "Sushi",
    },
    "0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0": {
        id: "axie-infinity",
        symbol: "axs",
        name: "Axie Infinity",
    },
    "0x4B0F1812e5Df2A09796481Ff14017e6005508003": {
        id: "trust-wallet-token",
        symbol: "twt",
        name: "Trust Wallet",
    },
    "0xbdD2E3fdb879AA42748E9D47b7359323f226BA22": {
        id: "predictcoin",
        symbol: "pred",
        name: "Predictcoin",
    },
};
