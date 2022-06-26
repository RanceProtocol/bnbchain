import { Dispatch } from "react";
import { RanceProtocol } from "../../../../typechain";
import {
    IInsurancePackage,
    IInsurancePackagePlan,
} from "../../domain/entities";
import * as actionTypes from "./actionTypes";

export const initializePackagePlans =
    (contract: RanceProtocol) =>
    (
        dispatch: Dispatch<{ type: string; payload?: IInsurancePackagePlan[] }>
    ): void => {
        dispatch({
            type: actionTypes.GET__PACKAGE__PLANS,
        });

        try {
            // get packages plans here
            //dispatch the packages here with success
        } catch (error) {
            // dispactch failled here
        }
    };

export const intializeUserPackages =
    (contract: RanceProtocol, userAddress: string) =>
    (
        dispatch: Dispatch<{ type: string; payload?: IInsurancePackage[] }>
    ): void => {
        dispatch({
            type: actionTypes.GET__USER__PACKAGES,
        });

        try {
        } catch (error) {}
    };
