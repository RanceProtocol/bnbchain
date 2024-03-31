import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { Staking1, Staking2 } from "../../../../typechain";
import { IStakingPool } from "../../domain/entities";
import { getPools as getPoolsUsecase } from "../../usecases/getPools";
import { getPoolsEarnings as getPoolsEarningsUsecase } from "../../usecases/getPoolsEarnings";
import * as actionTypes from "./actionTypes";

export const initializeStakingPools =
    (contract1: Staking1, contract2: Staking2) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({ type: actionTypes.GET__STAKING__POOLS__PENDING });
        try {
            const pools: IStakingPool[] = await getPoolsUsecase(
                contract1,
                contract2
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

export const updateStakingPools =
    (contract1: Staking1, contract2: Staking2) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        try {
            const pools: IStakingPool[] = await getPoolsUsecase(
                contract1,
                contract2
            );

            dispatch({
                type: actionTypes.UPDATE__STAKING__POOLS,
                payload: { pools },
            });
        } catch (error) {
            // const toastBody = CustomToast({
            //     message: "Error updqting staking pools! Please reload the page",
            //     status: STATUS.ERROR,
            //     type: TYPE.ERROR,
            // });
            // toast(toastBody);
            console.error(error);
        }
    };

export const getUserPoolsEarnings =
    (contract1: Staking1, contract2: Staking2, userAddress: string) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({ type: actionTypes.GET__USER__EARNING__PENDING });
        try {
            const userEarnings = await getPoolsEarningsUsecase(
                contract1,
                contract2,
                userAddress
            );

            dispatch({
                type: actionTypes.GET__USER__EARNING__SUCCESS,
                payload: { userEarnings },
            });
        } catch (error) {
            dispatch({ type: actionTypes.GET__USER__EARNING__FAILLED });
            // const toastBody = CustomToast({
            //     message: "Error getting user earnings! Please reload the page",
            //     status: STATUS.ERROR,
            //     type: TYPE.ERROR,
            // });
            // toast(toastBody);
            console.error(error);
        }
    };

export const resetUserState = async (
    dispatch: Dispatch<{ type: string; payload?: any }>
): Promise<void> => {
    dispatch({ type: actionTypes.RESET_USER_STATE });
};
