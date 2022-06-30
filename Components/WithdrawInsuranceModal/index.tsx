import clsx from "clsx";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import { utils } from "ethers";
import { insuranceState } from "../../modules/insurance/ui/redux/state";
import { IInsurancePackage } from "../../modules/insurance/domain/entities";
import { tokenAddressToName } from "../../constants/addresses";
import { getCurrentTimestamp } from "../../utils/time";
import CustomToast, { STATUS, TYPE } from "../CustomToast";
import { toast } from "react-toastify";
import { truncateString } from "../../utils/helpers";

interface IProps {
    state: { open: boolean; id: string | null };
    cancelInsurance: ({
        packageId,
        callbacks,
    }: {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }) => Promise<void>;
    withdrawInsurance: ({
        packageId,
        callbacks,
    }: {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }) => Promise<void>;
    onClose: () => void;
}

const WithdrawInsuranceModal: FC<IProps> = ({
    state: { open, id },
    onClose,
    cancelInsurance,
    withdrawInsurance
}) => {
    const state = insuranceState();
    const { userPackages } = state;

    const [selectedPackage, setSelectedPackage] = useState<IInsurancePackage>();
    const [sendingTx, setSendingTx] = useState(false);
    const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

    useEffect(() => {
        (async () => {
            const timestamp = await getCurrentTimestamp();
            if (!timestamp) return;
            setCurrentTimeStamp(timestamp);
        })();
    }, []);

    useEffect(() => {
        if (!id) return;
        const target = userPackages.find((item) => item.packageId === id);
        setSelectedPackage(target);
    }, [id]);

    const HandleCancel = async () => {
        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: `Cancelling insurance package...`,
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
                setSendingTx(true);
            },
            successfull: async () => {
                const toastBody = CustomToast({
                    message: `Successfully cancelled your insurance package`,
                    status: STATUS.SUCCESSFULL,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "Insurance package cancelation failed",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
        };

        await cancelInsurance({packageId: id as string, callbacks})
    };

    const HandleWithdraw = async () => {
        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: `Withdrawing insurance package...`,
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
                setSendingTx(true);
            },
            successfull: async () => {
                const toastBody = CustomToast({
                    message: `Successfully withdrawn your insurance package.`,
                    status: STATUS.SUCCESSFULL,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "Insurance package withdrawal failed",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
        };

        await withdrawInsurance({packageId: id as string, callbacks})
    };

    return (
        <ModalWrapper
            open={open}
            label="withdraw insurance Modal"
            onClose={onClose}
            contentClassName={styles.root}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>
                    {currentTimeStamp !== 0 &&
                        (selectedPackage?.endTimestamp as number) >=
                            currentTimeStamp &&
                        "Remove insurance?"}
                    {currentTimeStamp !== 0 &&
                        currentTimeStamp >
                            (selectedPackage?.endTimestamp as number) &&
                        "Withdraw insurance"}
                </h1>
                <button className={styles.close__btn} onClick={onClose}>
                    <div className={styles.close__icon__wrapper}>
                        <Image
                            src={`/icons/close.svg`}
                            alt="modal close icon"
                            layout="fill"
                        />
                    </div>
                </button>
            </div>

            {currentTimeStamp !== 0 && (
                <div
                    className={clsx({
                        [styles.notice]: true,
                        [styles.notice__negative]:
                            (selectedPackage?.endTimestamp as number) >=
                            currentTimeStamp,
                        [styles.notice__positive]:
                            currentTimeStamp >
                            (selectedPackage?.endTimestamp as number),
                    })}
                >
                    <div className={styles.notice__text}>
                        <span className={styles.notice__key}>Notice:</span>
                        <p className={styles.notice__paragraph}>
                            {(selectedPackage?.endTimestamp as number) >=
                                currentTimeStamp &&
                                "A % of un-insure fee is imposed if insurance package is cancelled before lock-up period is reached. If the fee cannot be provided, please wait till the insurance package expires then withdraw"}
                            {currentTimeStamp >
                                (selectedPackage?.endTimestamp as number) &&
                                "Your insured balance will be sent to your wallet when you provide an equal value for the initial amount, failure to provide this will lead to a loss of your insured balance in 30 days"}
                        </p>
                    </div>
                </div>
            )}

            <div className={styles.second__section}>
                <span className={styles.receive}>You will receive</span>
                <span className={styles.amount}>
                    {selectedPackage?.initialDeposit &&
                        `${Number(
                            utils.formatEther(selectedPackage?.initialDeposit)
                        )} ${tokenAddressToName[selectedPackage.paymentToken]}`}
                </span>
                <span className={styles.insured__balance__text}>
                    Insured balance
                </span>
            </div>

            <div className={styles.details}>
                <div className={styles.key__value}>
                    <span className={styles.key}>Initial deposit</span>
                    {selectedPackage?.initialDeposit && (
                        <span className={styles.value}>
                            {`${Number(
                                utils.formatEther(
                                    selectedPackage?.initialDeposit
                                )
                            )} ${
                                tokenAddressToName[selectedPackage.paymentToken]
                            }`}
                        </span>
                    )}
                </div>

                <div className={styles.key__value}>
                    <span className={styles.key}>Penalty fee</span>
                    <span className={styles.value}>
                        {selectedPackage?.uninsureFee &&
                            `${Number(
                                utils.formatEther(selectedPackage?.uninsureFee)
                            )} RANCE`}
                    </span>
                </div>
            </div>
            {currentTimeStamp !== 0 &&
                currentTimeStamp >
                    (selectedPackage?.endTimestamp as number) && (
                    <button
                        className={clsx(
                            styles.action__btn,
                            styles.withdrawal__btn
                        )}
                        onClick = {HandleWithdraw}
                    >
                        Withdraw
                    </button>
                )}

            {currentTimeStamp !== 0 &&
                (selectedPackage?.endTimestamp as number) >= currentTimeStamp &&
                "Remove insurance?" && (
                    <button
                        className={clsx(styles.action__btn, styles.cancel__btn)}
                        onClick = {HandleCancel}
                    >
                        Cancel insurance
                    </button>
                )}
        </ModalWrapper>
    );
};

export default WithdrawInsuranceModal;
