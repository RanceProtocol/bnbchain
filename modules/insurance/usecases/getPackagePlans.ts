import { periodInMonthsToPlanData } from "../../../constants/data";
import { RanceProtocol } from "../../../typechain";
import type { RanceProtocol as IRanceProtocol } from "../../../typechain/RanceProtocol";
import { structOutputToObject } from "../../../utils/helpers";
import IInsuranceStore from "../domain/insuranceStore";

export const getPackagePlans = async (
    contract: RanceProtocol
): Promise<
    Pick<IInsuranceStore, "packagePlans" | "insurableCoins" | "paymentTokens">
> => {
    try {
        const packages: IRanceProtocol.PackagePlanStructOutput[] =
            await contract.getAllPackagePlans();
        const formatedObject = packages.map(
            (item: IRanceProtocol.PackagePlanStructOutput) =>
                structOutputToObject(item)
        );
        const packagePlansCompleteData = formatedObject.map((item) => {
            return { ...item, ...getDurationData(item.periodInSeconds) };
        });

        const insurableCoinsNames: string[] = await contract.getInsureCoins();
        const insurableCoinsEntries: string[][] = await Promise.all(
            insurableCoinsNames.map(async (name) => [
                name,
                await contract.insureCoinNameToAddress(name),
            ])
        );
        const insurableCoinsObject = Object.fromEntries(insurableCoinsEntries);

        const paymentTokensNames: string[] = await contract.getPaymentTokens();
        const paymentTokensEntries: string[][] = await Promise.all(
            paymentTokensNames.map(async (name) => [
                name,
                await contract.paymentTokenNameToAddress(name),
            ])
        );

        const paymentTokensObject = Object.fromEntries(paymentTokensEntries);

        return {
            insurableCoins: insurableCoinsObject,
            paymentTokens: paymentTokensObject,
            packagePlans: packagePlansCompleteData,
        };
    } catch (error: any) {
        throw new Error(error);
    }
};

const getDurationData = (periodInSeconds: number) => {
    const months = Math.round(periodInSeconds / (60 * 60 * 24 * 30));
    return periodInMonthsToPlanData[months];
};
