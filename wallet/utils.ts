import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { explorers } from "../constants/explorers";
import { RPC_URLS } from "../constants/rpcUrls";
import { getChainId } from "../utils/helpers";

export const addNetwork = async (
    provider: ethers.providers.ExternalProvider
) => {
    if (!provider.request) return;
    const chainId = getChainId();
    try {
        await provider?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
    } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError?.code === 4902 || switchError?.code === -32603) {
            try {
                await provider?.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: "Cronos Mainnet Beta",
                            rpcUrls: [RPC_URLS[chainId]],
                            blockExplorerUrls: [explorers[chainId]],
                            nativeCurrency: {
                                name: "Cronos",
                                symbol: "CRO", // 2-6 characters long
                                decimals: 18,
                            },
                        },
                    ],
                });
            } catch (addError: any) {
                if (addError?.code === 4001) {
                    // const body = ToastBody("User rejected the request to add network", STATUS.ERROR, TYPE.ERROR);
                    // toast(body);
                }
                console.error(addError);
            }
        }
        if (switchError?.code === 4001) {
            // const body = ToastBody("User rejected the request to switch network", STATUS.ERROR, TYPE.ERROR);
            // toast(body);
        }
        console.error(switchError);
    }
};

export const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider);
    // library.pollingInterval = 12000
    return library;
};

export const getDefaultProvider = () => {
    return new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT === "mainnet" ||
        process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT === "staging"
            ? RPC_URLS[25]
            : RPC_URLS[338]
    );
};
