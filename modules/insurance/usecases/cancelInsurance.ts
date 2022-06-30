import useTransaction from "../../../hooks/useTransaction";
import { RanceProtocol } from "../../../typechain";

interface ICancelParams {
    contract: RanceProtocol;
    packageId: string;
    callbacks: { [key: string]: (errorMessage?: string) => void };
}

export const cancelInsurance = async (params: ICancelParams): Promise<void> => {
    const { packageId, contract, callbacks } = params;
    const { send } = useTransaction();
    const method = contract.cancel;
    const methodParams = [packageId];
    await send({ method, methodParams, callbacks });
};
