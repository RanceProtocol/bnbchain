import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { stakingContractAddresses } from "../../../constants/addresses";
import useTransaction from "../../../hooks/useTransaction";
import { Staking1__factory, Staking2__factory } from "../../../typechain";
import {
    initializeStakingPools as initializeStakingPoolsAction,
    updateStakingPools as updateStakingPoolsAction,
    getUserPoolsEarnings as getUserPoolsEarningsActions,
} from "../infrastructure/redux/actions";
import { compound as compoundUsecase } from "../usecases/compound";
import { stake as stakeUsecase } from "../usecases/stake";
import { unstake as unstakeUsecase } from "../usecases/unstake";
import { harvest as harvestUsecase } from "../usecases/harvest";
import { BigNumber } from "ethers";
import useSWRImmutable from "swr/immutable";
import { resilientJsonRpcProvider } from "../../../constants/provider";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
}

type addressType = keyof typeof stakingContractAddresses;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;

export const useStakingViewModel = (props: IProps) => {
    const { address, provider } = props;
    const dispatch = useDispatch();
    const { send } = useTransaction();

    const stakingContract1 = Staking1__factory.connect(
        stakingContractAddresses[dappEnv][0],
        provider?.getSigner() || resilientJsonRpcProvider
    );

    const stakingContract2 = Staking2__factory.connect(
        stakingContractAddresses[dappEnv][1],
        provider?.getSigner() || resilientJsonRpcProvider
    );

    const initializeStakingPools = useCallback(async () => {
        const stakingContract1 = Staking1__factory.connect(
            stakingContractAddresses[dappEnv][0],
            provider || resilientJsonRpcProvider
        );

        const stakingContract2 = Staking2__factory.connect(
            stakingContractAddresses[dappEnv][1],
            provider || resilientJsonRpcProvider
        );
        initializeStakingPoolsAction(
            stakingContract1,
            stakingContract2
        )(dispatch);
    }, [dispatch, provider]);

    const updateStakingPools = useCallback(async () => {
        const stakingContract1 = Staking1__factory.connect(
            stakingContractAddresses[dappEnv][0],
            provider || resilientJsonRpcProvider
        );

        const stakingContract2 = Staking2__factory.connect(
            stakingContractAddresses[dappEnv][1],
            provider || resilientJsonRpcProvider
        );
        updateStakingPoolsAction(stakingContract1, stakingContract2)(dispatch);
    }, [dispatch, provider]);

    const getUserPoolsEarnings = useCallback(async () => {
        if (!address) return;

        const stakingContract1 = Staking1__factory.connect(
            stakingContractAddresses[dappEnv][0],
            provider || resilientJsonRpcProvider
        );

        const stakingContract2 = Staking2__factory.connect(
            stakingContractAddresses[dappEnv][1],
            provider || resilientJsonRpcProvider
        );
        getUserPoolsEarningsActions(
            stakingContract1,
            stakingContract2,
            address
        )(dispatch);
    }, [address, dispatch, provider]);

    const stake = useCallback(
        (
            stakingAddress: string,
            pId: number,
            amount: BigNumber,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;

            const successCb = callbacks["successfull"];

            const successCallback = () => {
                updateStakingPools();
                getUserPoolsEarnings();
                successCb();
            };
            const modifiedCb = { ...callbacks, successfull: successCallback };
            stakeUsecase({
                contract,
                pId,
                amount,
                send,
                callbacks: modifiedCb,
            });
        },
        [
            getUserPoolsEarnings,
            send,
            stakingContract1,
            stakingContract2,
            updateStakingPools,
        ]
    );

    const unstake = useCallback(
        (
            stakingAddress: string,
            pId: number,
            amount: BigNumber,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;

            const successCb = callbacks["successfull"];

            const successCallback = () => {
                updateStakingPools();
                getUserPoolsEarnings();
                successCb();
            };
            const modifiedCb = { ...callbacks, successfull: successCallback };
            unstakeUsecase({
                contract,
                pId,
                amount,
                send,
                callbacks: modifiedCb,
            });
        },
        [
            getUserPoolsEarnings,
            send,
            stakingContract1,
            stakingContract2,
            updateStakingPools,
        ]
    );

    const harvest = useCallback(
        (
            stakingAddress: string,
            pId: number,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            const contract =
                stakingContract1.address === stakingAddress
                    ? stakingContract1
                    : stakingContract2;

            const successCb = callbacks["successfull"];

            const successCallback = () => {
                getUserPoolsEarnings();
                successCb();
            };
            const modifiedCb = { ...callbacks, successfull: successCallback };
            harvestUsecase({ contract, pId, send, callbacks: modifiedCb });
        },
        [getUserPoolsEarnings, send, stakingContract1, stakingContract2]
    );

    const compound = useCallback(
        (
            stakingAddress: string,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            if (stakingAddress !== stakingContract1.address) return; // only the pool in stakingContract1 has a pool that supports compounding

            const successCb = callbacks["successfull"];

            const successCallback = () => {
                updateStakingPools();
                getUserPoolsEarnings();
                successCb();
            };
            const modifiedCb = { ...callbacks, successfull: successCallback };

            compoundUsecase({
                contract: stakingContract1,
                send,
                callbacks: modifiedCb,
            });
        },
        [getUserPoolsEarnings, send, stakingContract1, updateStakingPools]
    );

    // useEffect(() => {
    //     watchEvent(stakingContract1, "Deposit", [null, 0, null], async () => {
    //         const contract = Staking1__factory.connect(
    //             stakingContractAddresses[dappEnv][0],
    //             provider || resilientJsonRpcProvider
    //         );
    //         updateStakingPoolAction(contract, 0, address)(dispatch);
    //     });

    //     watchEvent(stakingContract1, "Withdraw", [null, 0, null], async () => {
    //         const contract = Staking1__factory.connect(
    //             stakingContractAddresses[dappEnv][0],
    //             provider || resilientJsonRpcProvider
    //         );
    //         updateStakingPoolAction(contract, 0, address)(dispatch);
    //     });

    //     return () => {
    //         stakingContract1.removeAllListeners();
    //     };
    // }, [address, dispatch, provider, stakingContract1]);

    // useEffect(() => {
    //     watchEvent(stakingContract2, "Deposit", [null, 1, null], async () => {
    //         const contract = Staking2__factory.connect(
    //             stakingContractAddresses[dappEnv][1],
    //             provider || resilientJsonRpcProvider
    //         );
    //         updateStakingPoolAction(contract, 1, address)(dispatch);
    //     });

    //     watchEvent(stakingContract2, "Withdraw", [null, 1, null], async () => {
    //         const contract = Staking2__factory.connect(
    //             stakingContractAddresses[dappEnv][1],
    //             provider || resilientJsonRpcProvider
    //         );
    //         updateStakingPoolAction(contract, 1, address)(dispatch);
    //     });

    //     return () => {
    //         stakingContract2.removeAllListeners();
    //     };
    // }, [address, dispatch, provider, stakingContract2]);

    // initialize the pools
    useEffect(() => {
        (async () => {
            initializeStakingPools();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // updating the pools every 30 seconds
    useSWRImmutable(["update staking pools"], updateStakingPools, {
        refreshInterval: 30 * 1000,
    });

    useSWRImmutable(["get user earnings"], getUserPoolsEarnings, {
        refreshInterval: 15 * 1000,
    });

    return { initializeStakingPools, stake, unstake, harvest, compound };
};
