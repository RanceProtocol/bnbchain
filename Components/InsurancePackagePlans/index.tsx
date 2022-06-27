import { FC, Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PackageEnum } from "../../constants/data";
import InsurancePackageCard from "./insurancePackagePlanCard";
import InsurancePackagePlanCardSkeleton from "./insurancePackagePlanCardSkeleton";
import PackagePurchaseModal from "../PackagePurchaseModal";
import { useWeb3React } from "@web3-react/core";
import { useInsuranceViewModel } from "../../modules/insurance/controllers/insuranceViewModel";
import { insuranceState } from "../../modules/insurance/ui/redux/state";
import { IInsurancePackagePlan } from "../../modules/insurance/domain/entities";

interface IProp {}

const InsurancePackagePlans: FC<IProp> = () => {
    const [packagePurchaseModal, setPackagePurchaseModal] = useState<{
        open: boolean;
        packageType: PackageEnum;
    }>({ open: false, packageType: PackageEnum.SILVER });

    const { account, library } = useWeb3React();

    const { initializePackagePlans } = useInsuranceViewModel({
        address: account,
        provider: library,
    });

    const state = insuranceState();

    const { loadingPackagePlans, packagePlans } = state;

    useEffect(() => {
        initializePackagePlans();
    }, [account]);

    return (
        <Fragment>
            <div className={styles.root}>
                {loadingPackagePlans && !packagePlans.length
                    ? new Array(3)
                          .fill(undefined)
                          .map((item) => <InsurancePackagePlanCardSkeleton />)
                    : packagePlans.map(
                          (insurancePackage: IInsurancePackagePlan) => (
                              <InsurancePackageCard
                                  key={insurancePackage.planId}
                                  {...insurancePackage}
                                  onClickAction={(data: {
                                      open: boolean;
                                      packageType: PackageEnum;
                                  }) => setPackagePurchaseModal(data)}
                              />
                          )
                      )}
            </div>
            <PackagePurchaseModal
                state={packagePurchaseModal}
                onClose={() =>
                    setPackagePurchaseModal((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </Fragment>
    );
};

export default InsurancePackagePlans;
