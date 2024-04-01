import { walletStrings } from "../../wallet/constant";
import {
    BitKeep,
    Metamask,
    Plena,
    SafePal,
    TrustWallet,
    WalletConnect,
} from "../svgIcons";

export const walletConfig = [
    {
        title: "Metamask",
        icon: Metamask,
        walletName: walletStrings.metamask,
    },
    {
        title: "Plena",
        icon: Plena,
        walletName: walletStrings.plena,
    },
    {
        title: "Bitkeep",
        icon: BitKeep,
        walletName: walletStrings.bitkeep,
    },
    {
        title: "Trustwallet",
        icon: TrustWallet,
        walletName: walletStrings.trustwallet,
    },
    {
        title: "Safepal",
        icon: SafePal,
        walletName: walletStrings.safepal,
    },
    {
        title: "WalletConnect",
        icon: WalletConnect,
        walletName: walletStrings.walletconnect,
    },
];
