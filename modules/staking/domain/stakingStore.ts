import { IStakingPool } from "./entities";

export interface IStakingStore {
    loadingPools: boolean;
    pools: IStakingPool[];
}
