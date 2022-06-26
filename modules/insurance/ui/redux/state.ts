import { useSelector } from "react-redux";


export const insuranceState = () => {
    return useSelector((state:any) => state.insurance)
}