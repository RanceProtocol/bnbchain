import { Dispatch } from "react";
import { toast } from "react-toastify";
import CustomToast, { STATUS, TYPE } from "../../../../Components/CustomToast";
import { RanceProtocol } from "../../../../typechain";
import { getPackagePlans } from "../../usecases/getPackagePlans";
import { getUserPackages } from "../../usecases/getUserPackages";
import * as actionTypes from "./actionTypes";

export const initializePackagePlans =
    (contract: RanceProtocol) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GET__PACKAGE__PLANS,
        });

        try {
            const data = await getPackagePlans(contract);
            dispatch({
                type: actionTypes.GET__PACKAGE__PLANS__SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: actionTypes.GET__PACKAGE__PLANS__FAILED,
            });
            const toastBody = CustomToast({
                message:
                    "Error getting package plans! Please reload the page",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            toast(toastBody);
        }
    };

export const intializeUserPackages =
    (contract: RanceProtocol, userAddress: string) =>
    async (
        dispatch: Dispatch<{ type: string; payload?: any }>
    ): Promise<void> => {
        dispatch({
            type: actionTypes.GET__USER__PACKAGES,
        });

        try {
            const packages = await getUserPackages(contract, userAddress);
            dispatch({
                type: actionTypes.GET__USER__PACKAGES__SUCCESS,
                payload: { userPackages: packages },
            });
        } catch (error) {
            dispatch({
                type: actionTypes.GET__USER__PACKAGES__FAILED,
            });
        }
    };
