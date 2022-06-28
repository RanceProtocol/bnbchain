import React, { Fragment, useEffect, useState } from "react";
import MyPackageCard from "./myPackageCard";
import styles from "./styles.module.css";
import { insurancePackages } from "../../constants/dummyData";
import WithdrawInsuranceModal from "../WithdrawInsuranceModal";
import SuccessModal from "../SuccessModal";
import { useWeb3React } from "@web3-react/core";
import { useInsuranceViewModel } from "../../modules/insurance/controllers/insuranceViewModel";
import MyPackageCardSkeleton from "./myPackageCardSkeleton";

const MyPackages = () => {
    const [withdrawModalState, setWithdrawModalState] = useState<{
        open: boolean;
        id: string | null;
    }>({ open: false, id: null });
    const [showCancelSuccess, setShowCancelSuccess] = useState<boolean>(false);
    const [showWithdrawSuccess, setShowWithdrawSuccess] =
        useState<boolean>(false);

    const clickAction = (id: string) => {
        setWithdrawModalState({ open: true, id });
    };

    const showOutcomeModal = (type: "withdrawal" | "cancelation") => {
      if(type === "cancelation") return setShowCancelSuccess(true)

      setShowWithdrawSuccess(true)
    }

    const {active, account, library} = useWeb3React()
    // const {intializeUserPackages} = useInsuranceViewModel({active, address: account, provider: library})

    // useEffect(() => {
    //     intializeUserPackages()
    // }, [])
    
    

    return (
        <Fragment>
            <div className={styles.root}>
                {insurancePackages.map((item) => (
                    <MyPackageCard
                        key={item.packageId}
                        {...item}
                        clickAction={clickAction}
                    />
                ))}
                <MyPackageCardSkeleton />
            </div>
            {/* <WithdrawInsuranceModal
                state={withdrawModalState}
                onClose={() => setWithdrawModalState({ open: false, id: null })}
            /> */}

            <SuccessModal
                state={{
                    open: showWithdrawSuccess,
                    heading: "Withdrawal successfull",
                    text: "Your Insurance has been successfully withdrawn and your fund has been sent to your wallet",
                    buttonText: "Back to “My Packages”"
                }}
                action={() => setShowWithdrawSuccess(false)}
                onClose={() => setShowWithdrawSuccess(false)}
            />
            <SuccessModal
                state={{
                    open: showCancelSuccess,
                    heading: "Cancelled successfull",
                    text: "Your Insurance has been successfully cancelled and your fund has been sent to your wallet",
                    buttonText: "Back to “My Packages”"
                }}
                action={() => setShowCancelSuccess(false)}
                onClose={() => setShowCancelSuccess(false)}
            />
        </Fragment>
    );
};

export default MyPackages;
