export interface Iroutes {
    home: string;
    insurance: string;
    staking: string;
}

export interface IinsuranceTabs {
    myPackages: string;
    insurancePackages: string;
}

export type IinsurableCoins = "BTC" | "ETH" | "CRO" | "MMF"

// export type IinsturancePackageType = "Silver" | "Gold" | "Platinum"

export enum PackageEnum {
    SILVER = "Silver",
    GOLD = "Gold",
    PLATINUM = "Platinum"
}

export interface IinsurancePackage {
    packageType: PackageEnum;
    name: string;
    duration: number;
    timeUnit: "MTH" | "YR" | "YRS";
    timeUnitFull: "months" | "year" | "years"
    insuranceFeePercentage: number;
    unInsureFeeInRance: number;
}


export const routes:Iroutes = {
    home: "/", //will render insurance
    insurance: "/insurance",
    staking: "/staking",
}

export const insurancePageTabs:IinsuranceTabs = {
    myPackages: "my-packages",
    insurancePackages: "insurance-packages",
};

export const insurableCoins:IinsurableCoins[] = ["BTC", "ETH", "CRO", "MMF"]

export const insurancePackages: IinsurancePackage[] = [
    {
        packageType: PackageEnum.SILVER,
        name: `${PackageEnum.SILVER} Package`,
        duration: 6,
        timeUnit: "MTH",
        timeUnitFull: "months",
        insuranceFeePercentage: 100,
        unInsureFeeInRance: 1
    },
    {
        packageType: PackageEnum.GOLD,
        name: `${PackageEnum.GOLD} Package`,
        duration: 1,
        timeUnit: "YR",
        timeUnitFull: "year",
        insuranceFeePercentage: 50,
        unInsureFeeInRance: 10
    },
    {
        packageType: PackageEnum.PLATINUM,
        name: `${PackageEnum.PLATINUM} Package`,
        duration: 2,
        timeUnit: "YRS",
        timeUnitFull: "years",
        insuranceFeePercentage: 25,
        unInsureFeeInRance: 100
    }
]