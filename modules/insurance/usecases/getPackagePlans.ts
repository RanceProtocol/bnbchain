import { RanceProtocol } from "../../../typechain";
import type {RanceProtocol as IRanceProtocol} from "../../../typechain/RanceProtocol"
import { IInsurancePackagePlan } from "../domain/entities";

export const getPackagePlans = async (contract: RanceProtocol):Promise<IInsurancePackagePlan[]> => {
    const packages:IRanceProtocol.PackagePlanStructOutput[] = await contract.getAllPackagePlans()
    // console.log("packages: ", packages);
    
    return []
}