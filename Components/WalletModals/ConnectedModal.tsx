import React, { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import Image from "next/image";
import {toggleAccountModal} from "../../appState/shared/action"
import { useDispatch } from "react-redux";

interface IProps {
    open: boolean;
    onClose: () => void;
    disconnectWallet: () => void
}


export const ConnectedModal: FC<IProps> = ({ onClose, open, disconnectWallet }) => {

    const dispatch = useDispatch()

    const disconnectWalletHandler = () => {
        disconnectWallet()
        toggleAccountModal(dispatch)
    }

    return (
        <ModalWrapper
            open={open}
            label="Connect Wallet Modal"
            onClose={onClose}
            contentClassName={styles.root}
        >
            <h2 className={styles.heading}>Wallet connected</h2>
            <p className={styles.sub__heading}>
                Connect a wallet of your choice to have access to the Rance
                protocol
            </p>
            <div className={styles.connected__wallet__details}>
                <div className={styles.connected__wallet__icon__wrapper}>
                    <Image
                        src={`/icons/metamask.png`}
                        alt="connected wallet icon"
                        layout="fill"
                    />
                </div>
                <span className={styles.connected__wallet__name}>MetaMask connected</span>
                <span className={styles.connected__wallet__address}>0x5TD6...4567</span>
            </div>

            <div className={styles.wallet__balance}>
                <span className = {styles.balance__value}>45 MUSD</span>
                <span className = {styles.balance__value}>45 RANCE</span>
                <span className = {styles.balance__key}>Wallet balance</span>
            </div>

            <div className={styles.btn__group}>
                <button className = {styles.disconect__btn} onClick = {disconnectWalletHandler}>Disconnect</button>
                <button className = {styles.buy__btn}>Buy Rance</button>
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

export default ConnectedModal;
