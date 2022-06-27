import { RanceProtocol } from "../../../typechain";
import type {RanceProtocol as IRanceProtocol} from "../../../typechain/RanceProtocol"
import { IInsurancePackage } from "../domain/entities";

export const getUserPackages = async (contract: RanceProtocol, userAddress: string):Promise<IInsurancePackage[]> => {
    const packages:IRanceProtocol.PackageStructOutput[] = await contract.getAllUserPackages(userAddress)

    return []
}