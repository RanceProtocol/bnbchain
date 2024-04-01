import { IStakingPool } from "../../domain/entities";
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
        case actionTypes.GET__STAKING__POOLS__PENDING:
            return { ...state, loadingPools: true };
        case actionTypes.GET__STAKING__POOLS__FAILLED:
            return {
                ...state,
                loadingPools: false,
                loadingUserEarnings: false,
            };
        case actionTypes.GET__STAKING__POOLS__SUCCESS:
            return { ...state, pools: payload.pools, loadingPools: false };
        case actionTypes.UPDATE__STAKING__POOLS:
            return {
                ...state,
                pools: [
                    { ...state.pools[0], ...payload.pools[0] },
                    { ...state.pools[1], ...payload.pools[1] },
                ],
            }; // since we only have two pools
        case actionTypes.GET__USER__EARNING__PENDING:
            return { ...state, loadingUserEarnings: true };
        case actionTypes.GET__USER__EARNING__FAILLED:
            return { ...state, loadingUserEarnings: false };
        case actionTypes.GET__USER__EARNING__SUCCESS:
            if (!state.pools.length) return state;
            return {
                ...state,
                pools: [
                    { ...state.pools[0], ...payload.userEarnings[0] },
                    { ...state.pools[1], ...payload.userEarnings[1] },
                ],
                loadingUserEarnings: false,
            };
        case actionTypes.RESET_USER_STATE:
            state.pools.map((pool) => {
                return {
                    ...pool,
                    userEarned: undefined,
                    userStaked: undefined,
                };
            });
        default:
            return state;
    }
};
