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
    "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e" : {
        id: "yearn-finance",
        symbol: "yfi",
        name: "yearn.finance",
    },

    "0xEd8c8Aa8299C10f067496BB66f8cC7Fb338A3405" : {
        id: "prosper",
        symbol: "pros",
        name: "Prosper",
    },
    "0xf307910A4c7bbc79691fD374889b36d8531B08e3" : {
        id: "ankr",
        symbol: "ankr",
        name: "Ankr", 
    },
    "0x3019BF2a2eF8040C242C9a4c5c4BD4C81678b2A1" : {
        id: "stepn",
        symbol: "gmt",
        name: "STEPN",
    },
    "0x8C851d1a123Ff703BD1f9dabe631b69902Df5f97" : {
        id: "binaryx",
        symbol: "bnx",
        name: "BinaryX",
    },
    "0x9678E42ceBEb63F23197D726B29b1CB20d0064E5" : {
        id: "binance-peg-iotex",
        symbol: "iotx",
        name: "Binance-Peg IoTeX",
    },
    "0x03fF0ff224f904be3118461335064bB48Df47938" : {
        id: "wrapped-one",
        symbol: "wone",
        name: "Wrapped One",
    },
    "0xaFF9084f2374585879e8B434C399E29E80ccE635" : {
        id: "zelcash",
        symbol: "flux",
        name: "Flux",
    },
    "0x4691937a7508860F876c9c0a2a617E7d9E945D4B" : {
        id: "woo-network",
        symbol: "woo",
        name: "WOO Network",
    },
    "0x78650B139471520656b9E7aA7A5e9276814a38e9" : {
        id: "btc-standard-hashrate-token",
        symbol: "btcst",
        name: "BTC Standard Hashrate Token",
    },
    "0xaeF0d72a118ce24feE3cD1d43d383897D05B4e99" : {
        id: "winklink-bsc",
        symbol: "win",
        name: "WINkLink BSC",
    },
    "0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18" : {
        id: "band-protocol",
        symbol: "band",
        name: "Band Protocol",
    },
    "0xf9CeC8d50f6c8ad3Fb6dcCEC577e05aA32B224FE" : {
        id: "chromaway",
        symbol: "chr",
        name: "Chromia",
    },
    "0xA8c2B8eec3d368C0253ad3dae65a5F2BBB89c929" : {
        id: "cryptyk",
        symbol: "ctk",
        name: "Cryptyk",
    },
    "0x477bC8d23c634C154061869478bce96BE6045D12" : {
        id: "seedify-fund",
        symbol: "sfund",
        name: "Seedify.fund",
    },
    "0xA7f552078dcC247C2684336020c03648500C6d9F" : {
        id: "ellipsis",
        symbol: "eps",
        name: "Ellipsis [OLD]",
    },
    "0xE6Ce27025F13f5213bBc560dC275e292965a392F" : {
        id: "loom-network-new",
        symbol: "loom",
        name: "Loom Network (NEW)",
    },
    "0x857B222Fc79e1cBBf8Ca5f78CB133d1b7CF34BBd" : {
        id: "lto-network",
        symbol: "lto",
        name: "LTO Network",
    },
    "0x2222227E22102Fe3322098e4CBfE18cFebD57c95" : {
        id: "alien-worlds",
        symbol: "tlm",
        name: "Alien Worlds",
    },
    "0xAC51066d7bEC65Dc4589368da368b212745d63E8" : {
        id: "my-neighbor-alice",
        symbol: "alice",
        name: "My Neighbor Alice",
    },
    "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63" : {
        id: "venus",
        symbol: "xvs",
        name: "Venus",
    },
    "0x02fF5065692783374947393723dbA9599e59F591" : {
        id: "yooshi",
        symbol: "yooshi",
        name: "YooShi",
    },
    "0x570A5D26f7765Ecb712C0924E4De545B89fD43dF" : {
        id: "wrapped-solana",
        symbol: "sol",
        name: "Wrapped Solana",
    },
    "0xCC42724C6683B7E57334c4E856f4c9965ED682bD" : {
        id: "matic-network",
        symbol: "matic",
        name: "Polygon",
    },
    "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2" : {
        id: "dodo",
        symbol: "dodo",
        name: "DODO",
    },
    "0x3FdA9383A84C05eC8f7630Fe10AdF1fAC13241CC" : {
        id: "dego-finance",
        symbol: "dego",
        name: "Dego Finance",
    },
    "0x12BB890508c125661E03b09EC06E404bc9289040" : {
        id: "radio-caca",
        symbol: "raca",
        name: "Radio Caca",
    },
    "0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66" : {
        id: "ceek",
        symbol: "ceek",
        name: "CEEK Smart VR",
    },
    "0xcfcEcFe2bD2FED07A9145222E8a7ad9Cf1Ccd22A" : {
        id: "adshares",
        symbol: "ads",
        name: "Adshares",
    },
    "0x6679eB24F59dFe111864AEc72B443d1Da666B360" : {
        id: "ariva",
        symbol: "arv",
        name: "Ariva",
    },
    "0x2eD9a5C8C13b93955103B9a7C167B67Ef4d568a3" : {
        id: "mask-network",
        symbol: "mask",
        name: "Mask Network",
    },
    "0xC17c30e98541188614dF99239cABD40280810cA3" : {
        id: "everrise",
        symbol: "rise",
        name: "EverRise",
    },
    "0xF218184Af829Cf2b0019F8E6F0b2423498a36983" : {
        id: "math",
        symbol: "math",
        name: "MATH",
    }
    
};
