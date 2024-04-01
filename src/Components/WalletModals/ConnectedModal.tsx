import React, { FC, useEffect, useMemo, useState } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import Image from "next/image";
import { toggleAccountModal } from "../../appState/shared/action";
import { useDispatch } from "react-redux";
import useToken from "../../hooks/useToken";
import { tokens } from "../../constants/addresses";
import { utils } from "ethers";
import { shortenAddress } from "../../utils/helpers";
import { useWeb3React } from "@web3-react/core";
import { walletLocalStorageKey } from "../../wallet/constant";
import { usePlenaWallet } from "plena-wallet-sdk";

export interface IConnectedModalProps {
    open: boolean;
    onClose: () => void;
    disconnectWallet: () => void;
}

export const ConnectedModal: FC<IConnectedModalProps> = ({
    onClose,
    open,
    disconnectWallet,
}) => {
    const dispatch = useDispatch();

    const { account } = useWeb3React();
    const {
        walletAddress: plenaWalletAddress,
        closeConnection: closePlenaConnection,
    } = usePlenaWallet();

    const connectedAddress = useMemo(() => {
        if (account) {
            return account;
        } else if (plenaWalletAddress) {
            return plenaWalletAddress;
        } else return undefined;
    }, [account, plenaWalletAddress]);

    const disconnectWalletHandler = () => {
        disconnectWallet();
        closePlenaConnection();
        toggleAccountModal(dispatch);
    };
    const BUSD = useToken(
        tokens[process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens]
            .BUSD
    );
    const RANCE = useToken(
        tokens[process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens]
            .RANCE
    );

    const [connectedWallet, setConnectedWallet] = useState<string | null>();

    useEffect(() => {
        if (!account && !plenaWalletAddress) return;
        const wallet = window.localStorage.getItem(walletLocalStorageKey);
        setConnectedWallet(wallet);
    }, [account, open, plenaWalletAddress]);

    return (
        <ModalWrapper
            open={open}
            label="Connect Wallet Modal"
            onClose={onClose}
            contentClassName={styles.root}
        >
            <h2 className={styles.heading}>Wallet connected</h2>
            <p className={styles.sub__heading}>
                Connect a wallet of your choice to have access to Rance protocol
            </p>
            <div className={styles.connected__wallet__details}>
                {connectedWallet && (
                    <div className={styles.connected__wallet__icon__wrapper}>
                        <Image
                            src={`/icons/${connectedWallet}.png`}
                            alt="connected wallet icon"
                            layout="fill"
                        />
                    </div>
                )}
                <span className={styles.connected__wallet__name}>
                    {window.localStorage.getItem(walletLocalStorageKey)}{" "}
                    connected
                </span>
                <span className={styles.connected__wallet__address}>
                    {shortenAddress(connectedAddress as string)}
                </span>
            </div>

            <div className={styles.wallet__balance}>
                {/* <span className={styles.balance__value}>{`${Number(
                    utils.formatUnits(BUSD.balance, BUSD.decimals)
                ).toFixed(2)} BUSD`}</span> */}
                <span className={styles.balance__value}>{`${Number(
                    utils.formatUnits(RANCE.balance, RANCE.decimals)
                ).toFixed(2)} RANCE`}</span>
                <span className={styles.balance__key}>Wallet balance</span>
            </div>

            <div className={styles.btn__group}>
                <button
                    className={styles.disconect__btn}
                    onClick={disconnectWalletHandler}
                >
                    Disconnect
                </button>
                {/* <button className={styles.buy__btn}>Buy Rance</button> */}
                <a
                    href={`https://pancakeswap.finance/swap?outputCurrency=${
                        tokens[
                            process.env
                                .NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens
                        ].RANCE
                    }`}
                    rel="noreferrer"
                    target="_blank"
                    className={styles.buy__btn}
                >
                    Buy Rance
                </a>
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
