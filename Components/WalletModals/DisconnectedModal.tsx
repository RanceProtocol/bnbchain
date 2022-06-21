import React, { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import { BsExclamationTriangle } from "react-icons/bs";
import Image from "next/image";

interface IProps {
    open: boolean;
    onClose: () => void;
}

export const DisconnectedModal: FC<IProps> = ({ open, onClose }) => {
    return (
        <ModalWrapper
            open={open}
            label="Connect Wallet Modal"
            onClose={onClose}
            contentClassName={styles.root}
        >
            <h2 className={styles.heading}>Connect Wallet</h2>
            <p className={styles.sub__heading}>
                Connect a wallet of your choice to have access to the Rance
                protocol
            </p>

            <div className={styles.wallet__wrapper}></div>

            <div className={styles.notice}>
                <BsExclamationTriangle className={styles.notice__icon} />
                <span className={styles.notice__text}>
                    Wallet connection status
                </span>
            </div>

            <button className={styles.close__btn} onClick={onClose}>
                <div className={styles.close__icon__wrapper}>
                    <Image
                        src={`/icons/close_2.png`}
                        alt="modal close icon"
                        layout="fill"
                    />
                </div>
            </button>
        </ModalWrapper>
    );
};

export default DisconnectedModal;
