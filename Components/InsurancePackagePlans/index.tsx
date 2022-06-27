import { FC, Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import {insurancePackagePlans, PackageEnum} from '../../constants/data'
import type {IinsurancePackagePlan} from '../../constants/data'
import InsurancePackageCard from "./insurancePackagePlanCard";
import PackagePurchaseModal from "../PackagePurchaseModal";
import { useWeb3React } from "@web3-react/core";
import { useInsuranceViewModel } from "../../modules/insurance/controllers/insuranceViewModel";

interface IProp {
}

const InsurancePackagePlans: FC<IProp> = () => {

    const [packagePurchaseModal, setPackagePurchaseModal] = useState<{open: boolean, packageType:PackageEnum}>({open: false, packageType: PackageEnum.SILVER})

    const {account, library} = useWeb3React()
    const {initializePackagePlans} = useInsuranceViewModel({address: account, provider: library})

    useEffect(() => {
      initializePackagePlans()
    }, [account])
    

    return (
        <Fragment>
            <div className={styles.root}>
                {insurancePackagePlans.map((insurancePackage:IinsurancePackagePlan) => <InsurancePackageCard key = {insurancePackage.name} {...insurancePackage} onClickAction = {(data:{open: boolean, packageType:PackageEnum}) => setPackagePurchaseModal(data)}/> )}
            </div>
            <PackagePurchaseModal
                state = {packagePurchaseModal}
                onClose = {() => setPackagePurchaseModal(prev => ({...prev, open: false}))}
            />
        </Fragment>
    );
};

export default InsurancePackagePlans;
