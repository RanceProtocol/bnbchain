import { BigNumber } from "ethers";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import {
    initializePackagePlans as initializePackagePlansAction,
    intializeUserPackages as intializeUserPackagesAction,
    removeUserPackage as removeUserPackageAction,
} from "../infrastructure/redux/actions";
import {
    insureWithEIP1193 as insureWithEIP1193UseCase,
    insureWithPlena as insureWithPlenaUseCase,
} from "../usecases/insure";
import {
    cancelInsurance as cancelInsuranceUseCase,
    cancelInsuranceWithPlena as cancelInsuranceWithPlenaUseCase,
} from "../usecases/cancelInsurance";
import {
    withdrawInsurance as withdrawInsuranceUseCase,
    withdrawInsuranceWithPlena as withdrawInsuranceWithPlenaUseCase,
} from "../usecases/withdrawInsurance";
import { watchEvent } from "../../../utils/events";
import useTransaction from "../../../hooks/useTransaction";
import { useWeb3React } from "@web3-react/core";
import { usePlenaWallet } from "plena-wallet-sdk";
import { retriableStaticJsonRpcProvider } from "../../../constants/provider";

type addressType = keyof typeof ranceProtocol;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useInsuranceViewModel = () => {
    const { account, library: provider } = useWeb3React();

    const {
        walletAddress: plenaWalletAddress,
        sendTransaction: sendTransactionWithPlena,
    } = usePlenaWallet();

    const address = useMemo(() => {
        if (account) {
            return account;
        } else if (plenaWalletAddress) {
            return plenaWalletAddress;
        } else return undefined;
    }, [account, plenaWalletAddress]);
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const insuranceContract = RanceProtocol__factory.connect(
        ranceProtocol[dappEnv],
        provider?.getSigner() || retriableStaticJsonRpcProvider
    );

    const initializePackagePlans = useCallback(async (): Promise<void> => {
        const insuranceContract = RanceProtocol__factory.connect(
            ranceProtocol[dappEnv],
            provider?.getSigner() || retriableStaticJsonRpcProvider
        );
        await initializePackagePlansAction(insuranceContract)(dispatch);
    }, [provider, dispatch]);

    const intializeUserPackages = useCallback(async (): Promise<void> => {
        const insuranceContract = RanceProtocol__factory.connect(
            ranceProtocol[dappEnv],
            provider?.getSigner() || retriableStaticJsonRpcProvider
        );
        await intializeUserPackagesAction(insuranceContract, address)(dispatch);
    }, [address, provider, dispatch]);

    const removeUserPackage = useCallback(
        async (packageId: string) => {
            dispatch(removeUserPackageAction(packageId));
        },
        [dispatch]
    );

    interface IinsureParams {
        planId: string;
        amount: BigNumber;
        path: string[];
        insureCoin: string;
        paymentToken: string;
        referrer?: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const insure = useCallback(
        async ({
            planId,
            amount,
            path,
            insureCoin,
            paymentToken,
            referrer,
            callbacks,
        }: IinsureParams): Promise<void> => {
            if (plenaWalletAddress) {
                await insureWithPlenaUseCase({
                    contractAddress: ranceProtocol[dappEnv],
                    userAddress: plenaWalletAddress,
                    planId,
                    amount,
                    path,
                    insureCoin,
                    paymentToken,
                    referrer,
                    sendTransactionWithPlena,
                    callbacks,
                });
            } else {
                await insureWithEIP1193UseCase({
                    contract: insuranceContract,
                    planId,
                    amount,
                    path,
                    insureCoin,
                    paymentToken,
                    referrer,
                    send,
                    callbacks,
                });
            }
        },
        [insuranceContract, plenaWalletAddress, send, sendTransactionWithPlena]
    );

    interface ICancelParams {
        packageId: string;
        insureCoinAddress: string;
        insuredAmount: BigNumber;
        ranceTokenAddress: string;
        unsureFee: BigNumber;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const cancelInsurance = useCallback(
        async ({
            packageId,
            callbacks,
            insureCoinAddress,
            insuredAmount,
            ranceTokenAddress,
            unsureFee,
        }: ICancelParams): Promise<void> => {
            if (plenaWalletAddress) {
                await cancelInsuranceWithPlenaUseCase({
                    contractAddress: ranceProtocol[dappEnv],
                    userAddress: plenaWalletAddress,
                    sendTransactionWithPlena,
                    packageId,
                    insureCoinAddress,
                    insuredAmount,
                    ranceTokenAddress,
                    unsureFee,
                    callbacks,
                });
            } else {
                await cancelInsuranceUseCase({
                    contract: insuranceContract,
                    packageId,
                    send,
                    callbacks,
                });
            }
        },
        [insuranceContract, plenaWalletAddress, send, sendTransactionWithPlena]
    );

    interface IWithdrawParams {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?: string) => void };
    }

    const withdrawInsurance = useCallback(
        async ({ packageId, callbacks }: IWithdrawParams): Promise<void> => {
            if (plenaWalletAddress) {
                await withdrawInsuranceWithPlenaUseCase({
                    contractAddress: ranceProtocol[dappEnv],
                    userAddress: plenaWalletAddress,
                    sendTransactionWithPlena,
                    packageId,
                    callbacks,
                });
            } else {
                await withdrawInsuranceUseCase({
                    contract: insuranceContract,
                    packageId,
                    send,
                    callbacks,
                });
            }
        },
        [insuranceContract, plenaWalletAddress, send, sendTransactionWithPlena]
    );

    useEffect(() => {
        watchEvent(
            insuranceContract,
            "InsuranceCancelled",
            [null, address],
            (_packageId, _user, event) => {
                setTimeout(() => removeUserPackage(_packageId), 2000); // this delay is a work around to ensure the modal is closed before the package is removed from the state to prevent app crash
            }
        );

        watchEvent(
            insuranceContract,
            "InsuranceWithdrawn",
            [null, address],
            (_packageId, _user, event) => {
                setTimeout(() => removeUserPackage(_packageId), 2000);
            }
        );

        return () => {
            insuranceContract.removeAllListeners();
        };
    }, [insuranceContract, address, removeUserPackage]);

    return {
        initializePackagePlans,
        intializeUserPackages,
        insure,
        cancelInsurance,
        withdrawInsurance,
    };
};
