import { useSelector } from "react-redux";
import { IAppState } from "../../../../appState";
import IInsuranceStore from "../../domain/insuranceStore";


export const insuranceState = ():IInsuranceStore => {
    return useSelector((state:IAppState) => state.insurance)
}