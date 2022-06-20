import { BigNumber } from "ethers";

export interface IInsurancePackagePlan {
    planId: string;
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
    packagePlan: IInsurancePackagePlan
}