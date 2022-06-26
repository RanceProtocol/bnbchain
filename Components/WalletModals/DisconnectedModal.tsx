import React, { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import { BsExclamationTriangle } from "react-icons/bs";
import Image from "next/image";
import { Metamask, SafePal, TrustWallet, WalletConnect } from "../svgIcons";
import {toggleWalletModal} from "../../appState/shared/action"
import { useDispatch } from "react-redux";

interface IProps {
    open: boolean;
    onClose: () => void;
    connectWallet: (name: string) => void
}

export const DisconnectedModal: FC<IProps> = ({ open, onClose, connectWallet }) => {
    const dispatch = useDispatch()
    const connectWalletHandler = async (name: string) => {
        await connectWallet(name)
        toggleWalletModal(dispatch)
    }
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

            <div className={styles.wallet__wrapper}>
                <button className = {styles.wallet__btn} onClick = {() => connectWalletHandler("metamask")}>
                    <Metamask className = {styles.wallet__icon} width = "60" />
                    <span className={styles.wallet__name}>Metamask</span>
                </button>
                <button className = {styles.wallet__btn} onClick = {() => connectWalletHandler("trustwallet")}>
                    <TrustWallet className = {styles.wallet__icon} width = "60" />
                    <span className={styles.wallet__name}>Trustwallet</span>
                </button>
                <button className = {styles.wallet__btn} onClick = {() => connectWalletHandler("safepal")}>
                    <SafePal className = {styles.wallet__icon} width = "60" />
                    <span className={styles.wallet__name}>Safepal</span>
                </button>
                <button className = {styles.wallet__btn} onClick = {() => connectWalletHandler("walletconnect")}>
                    <WalletConnect className = {styles.wallet__icon} width = "60" />
                    <span className={styles.wallet__name}>WalletConnect</span>
                </button>
            </div>

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
