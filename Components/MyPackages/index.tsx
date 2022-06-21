import React, { Fragment, useState } from "react";
import MyPackageCard from "./MyPackageCard";
import styles from "./styles.module.css";
import { insurancePackages } from "../../constants/data";
import WithdrawInsuranceModal from "../WithdrawInsuranceModal";
import SuccessModal from "../SuccessModal";

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