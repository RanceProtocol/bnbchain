import { BigNumber, utils } from "ethers";

export type IinsurableCoins = "BTC" | "ETH" | "CRO" | "MMF";

export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

export interface IinsurancePackagePlan {
    packageType: PackageEnum;
    name: string;
    duration: number;
    timeUnit: "MTH" | "YR" | "YRS";
    timeUnitFull: "months" | "year" | "years";
    insuranceFeePercentage: number;
    unInsureFeeInRance: number;
}

export interface IInsurancePackage {
    packageId: string;
    initialDeposit: BigNumber;
    insureOutput: BigNumber;
    startTimestamp: number;
    endTimestamp: number;
    active: boolean;
    isCancelled: boolean;
    isWithdrawn: boolean;
    insureCoin: string;
    paymentToken: string;
    packagePlan: IinsurancePackagePlan;
}

export interface IStakingPool {
    poolId: string
    stakeToken: string,
    earnToken: string
    apr: number
    totalStaked: number
    totalStakedUsd: number
    totalEarning: number
    totalEarningUsd: number
    staked: number,
    stakedUsd: number,
    contractUrl: string,
    walletUnlockStatus: boolean,
    stakeTokenPrice: number,
}

export const insurableCoins: IinsurableCoins[] = ["BTC", "ETH", "CRO", "MMF"];

export const insurancePackagePlans: IinsurancePackagePlan[] = [
    {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
        insuranceFeePercentage: 100,
        unInsureFeeInRance: 1,
    },
    {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
        insuranceFeePercentage: 50,
        unInsureFeeInRance: 10,
    },
    {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
        insuranceFeePercentage: 25,
        unInsureFeeInRance: 100,
    },
];

export const insurancePackages: IInsurancePackage[] = [
    {
        packageId: "0x123",
        initialDeposit: utils.parseEther("1500"),
        insureOutput: utils.parseEther("1.1"),
        startTimestamp: 1655424000,
        endTimestamp: 1686960000,
        active: true,
        isCancelled: false,
        isWithdrawn: false,
        insureCoin: "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a",
        paymentToken: "0x95aEaF383E2e86A47c11CffdE1F7944eCB2C38C2",
        packagePlan: {
            packageType: PackageEnum.GOLD,
            name: `${PackageEnum.GOLD} Package`,
            duration: 1,
            timeUnit: "YR",
            timeUnitFull: "year",
            insuranceFeePercentage: 50,
            unInsureFeeInRance: 10,
        },
    },
    {
        packageId: "0x124",
        initialDeposit: utils.parseEther("12500"),
        insureOutput: utils.parseEther("0.5"),
        startTimestamp: 1654041600,
        endTimestamp: 1717200000,
        active: true,
        isCancelled: false,
        isWithdrawn: false,
        insureCoin: "0x062E66477Faf219F25D27dCED647BF57C3107d52",
        paymentToken: "0x95aEaF383E2e86A47c11CffdE1F7944eCB2C38C2",
        packagePlan: {
            packageType: PackageEnum.PLATINUM,
            name: `${PackageEnum.PLATINUM} Package`,
            duration: 2,
            timeUnit: "YRS",
            timeUnitFull: "years",
            insuranceFeePercentage: 25,
            unInsureFeeInRance: 100,
        },
    },
];

export const stakingPools:IStakingPool[] = [
    {
        poolId: "123",
        stakeToken: "RANCE",
        earnToken: "MUSD",
        apr: 93.7,
        totalStaked: 234500.2,
        totalStakedUsd: 234500.2,
        totalEarning: 134500.2,
        totalEarningUsd: 134500.2,
        staked: 1,
        stakedUsd: 0,
        contractUrl: "https://cronoscan.com/address/0x1234",
        walletUnlockStatus: true,
        stakeTokenPrice: 100,
    },
    {
        poolId: "124",
        stakeToken: "RANCE",
        earnToken: "RANCE",
        apr: 13.7,
        totalStaked: 234500.2,
        totalStakedUsd: 234500.2,
        totalEarning: 134500.2,
        totalEarningUsd: 134500.2,
        staked: 0,
        stakedUsd: 0,
        contractUrl: "https://cronoscan.com/address/0x1234",
        walletUnlockStatus: false,
        stakeTokenPrice: 100,
    },
];

export const addressToCoinDetails: {
    [key: string]: { id: string; symbol: string; name: string };
} = {
    "0x062E66477Faf219F25D27dCED647BF57C3107d52": {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
    },
    "0xe44Fd7fCb2b1581822D0c862B68222998a0c299a": {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
    },
    "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23": {
        id: "crypto-com-chain",
        symbol: "cro",
        name: "Cronos",
    },
    "0x97749c9B61F878a880DfE312d2594AE07AEd7656": {
        id: "mmfinance",
        symbol: "mmf",
        name: "MMFinance",
    },
};

// to be used together with the data gotten from the contract
export const periodInMonthsToPlanObject: {
    [key: number]: IinsurancePackagePlan;
} = {
    6: {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
        insuranceFeePercentage: 100,
        unInsureFeeInRance: 1,
    },
    12: {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
        insuranceFeePercentage: 50,
        unInsureFeeInRance: 10,
    },
    24: {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
        insuranceFeePercentage: 25,
        unInsureFeeInRance: 100,
    },
};
