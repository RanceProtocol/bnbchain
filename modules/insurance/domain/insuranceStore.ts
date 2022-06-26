import {IInsurancePackage, IInsurancePackagePlan} from "./entities"

interface IInsuranceStore {
    loadingPackagePlans: boolean,
    loadingUserPackages: boolean,
    packagePlans: IInsurancePackagePlan[],
    userPackages: IInsurancePackage[],
}


export default IInsuranceStore