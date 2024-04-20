import { BigNumber } from "ethers";
import { SendParams } from "../../../hooks/useTransaction";
import {
    Erc20__factory,
    RanceProtocol,
    RanceProtocol__factory,
} from "../../../typechain";

type ICancelParams = {
    contract: RanceProtocol;
    packageId: string;
    send: (params: SendParams) => Promise<void>;
    callbacks: { [key: string]: (errorMessage?: string) => void };
};

export const cancelInsurance = async (params: ICancelParams): Promise<void> => {
    const { packageId, contract, send, callbacks } = params;
    const method = contract.cancel;
    const methodParams = [packageId];
    await send({ method, methodParams, callbacks });
};

type ICancelParamsWithPlena = Omit<ICancelParams, "contract" | "send"> & {
    contractAddress: string;
    userAddress: string;
    unsureFee: BigNumber;
    insuredAmount: BigNumber;
    ranceTokenAddress: string;
    insureCoinAddress: string;
    sendTransactionWithPlena: (params: any) => Promise<any>;
};

export const cancelInsuranceWithPlena = async (
    params: ICancelParamsWithPlena
) => {
    const {
        packageId,
        sendTransactionWithPlena,
        callbacks,
        contractAddress,
        userAddress,
        unsureFee,
        insuredAmount,
        ranceTokenAddress,
        insureCoinAddress,
    } = params;

    const RanceProtocolInterface = RanceProtocol__factory.createInterface();

    const erc20Interface = Erc20__factory.createInterface();

    const approveRanceTxData = erc20Interface.encodeFunctionData("approve", [
        contractAddress,
        unsureFee,
    ]);

    const approveInsureCoinTxData = erc20Interface.encodeFunctionData(
        "approve",
        [contractAddress, insuredAmount]
    );

    const txData = RanceProtocolInterface.encodeFunctionData("cancel", [
        packageId,
    ]);

    const tx = {
        from: userAddress,
        data: [approveRanceTxData, approveInsureCoinTxData, txData],
        to: [ranceTokenAddress, insureCoinAddress, contractAddress],
        tokens: ["", "", ""],
        amounts: ["0x0", "0x0", "0x0"],
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
        if (res.success) {
            if (res.content.error) {
                return callbacks?.failed(
                    `${res.error} Error canceling insurance!`
                );
            }
            return callbacks?.successfull();
        } else {
            callbacks?.failed(res.error);
        }
    } catch (error: any) {
        callbacks?.failed(error.message);
    }
};
