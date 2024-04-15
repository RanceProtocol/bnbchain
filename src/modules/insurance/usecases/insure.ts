import { BigNumber } from "ethers";
import { SendParams } from "../../../hooks/useTransaction";
import {
    Erc20__factory,
    RanceProtocol,
    RanceProtocol__factory,
} from "../../../typechain";
import { getDefaultProvider } from "../../../wallet/utils";
import { tokens } from "../../../constants/addresses";

type IinsureParams = {
    contract: RanceProtocol;
    planId: string;
    amount: BigNumber;
    path: string[];
    insureCoin: string;
    paymentToken: string;
    referrer?: string;
    send: (params: SendParams) => Promise<void>;
    callbacks: { [key: string]: (errorMessage?: string) => void };
};

export const insureWithEIP1193 = async (
    params: IinsureParams
): Promise<void> => {
    const {
        contract,
        planId,
        amount,
        path,
        insureCoin,
        paymentToken,
        referrer,
        send,
        callbacks,
    } = params;
    const method = referrer ? contract.insureWithReferrer : contract.insure;
    const methodParams = referrer
        ? [planId, amount, path, insureCoin, paymentToken, referrer]
        : [planId, amount, path, insureCoin, paymentToken];

    await send({ method, methodParams, callbacks });
};

type IinsureWithPlenaParams = Omit<IinsureParams, "contract" | "send"> & {
    contractAddress: string;
    userAddress: string;
    sendTransactionWithPlena: (params: any) => Promise<any>;
};

export const insureWithPlena = async (
    params: IinsureWithPlenaParams
): Promise<void> => {
    const {
        contractAddress,
        userAddress,
        planId,
        amount,
        path,
        insureCoin,
        paymentToken,
        referrer,
        sendTransactionWithPlena,
        callbacks,
    } = params;
    const RanceProtocolInterface = RanceProtocol__factory.createInterface();
    const ERC20Interface = Erc20__factory.createInterface();
    console.log({ contractAddress, amount });

    const paymentTokenAdress =
        tokens[process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT as keyof typeof tokens][
            paymentToken as "BUSD" | "USDT" | "RANCE"
        ];

    const approveTxData = ERC20Interface.encodeFunctionData("approve", [
        contractAddress,
        amount,
    ]);

    let txData;
    if (referrer) {
        txData = RanceProtocolInterface.encodeFunctionData(
            "insureWithReferrer",
            [planId, amount, path, insureCoin, paymentToken, referrer]
        );
    } else {
        txData = RanceProtocolInterface.encodeFunctionData("insure", [
            planId,
            amount,
            path,
            insureCoin,
            paymentToken,
        ]);
    }

    const tx = {
        from: userAddress,
        data: [approveTxData, txData],
        to: [paymentTokenAdress, contractAddress],
        tokens: ["", ""],
        amounts: ["0x0", "0x0"],
        gasLimit: "1000000",
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
        console.log("insure res: ", res);
        if (res.success) {
            const provider = getDefaultProvider();
            const receipt = await provider.waitForTransaction(
                res.content.transactionHash
            );

            if (receipt.status) {
                return callbacks?.successfull();
            } else {
                return callbacks?.failed("Insurrance purchase failed!");
            }
        }

        callbacks?.failed(res.error);
    } catch (error: any) {
        callbacks?.failed(error.message);
    }
};
