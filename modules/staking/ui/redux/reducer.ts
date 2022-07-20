import { IStakingStore } from "../../domain/stakingStore";
import * as actionTypes from "./actionTypes";

const initialState: IStakingStore = {
    loadingPools: false,
    loadingUserEarnings: false,
    pools: [],
};

export const stakingReducer = (
    state = initialState,
    action: { type: string; payload?: any }
): IStakingStore => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.GET__STAKING__POOLS:
            return { ...state, loadingPools: true };
        case actionTypes.GET__STAKING__POOLS__SUCCESS:
            return {
                ...state,
                pools: payload.pools,
                loadingPools: false,
            };
        case actionTypes.GET__STAKING__POOLS__FAILLED:
            return {
                ...state,
                loadingPools: false,
            };
        // case actionTypes.UPDATE__STAKING__POOL:
        //     const unChangedPools = state.pools.filter(
        //         (pool) =>
        //             pool.id !== payload.pool.id &&
        //             pool.contractAddress !== payload.pool.contractAddress
        //     );
        //     return { ...state, pools: [...unChangedPools, payload.pool] };
        case actionTypes.GET__POOLS__USER__DATA:
            return {...state, loadingUserEarnings: true}
        case actionTypes.GET__POOLS__USER__DATA__SUCCESS:
            const poolsArray = state.pools
            for(let i = 0; i < poolsArray.length; i++) {
                poolsArray[i] = {...poolsArray[i], ...payload.poolsUserData[i]}
            }
            return {...state, pools: poolsArray, loadingUserEarnings: false}
        case actionTypes.GET__POOLS__USER__DATA__FAILED:
            return {...state, loadingUserEarnings: false}
        default:
            return state;
    }
};
