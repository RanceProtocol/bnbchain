import { FC, Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PackageEnum } from "../../constants/data";
import InsurancePackagePlanCard from "./insurancePackagePlanCard";
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
        planId: string;
    }>({ open: false, planId: "" });

    const { account, library } = useWeb3React();

    const { initializePackagePlans } = useInsuranceViewModel({
        address: account,
        provider: library,
    });

    const state = insuranceState();

    const { loadingPackagePlans, packagePlans, insurableCoins } = state;

    useEffect(() => {
        initializePackagePlans();
    }, []);

    let insurableCoinsSymbols = Object.keys(insurableCoins)
    

    return (
        <Fragment>
            <div className={styles.root}>
                {loadingPackagePlans && !packagePlans.length
                    ? new Array(3)
                          .fill(undefined)
                          .map((item, index) => <InsurancePackagePlanCardSkeleton key = {index} />)
                    : packagePlans.map(
                          (insurancePackage: IInsurancePackagePlan) => (
                              <InsurancePackagePlanCard
                                  key={insurancePackage.planId}
                                  {...insurancePackage}
                                  insurableCoins={insurableCoinsSymbols}
                                  onClickAction={(data: {
                                      open: boolean;
                                      planId: string;
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
