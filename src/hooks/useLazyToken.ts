import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import React, { useCallback, useMemo } from "react";
import { Erc20__factory } from "../typechain";
import { getDefaultProvider } from "../wallet/utils";
import useTransaction from "./useTransaction";
import { usePlenaWallet } from "plena-wallet-sdk";

const useLazyToken = () => {
    const { library, active, account } = useWeb3React();
    const {
        walletAddress: plenaWalletAddress,
        sendTransaction: sendTransactionWithPlena,
    } = usePlenaWallet();

    const connectedAddress = useMemo(() => {
        if (account) {
            return account;
        } else if (plenaWalletAddress) {
            return plenaWalletAddress;
        } else return undefined;
    }, [account, plenaWalletAddress]);
    const { send } = useTransaction();

    const initContract = useCallback(
        (tokenAddress: string) => {
            return Erc20__factory.connect(
                tokenAddress,
                library?.getSigner() || getDefaultProvider()
            );
        },
        [library]
    );

    const getBalance = useCallback(
        async (tokenAddress: string): Promise<BigNumber> => {
            if (!connectedAddress)
                throw new Error("Please connect your wallet");
            const contract = initContract(tokenAddress);
            try {
                return await contract.balanceOf(connectedAddress);
            } catch (error: any) {
                throw new Error(error);
            }
        },
        [connectedAddress, initContract]
    );

    const getAllowance = useCallback(
        async (tokenAddress: string, spender: string): Promise<BigNumber> => {
            if (!connectedAddress)
                throw new Error("Please connect your wallet");
            const contract = initContract(tokenAddress);
            try {
                return await contract.allowance(connectedAddress, spender);
            } catch (error: any) {
                throw new Error(error);
            }
        },
        [connectedAddress, initContract]
    );

    const getSymbol = useCallback(
        async (tokenAddress: string): Promise<string> => {
            const contract = initContract(tokenAddress);
            try {
                return await contract.symbol();
            } catch (error: any) {
                throw new Error(error);
            }
        },
        [initContract]
    );

    const getDecimal = useCallback(
        async (tokenAddress: string): Promise<number> => {
            const contract = initContract(tokenAddress);
            try {
                return await contract.decimals();
            } catch (error: any) {
                throw new Error(error);
            }
        },
        [initContract]
    );

    const approveWithEIP1193Wallets = useCallback(
        async (
            tokenAddress: string,
            spender: string,
            amount: BigNumber,
            callbacks?: { [key: string]: (errorMessage?: string) => void }
        ): Promise<void> => {
            if (!account) throw new Error("Please connect your wallet");
            const contract = initContract(tokenAddress);
            try {
                const method = contract.approve;
                const methodParams = [spender, amount];
                await send({ method, methodParams, callbacks });
            } catch (error: any) {
                throw new Error(error);
            }
        },
        [account, initContract, send]
    );

    const approveWithPlena = useCallback(
        async (
            tokenAddress: string,
            spender: string,
            amount: BigNumber,
            callbacks?: { [key: string]: (errorMessage?: string) => void }
        ): Promise<void> => {
            if (!plenaWalletAddress)
                throw new Error("Plena wallet not installed");
            const chainId =
                process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT === "mainnet" ||
                process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT === "staging"
                    ? 56
                    : 97;
            const itf = Erc20__factory.createInterface();
            const txData = itf.encodeFunctionData("approve", [spender, amount]);

            const tx = {
                from: plenaWalletAddress,
                data: [txData],
                to: [tokenAddress],
                tokens: ["", ""],
                amounts: ["0x0", "0x0"],
            };
            try {
                if (callbacks?.sent) {
                    callbacks?.sent();
                }
                const res = await sendTransactionWithPlena({
                    chain: chainId,
                    method: "send_transaction",
                    payload: {
                        transaction: tx,
                    },
                });
                console.log("approval res: ", res);
                if (res.success) {
                    return callbacks?.successfull();
                }

                callbacks?.failed(res.error);
            } catch (error: any) {
                callbacks?.failed(error.message);
            }
        },
        [plenaWalletAddress, sendTransactionWithPlena]
    );

    const approve = useCallback(
        async (
            tokenAddress: string,
            spender: string,
            amount: BigNumber,
            callbacks?: { [key: string]: (errorMessage?: string) => void }
        ): Promise<void> => {
            if (account) {
                return approveWithEIP1193Wallets(
                    tokenAddress,
                    spender,
                    amount,
                    callbacks
                );
            } else if (plenaWalletAddress) {
                return approveWithPlena(
                    tokenAddress,
                    spender,
                    amount,
                    callbacks
                );
            } else {
                throw new Error("Please connect your wallet");
            }
        },
        [
            account,
            approveWithEIP1193Wallets,
            approveWithPlena,
            plenaWalletAddress,
        ]
    );

    return { getAllowance, getBalance, getDecimal, getSymbol, approve };
};

export default useLazyToken;
