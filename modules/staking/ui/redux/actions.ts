import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { Staking1, Staking2 } from "../../../../typechain";
import { IStakingPool } from "../../domain/entities";
import { getPoolsUserData as getPoolsUserDataUsecase } from "../../usecases/getPoolsUserData";
import { initializeStakingPools as initializeStakingPoolsUsecase } from "../../usecases/initialize";
import * as actionTypes from "./actionTypes";

export const initializeStakingPools =
    (contract1: Staking1, contract2: Staking2, userAddress:string | null | undefined) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({ type: actionTypes.GET__STAKING__POOLS });
        try {
            const pools: IStakingPool[] = await initializeStakingPoolsUsecase(
                contract1,
                contract2,
                userAddress
            );
            dispatch({
                type: actionTypes.GET__STAKING__POOLS__SUCCESS,
                payload: { pools },
            });
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
    };

export const getPoolsUserData = 
    (contract1: Staking1, contract2: Staking2, userAddress: string) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        
        dispatch({ type: actionTypes.GET__POOLS__USER__DATA });
        
        try {
            const poolsUserData = await getPoolsUserDataUsecase(
                contract1,
                contract2,
                userAddress
            );
            dispatch({
                type: actionTypes.GET__POOLS__USER__DATA__SUCCESS,
                payload: { poolsUserData }
            });
        } catch (error) {
            dispatch({
                type: actionTypes.GET__POOLS__USER__DATA__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    "Error getting user staking earnings! Please reload the page",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };
