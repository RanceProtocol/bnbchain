import useTransaction from "../../../hooks/useTransaction";
import { RanceProtocol } from "../../../typechain";

interface IWithdrawParams {
    contract: RanceProtocol;
    packageId: string;
    callbacks: { [key: string]: (errorMessage?: string) => void };
}

export const withdrawInsurance = async (params: IWithdrawParams): Promise<void> => {
    const { packageId, contract, callbacks } = params;
    const { send } = useTransaction();
    const method = contract.withdraw;
    const methodParams = [packageId];
    await send({ method, methodParams, callbacks });
};
