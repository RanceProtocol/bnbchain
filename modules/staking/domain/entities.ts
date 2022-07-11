import { BigNumber } from "ethers";

export interface IStakingPool {
    id: string;
    tokenAddress: string;
    rewardTokenAddress: string;
    apr: string;
    totalStaked: BigNumber;
    totalEarned: BigNumber;
    staked: BigNumber;
    earned: BigNumber;
    contractUrl: string;
    stakeTokenDecimals: number;
    rewardTokenDecimals: number;
    stakeTokenPrice: string;
    rewardTokenPrice: string;
}
