import { FC, Fragment, useState } from "react";
import styles from "./styles.module.css";
import {insurancePackagePlans, PackageEnum} from '../../constants/data'
import type {IinsurancePackagePlan} from '../../constants/data'
import InsurancePackageCard from "./insurancePackagePlanCard";
import PackagePurchaseModal from "../PackagePurchaseModal";

interface IProp {
}

const InsurancePackagePlans: FC<IProp> = (props) => {

    const [packagePurchaseModal, setPackagePurchaseModal] = useState<{open: boolean, packageType:PackageEnum}>({open: false, packageType: PackageEnum.SILVER})

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
