export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

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
    "0x8CD6e29d3686d24d3C2018CEe54621eA0f89313B": {
        id: "nuls",
        symbol: "nuls",
        name: "Nuls",
    },
    "0xD41FDb03Ba84762dD66a0af1a6C8540FF1ba5dfb": {
        id: "safepal",
        symbol: "sfp",
        name: "SafePal",
    },
    "0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8": {
        id: "helmet-insure",
        symbol: "helmet",
        name: "Helmet Insure",
    },
    "0xfEbe8C1eD424DbF688551D4E2267e7A53698F0aa": {
        id: "vita-inu",
        symbol: "vinu",
        name: "Vita Inu",
    },
    "0xECCF35F941Ab67FfcAA9A1265C2fF88865caA005": {
        id: "terra-luna",
        symbol: "lunc",
        name: "Terra Luna Classic",
    },
    "0xc748673057861a797275CD8A068AbB95A902e8de": {
        id: "baby-doge-coin",
        symbol: "babydoge",
        name: "Baby Doge Coin",
    },
    "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D": {
        id: "baby-shiba-inu",
        symbol: "babyshibainu",
        name: "Baby Shiba Inu",
    },
    "0x1CE0c2827e2eF14D5C4f29a091d735A204794041": {
        id: "binance-peg-avalanche",
        symbol: "avax",
        name: "Binance-Peg Avalanche",
    },
    "0x1Fa4a73a3F0133f0025378af00236f3aBDEE5D63": {
        id: "wrapped-near",
        symbol: "wnear",
        name: "Wrapped Near",
    },
    "0x580655E2C6D4fC125C0B2D37B2a3e56219bF9f78": {
        id: "gallant",
        symbol: "gal",
        name: "Gallant",
    },
    "0x3d6545b08693daE087E957cb1180ee38B9e3c25E": {
        id: "ethereum-classic",
        symbol: "etc",
        name: "Ethereum Classic",
    },
    "0x0Eb3a705fc54725037CC9e008bDede697f62F335": {
        id: "cosmos",
        symbol: "atom",
        name: "Cosmos Hub",
    },
    "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf": {
        id: "binance-peg-bitcoin-cash",
        symbol: "bch",
        name: "Binance-Peg Bitcoin Cash",
    },
    "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153": {
        id: "binance-peg-filecoin",
        symbol: "fil",
        name: "Binance-Peg Filecoin",
    },
    "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6": {
        id: "binance-peg-eos",
        symbol: "eos",
        name: "Binance-Peg EOS",
    },
    "0x16939ef78684453bfDFb47825F8a5F714f12623a": {
        id: "tezos",
        symbol: "xtz",
        name: "Tezos",
    },
    "0xbF7c81FFF98BbE61B40Ed186e4AfD6DDd01337fe": {
        id: "wrapped-elrond",
        symbol: "wegld",
        name: "Wrapped Elrond",
    },
    "0xAD29AbB318791D579433D831ed122aFeAf29dcfe": {
        id: "fantom",
        symbol: "ftm",
        name: "Fantom",
    },
    "0xCa3F508B8e4Dd382eE878A314789373D80A5190A": {
        id: "beefy-finance",
        symbol: "bifi",
        name: "Beefy.Finance",
    },
    "0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6": {
        id: "coin98",
        symbol: "c98",
        name: "Coin98",
    },
    "0x762539b45A1dCcE3D36d080F74d1AED37844b878": {
        id: "linear",
        symbol: "lina",
        name: "Linear",
    },
    "0xa2B726B1145A4773F68593CF171187d8EBe4d495": {
        id: "injective-protocol",
        symbol: "inj",
        name: "Injective",
    },
    "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A": {
        id: "swipe",
        symbol: "sxp",
        name: "SXP",
    },
    "0x4e840AADD28DA189B9906674B4Afcb77C128d9ea": {
        id: "hotbit-token",
        symbol: "htb",
        name: "Hotbit",
    },
    "0xb86AbCb37C3A4B64f74f59301AFF131a1BEcC787": {
        id: "zilliqa",
        symbol: "zil",
        name: "Zilliqa",
    },
    "0x7dDEE176F665cD201F93eEDE625770E2fD911990": {
        id: "gala",
        symbol: "gala",
        name: "Gala",
    },
    "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8": {
        id: "compound-governance-token",
        symbol: "comp",
        name: "Compound",
    },
    "0x101d82428437127bF1608F699CD651e6Abf9766E": {
        id: "basic-attention-token",
        symbol: "bat",
        name: "Basic Attention",
    },
    "0x07EC61Ae90860641972E9B41A706325a1E928BF8": {
        id: "volt-inu",
        symbol: "volt",
        name: "Volt Inu [OLD]",
    },
    "0x352Cb5E19b12FC216548a2677bD0fce83BaE434B": {
        id: "bittorrent",
        symbol: "btt",
        name: "BitTorrent",
    },
    "0xF21768cCBC73Ea5B6fd3C687208a7c2def2d966e": {
        id: "reef",
        symbol: "reef",
        name: "Reef",
    },
    "0xD74b782E05AA25c50e7330Af541d46E18f36661C": {
        id: "richquack",
        symbol: "quack",
        name: "Rich Quack",
    },
    "0xA57ac35CE91Ee92CaEfAA8dc04140C8e232c2E50": {
        id: "pitbull",
        symbol: "pit",
        name: "Pitbull",
    },
    "0x90E3414e00E231B962666Bd94ADB811D5bcD0c2a": {
        id: "parex",
        symbol: "prx",
        name: "Parex",
    },
    "0x679D5b2d94f454c950d683D159b87aa8eae37C9e": {
        id: "hamster",
        symbol: "ham",
        name: "Hamster",
    },
    "0x6A684b3578f5B07c0Aa02fAFc33ED248AE0c2dB2": {
        id: "techtrees",
        symbol: "ttc",
        name: "TechTrees",
    },
    "0x8FFf93E810a2eDaaFc326eDEE51071DA9d398E83": {
        id: "bitrise-token",
        symbol: "brise",
        name: "Bitgert",
    },
};
