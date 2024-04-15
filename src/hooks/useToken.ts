import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { Erc20__factory } from "../typechain";
import { watchEvent } from "../utils/events";
import { getDefaultProvider } from "../wallet/utils";
import useTransaction from "./useTransaction";
import { usePlenaWallet } from "plena-wallet-sdk";

const useToken = (address: string) => {
    const { library, account } = useWeb3React();
    const { walletAddress: plenaWalletAddress } = usePlenaWallet();

    const connectedAddress = useMemo(() => {
        if (account) {
            return account;
        } else if (plenaWalletAddress) {
            return plenaWalletAddress;
        } else return undefined;
    }, [account, plenaWalletAddress]);
    const [balance, setBalance] = useState(BigNumber.from(0));
    const [allowances, setAllowance] = useState<{ [key: string]: BigNumber }>(
        {}
    );
    const [symbol, setSymbol] = useState("");
    const [decimals, setDecimals] = useState(18);

    const contract = Erc20__factory.connect(
        address,
        library?.getSigner() || getDefaultProvider()
    );
    const { send } = useTransaction();

    const getSymbol = async () => {
        if (symbol !== "") return symbol;
        try {
            const result = await contract.symbol();
            setSymbol(result);
            return result;
        } catch (error: any) {
            console.error(error);
        }
    };

    const getDecimals = async () => {
        if (decimals !== 0) return decimals;
        try {
            const result = await contract.decimals();
            setDecimals(result);
            return result;
        } catch (error: any) {
            console.error(error);
        }
    };

    const getBalance = async () => {
        if (!connectedAddress) {
            console.error("Please connect your wallet");
        }
        try {
            const result = await contract.balanceOf(connectedAddress);
            setBalance(result);
            return result;
        } catch (error: any) {
            console.error(error);
        }
    };

    const approve = async (
        spender: string,
        amount: string | BigNumber,
        callbacks?: { [key: string]: () => void }
    ): Promise<void> => {
        if (!connectedAddress) {
            throw new Error("Please connect your wallet");
        }
        try {
            const method = contract.approve;
            const methodParams = [spender, amount];
            await send({ method, methodParams, callbacks });
        } catch (error: any) {
            console.error(error);
        }
    };

    const getAllowance = async (spender: string) => {
        if (!connectedAddress) {
            throw new Error("Please connect your wallet");
        }
        try {
            const result = await contract.allowance(connectedAddress, spender);
            setAllowance((allowances) => ({
                ...allowances,
                [spender]: result,
            }));
            return result;
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!contract) return;
        (async () => {
            try {
                await Promise.all([getDecimals(), getBalance()]);
            } catch (error) {
                console.error(error);
            }
        })();

        //events
        watchEvent(
            contract,
            "Transfer",
            [connectedAddress],
            async (from, to, value, event) => {
                try {
                    await getBalance();
                } catch (error) {
                    console.error(error);
                }
            }
        );
        watchEvent(
            contract,
            "Approval",
            [connectedAddress],
            async (owner, spender, value, event) => {
                try {
                    await getAllowance(spender);
                } catch (error) {
                    console.error(error);
                }
            }
        );
        watchEvent(
            contract,
            "Transfer",
            [null, connectedAddress],
            async (from, to, value, event) => {
                try {
                    await getBalance();
                } catch (error) {
                    console.error(error);
                }
            }
        );

        return () => {
            if (!contract) return;
            contract.removeAllListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectedAddress, address]);

    return {
        getSymbol,
        getBalance,
        decimals,
        getAllowance,
        allowances,
        approve,
        balance,
        symbol,
    };
};

export default useToken;
