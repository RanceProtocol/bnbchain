import clsx from "clsx";
import Image from "next/image";
import React, {
    FC,
    useEffect,
    useState,
} from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import { insurancePackages } from '../../constants/data';
import type {IInsurancePackage} from '../../constants/data'
import { utils } from "ethers";

interface IProps {
    state: { open: boolean; id: string | null };
    onClose: () => void;
}

const onAfterClose = () => {};

const WithdrawInsuranceModal: FC<IProps> = ({
    state: { open, id },
    onClose,
}) => {
    const [selectedPackage, setSelectedPackage] = useState<IInsurancePackage>()
    useEffect(() => {
        if(!id) return;
        const target = insurancePackages.find(item => item.packageId === id);
        setSelectedPackage(target)
    }, [id])

    return (
        <ModalWrapper
            open={open}
            label="withdraw insurance Modal"
            onClose={onClose}
            onAfterClose={onAfterClose}
            contentClassName={styles.root}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>{selectedPackage?.active ? "Remove insurance?": "Withdraw Insurance"}</h1>
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

            <div className={clsx({[styles.notice]:true, [styles.notice__negative]: selectedPackage?.active, [styles.notice__positive]: !selectedPackage?.active})}>
                <div className={styles.notice__text}>
                    <span className={styles.notice__key}>Notice:</span>
                    <p className={styles.notice__paragraph}>
                        Your insured balance will be sent to your wallet when
                        you provide an equal value for the initial amount,
                        failure to provide this will lead to a loss of your
                        insured balance in 30 days
                    </p>
                </div>
            </div>

            <div className={styles.second__section}>
                <span className={styles.receive}>You will receive</span>
                <span className={styles.amount}>1000 MUSD</span>
                <span className={styles.insured__balance__text}>
                    Insured balance
                </span>
            </div>

            <div className={styles.details}>
                <div className={styles.key__value}>
                    <span className={styles.key}>Initial deposit</span>
                    <span className={styles.value}>{utils.formatEther(selectedPackage!.initialDeposit)}</span>
                </div>

                <div className={styles.key__value}>
                    <span className={styles.key}>Penalty fee</span>
                    <span className={styles.value}>0 RANCE</span>
                </div>
            </div>

            <button className={clsx({[styles.action__btn]: true, [styles.withdrawal__btn]: true})}>Buy package</button>
        </ModalWrapper>
    );
};

export default WithdrawInsuranceModal;
