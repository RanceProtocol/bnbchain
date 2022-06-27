import { Web3Provider } from "@ethersproject/providers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import {
    initializePackagePlans as initializePackagePlansAction,
    intializeUserPackages as intializeUserPackagesAction,
} from "../ui/redux/actions";

interface IProps {
    address: string | null | undefined;
    provider: Web3Provider | undefined;
}

type addressType = keyof typeof ranceProtocol;
const dappEnv: addressType = process.env
    .NEXT_PUBLIC_DAPP_ENVIRONMENT as addressType;
export const useInsuranceViewModel = (props: IProps) => {
    const { address, provider } = props;
    const dispatch = useDispatch();

    const insuranceContract = RanceProtocol__factory.connect(
        ranceProtocol[dappEnv],
        provider?.getSigner() || getDefaultProvider()
    );
    
    const initializePackagePlans = useCallback(async () => {
        await initializePackagePlansAction(insuranceContract)(dispatch);
    }, [insuranceContract]);

    const intializeUserPackages = useCallback(async () => {
        if (!address) return;
        await intializeUserPackagesAction(insuranceContract, address)(dispatch);
    }, [insuranceContract, address]);

    return { initializePackagePlans, intializeUserPackages };
};
