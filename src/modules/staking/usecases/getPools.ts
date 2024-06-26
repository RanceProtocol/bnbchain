import { Staking1, Staking2 } from "../../../typechain";
import { IStakingPool } from "../domain/entities";
import { getstakingContract1Pool, getstakingContract2Pool } from "./helpers";

export const getPools = async (
    contract1: Staking1,
    contract2: Staking2
): Promise<IStakingPool[]> => {
    const pools = await Promise.all([
        getstakingContract1Pool(contract1),
        getstakingContract2Pool(contract2),
    ]);

    return pools;
};
