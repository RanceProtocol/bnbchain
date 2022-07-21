import { Web3Provider } from "@ethersproject/providers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { stakingContractAddresses } from "../../../constants/addresses";
import useTransaction from "../../../hooks/useTransaction";
import { Staking1__factory, Staking2__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import { initializeStakingPools as initializeStakingPoolsAction } from "../ui/redux/actions";
import { getPoolsUserData as getPoolsUserDataAction } from "../ui/redux/actions";
import { compound as compoundUsecase } from "../usecases/compound";
import { stake as stakeUsecase } from "../usecases/stake";
import { unstake as unstakeUsecase } from "../usecases/unstake";
import { harvest as harvestUsecase } from "../usecases/harvest";
import { BigNumber } from "ethers";

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
        provider?.getSigner() || getDefaultProvider()
    );

    const stakingContract2 = Staking2__factory.connect(
        stakingContractAddresses[dappEnv][1],
        provider?.getSigner() || getDefaultProvider()
    );

    const initializeStakingPools = useCallback(() => {
        initializeStakingPoolsAction(
            stakingContract1,
            stakingContract2,
            address
        )(dispatch);
    }, [stakingContract1, stakingContract2]);

    const getPoolsUserData = useCallback(() => {
        if(!address) return
        getPoolsUserDataAction(stakingContract1, stakingContract2, address)(dispatch)
        
    }, [stakingContract1,stakingContract2, address])

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
            stakeUsecase({ contract, pId, amount, send, callbacks });
        },
        [stakingContract1, stakingContract2]
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
            unstakeUsecase({ contract, pId, amount, send, callbacks });
        },
        [stakingContract1, stakingContract2]
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
            harvestUsecase({ contract, pId, send, callbacks });
        },
        [stakingContract1, stakingContract2]
    );

    const compound = useCallback(
        (
            stakingAddress: string,
            callbacks: { [key: string]: (errorMessage?: string) => void }
        ) => {
            if (stakingAddress !== stakingContract1.address) return; // only the pool in stakingContract1 has a pool that supports compounding
            compoundUsecase({ contract: stakingContract1, send, callbacks });
        },
        [stakingContract1]
    );

    return { initializeStakingPools, getPoolsUserData, stake, unstake, harvest, compound };
};
