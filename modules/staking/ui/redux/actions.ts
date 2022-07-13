import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { Staking1, Staking2 } from "../../../../typechain";
import { IStakingPool } from "../../domain/entities";
import { initializeStakingPools as initializeStakingPoolsUsecase } from "../../usecases/initialize";
import * as actionTypes from "./actionTypes";

export const initializeStakingPools = (
    contract1: Staking1,
    contract2: Staking2,
    userAddress: string | null | undefined
) => async (
    dispatch: Dispatch<{ type: string; payload?: any }>
): Promise<void> => {

    dispatch({type: actionTypes.GET__STAKING__POOLS})

    try {
        const pools:IStakingPool[] = await initializeStakingPoolsUsecase(contract1, contract2, userAddress)
        dispatch({
            type: actionTypes.GET__STAKING__POOLS__SUCCESS,
            payload: {pools}
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET__STAKING__POOLS__FAILLED,
        });
        const toastBody = CustomToast({
            message: "Error getting staking pools! Please reload the page",
            status: STATUS.ERROR,
            type: TYPE.ERROR,
        });
        toast(toastBody);
    }
}
