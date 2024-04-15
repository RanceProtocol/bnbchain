import { SendParams } from "../../../hooks/useTransaction";
import { RanceProtocol, RanceProtocol__factory } from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";

type IWithdrawParams = {
    contract: RanceProtocol;
    packageId: string;
    send: (params: SendParams) => Promise<void>;
    callbacks: { [key: string]: (errorMessage?: string) => void };
};

export const withdrawInsurance = async (
    params: IWithdrawParams
): Promise<void> => {
    const { packageId, contract, send, callbacks } = params;
    const method = contract.withdraw;
    const methodParams = [packageId];
    await send({ method, methodParams, callbacks });
};

type IWithdrawParamsWithPlena = Omit<IWithdrawParams, "contract" | "send"> & {
    contractAddress: string;
    userAddress: string;
    sendTransactionWithPlena: (params: any) => Promise<any>;
};

export const withdrawInsuranceWithPlena = async (
    params: IWithdrawParamsWithPlena
) => {
    const {
        callbacks,
        contractAddress,
        userAddress,
        packageId,
        sendTransactionWithPlena,
    } = params;

    const RanceProtocolInterface = RanceProtocol__factory.createInterface();
    const txData = RanceProtocolInterface.encodeFunctionData("withdraw", [
        packageId,
    ]);

    const tx = {
        from: userAddress,
        data: [txData],
        to: [contractAddress],
        tokens: ["", ""],
        amounts: ["0x0", "0x0"],
    };
    try {
        if (callbacks?.sent) {
            callbacks?.sent();
        }
        const res = await sendTransactionWithPlena({
            chain: 56,
            method: "send_transaction",
            payload: {
                transaction: tx,
            },
        });
        console.log("withdraw res: ", res);
        if (res.success) {
            const provider = getDefaultProvider();
            const receipt = await provider.waitForTransaction(
                res.content.transactionHash
            );

            if (receipt.status) {
                return callbacks?.successfull();
            } else {
                return callbacks?.failed("Insurrance withdrawal failed!");
            }
        }

        callbacks?.failed(res.error);
    } catch (error: any) {
        callbacks?.failed(error.message);
    }
};
