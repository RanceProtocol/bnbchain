import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ranceProtocol } from "../../../constants/addresses";
import { RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import {
    initializePackagePlans as initializePackagePlansAction,
    intializeUserPackages as intializeUserPackagesAction,
} from "../ui/redux/actions";
import { insure as insureUseCase } from "../usecases/insure";
import { cancelInsurance as cancelInsuranceUseCase } from "../usecases/cancelInsurance";
import { withdrawInsurance as withdrawInsuranceUseCase } from "../usecases/withdrawInsurance";

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

    const initializePackagePlans = useCallback(async (): Promise<void> => {
        await initializePackagePlansAction(insuranceContract)(dispatch);
    }, [insuranceContract]);

    const intializeUserPackages = useCallback(async (): Promise<void> => {
        await intializeUserPackagesAction(insuranceContract, address)(dispatch);
    }, [insuranceContract, address]);

    interface IinsureParams {
        planId: string;
        amount: BigNumber;
        path: string[];
        insureCoin: string;
        paymentToken: string;
        callbacks: { [key: string]: (errorMessage?:string) => void };
    }

    const insure = useCallback(
        async ({
            planId,
            amount,
            path,
            insureCoin,
            paymentToken,
            callbacks,
        }: IinsureParams): Promise<void> => {
            await insureUseCase({
                contract: insuranceContract,
                planId,
                amount,
                path,
                insureCoin,
                paymentToken,
                callbacks,
            });
        },
        [insuranceContract, address]
    );

    interface ICancelParams {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?:string) => void };
    }

    const cancelInsurance = useCallback(
        async ({ packageId, callbacks }: ICancelParams): Promise<void> => {
            await cancelInsuranceUseCase({
                contract: insuranceContract,
                packageId,
                callbacks,
            });
        },
        [insuranceContract, address]
    );

    interface IWithdrawParams {
        packageId: string;
        callbacks: { [key: string]: (errorMessage?:string) => void };
    }

    const withdrawInsurance = useCallback(
        async ({ packageId, callbacks }: IWithdrawParams): Promise<void> => {
            await withdrawInsuranceUseCase({
                contract: insuranceContract,
                packageId,
                callbacks,
            });
        },
        [insuranceContract, address]
    )

    return {
        initializePackagePlans,
        intializeUserPackages,
        insure,
        cancelInsurance,
        withdrawInsurance,
    };
};
