import { BigNumber } from "ethers";
import { Staking1, Staking2 } from "../../../typechain";
import {
    getStakingContract1UserEarnings,
    getStakingContract2UserEarnings,
} from "./helpers";

export const getPoolsEarnings = async (
    contract1: Staking1,
    contract2: Staking2,
    userAddress: string
): Promise<{ userStaked: BigNumber; userEarned: BigNumber }[]> => {
    const pools = await Promise.all([
        getStakingContract1UserEarnings(contract1, userAddress),
        getStakingContract2UserEarnings(contract2, userAddress),
    ]);

    return pools;
};
