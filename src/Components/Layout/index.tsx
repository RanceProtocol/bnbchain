import { FC, Fragment, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
    toggleAccountModal,
    toggleWalletModal,
} from "../../appState/shared/action";
import { useSharedStore } from "../../appState/shared/store";
import useWallet from "../../wallet/hooks/useWallet";
import Header from "../Header";
import { DisconnectedModal, IConnectedModalProps } from "../WalletModals/";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import { useReferralViewModel } from "../../modules/referral/controllers/referralController";
import dynamic from "next/dynamic";

const ConnectedModal = dynamic<IConnectedModalProps>(() =>
    import("../WalletModals/").then((module) => module.ConnectedModal)
);

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    const sharedStore = useSharedStore();
    const { accountModalOpened, walletModalOpened } = sharedStore;
    const dispatch = useDispatch();
    const { connectWallet, disconnectWallet } = useWallet();

    const { getReferrerAddress } = useReferralViewModel();

    useEffect(() => {
        (async () => {
            getReferrerAddress(window.location.href);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof window === "undefined") null;

    return (
        <Fragment>
            <div className={styles.root}>
                <Header />
                {children}
                <ToastContainer
                    position="bottom-right"
                    hideProgressBar={true}
                    closeButton={false}
                    toastClassName={styles.toast}
                />
            </div>
            <DisconnectedModal
                open={walletModalOpened}
                onClose={() => toggleWalletModal(dispatch)}
                connectWallet={connectWallet}
            />
            <ConnectedModal
                open={accountModalOpened}
                onClose={() => toggleAccountModal(dispatch)}
                disconnectWallet={disconnectWallet}
            />
        </Fragment>
    );
};

export default Layout;
