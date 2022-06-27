export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum",
}

export type IinsurableCoins = "BTC" | "ETH" | "CRO" | "MMF";

export const insurableCoins: IinsurableCoins[] = ["BTC", "ETH", "CRO", "MMF"];

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