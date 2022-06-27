import { periodInMonthsToPlanData } from "../../../constants/data";
import { RanceProtocol } from "../../../typechain";
import type {RanceProtocol as IRanceProtocol} from "../../../typechain/RanceProtocol"
import { structOutputToObject } from "../../../utils/helpers";
import { IInsurancePackagePlan } from "../domain/entities";

export const getPackagePlans = async (contract: RanceProtocol):Promise<IInsurancePackagePlan[]> => {
    const packages:IRanceProtocol.PackagePlanStructOutput[] = await contract.getAllPackagePlans()
    const formatedObject = packages.map((item:IRanceProtocol.PackagePlanStructOutput) => structOutputToObject(item))
    const packagePlansCompleteData = formatedObject.map((item) => {
        return {...item, ...getDurationData(item.periodInSeconds)}
    })

    // const inssureCoinsName = await contract.
    
    return packagePlansCompleteData
    
}

const getDurationData = (periodInSeconds: number) => {
    const months = Math.round(periodInSeconds / (60*60*24*30))
    return periodInMonthsToPlanData[months]
}