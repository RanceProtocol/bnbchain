import { getDurationData } from "../../../constants/data";
import { RanceProtocol } from "../../../typechain";
import type {RanceProtocol as IRanceProtocol} from "../../../typechain/RanceProtocol"
import { structOutputToObject } from "../../../utils/helpers";
import { IInsurancePackage } from "../domain/entities";
import IInsuranceStore from "../domain/insuranceStore";

export const getUserPackages = async (contract: RanceProtocol, userAddress: string | null | undefined):Promise<Pick<IInsuranceStore, "userPackages">> => {

    if(!userAddress) return {userPackages: []} 

    try {
        const packages:IRanceProtocol.PackageStructOutput[] = await contract.getAllUserPackages(userAddress)

        if(packages.length === 0) {
            return {userPackages: []}
        }
        const packagesPlansData:IRanceProtocol.PackagePlanStructOutput[] = await Promise.all(packages.map((item:IRanceProtocol.PackageStructOutput) => {
            return contract.planIdToPackagePlan(item.planId)
        }))

        const formatedObject = packages.map(
            (item: IRanceProtocol.PackageStructOutput) =>
                structOutputToObject(item)
        );

        const userPackages = formatedObject.map((item:any, index:number):IInsurancePackage => {
            return {
                ...item,
                packagePlanName: getDurationData(packagesPlansData[index].periodInSeconds).name,
                uninsureFee: packagesPlansData[index].uninsureFee,
            }
        })
        console.log(userPackages)

        return {userPackages}

    } catch (error:any) {
        throw new Error(error);
    }

}