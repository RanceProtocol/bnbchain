import React, { FC, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import { BsExclamationTriangle } from "react-icons/bs";
import Image from "next/image";
import { MoreIcon } from "../svgIcons";
import { toggleWalletModal } from "../../appState/shared/action";
import { useDispatch } from "react-redux";
import { walletConfig } from "./config";
import { walletStrings } from "../../wallet/constant";

interface IProps {
    open: boolean;
    onClose: () => void;
    connectWallet: (name: string, isPlena?: boolean) => Promise<void>;
}

export const DisconnectedModal: FC<IProps> = ({
    open,
    onClose,
    connectWallet,
}) => {
    const dispatch = useDispatch();
    const connectWalletHandler = async (name: string, isPlena?: boolean) => {
        await connectWallet(name, isPlena);
        toggleWalletModal(dispatch);
    };
    const [showMore, setShowMore] = useState(false);
    let diplayedWallet = showMore ? walletConfig : walletConfig.slice(0, 3);

    const onAfterClose = () => {
        setShowMore(false);
    };

    return (
        <ModalWrapper
            open={open}
            label="Connect Wallet Modal"
            onClose={onClose}
            contentClassName={styles.root}
            onAfterClose={onAfterClose}
        >
            <h2 className={styles.heading}>Connect Wallet</h2>
            <p className={styles.sub__heading}>
                Connect a wallet of your choice to have access to Rance protocol
            </p>

            <div className={styles.wallet__wrapper}>
                {diplayedWallet.map((wallet, index) => {
                    const Icon = wallet.icon;
                    return (
                        <button
                            key={index}
                            className={styles.wallet__btn}
                            onClick={() =>
                                connectWalletHandler(
                                    wallet.walletName,
                                    wallet.walletName === walletStrings.plena
                                )
                            }
                        >
                            <Icon className={styles.wallet__icon} width="52" />
                            <span className={styles.wallet__name}>
                                {wallet.title}
                            </span>
                        </button>
                    );
                })}
                {!showMore && (
                    <button
                        className={styles.wallet__btn}
                        onClick={() => setShowMore(true)}
                    >
                        <MoreIcon className={styles.wallet__icon} width="40" />
                        <span className={styles.wallet__name}>More</span>
                    </button>
                )}
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
