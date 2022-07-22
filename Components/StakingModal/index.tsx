import { BigNumber, utils } from "ethers";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";
// import { stake } from "../../modules/staking/usecases/stake";
import { isValidAmountValue, truncateString } from "../../utils/helpers";
import CustomToast, { STATUS, TYPE } from "../CustomToast";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";

interface IProps {
    open: boolean;
    action: "staking" | "unstaking";
    poolId: number;
    stakeTokenSymbol: string;
    rewardTokenSymbol: string;
    ranceBalance: BigNumber;
    userStake?: BigNumber;
    rewardTokenAddress: string;
    stakeTokenAddress: string;
    contractAddress: string;
    stake: (
        stakingAddress: string,
        pId: number,
        amount: BigNumber,
        callbacks: { [key: string]: (errorMessage?: string) => void }
    ) => void;
    unstake: (
        stakingAddress: string,
        pId: number,
        amount: BigNumber,
        callbacks: {
            [key: string]: (errorMessage?: string | undefined) => void;
        }
    ) => void;
    onClose: () => void;
}

const StakingModal: FC<IProps> = ({
    open,
    action,
    onClose,
    stakeTokenSymbol,
    rewardTokenSymbol,
    poolId,
    ranceBalance,
    userStake,
    contractAddress,
    stakeTokenAddress,
    stake,
    unstake,
}) => {
    const { allowances, getAllowance, approve } = useToken(stakeTokenAddress);

    useEffect(() => {
        (async () => {
            getAllowance(contractAddress);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [amount, setAmount] = useState<string>("");
    const [sendingTx, setSendingTx] = useState<boolean>(false);

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isValidAmountValue(event.target.value))
            return event.preventDefault();

        setAmount(event.target.value);
    };

    const onAfterCloseHandler = () => {
        setAmount("");
    };

    const stakeHandler = () => {
        if (amount === "0") return;

        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: `staking ${amount} RANCE in ${stakeTokenSymbol}/${rewardTokenSymbol} pool`,
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
                setSendingTx(true);
            },
            successfull: async () => {
                const toastBody = CustomToast({
                    message: `Successfully staked ${amount} RANCE in ${stakeTokenSymbol}/${rewardTokenSymbol} pool`,
                    status: STATUS.SUCCESSFULL,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
                onClose();
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "Error staking tokens",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
        };

        stake(contractAddress, poolId, utils.parseEther(amount), callbacks);
    };

    const unstakeHandler = () => {
        if (!BigNumber.from(amount).gt(0)) {
            const toastBody = CustomToast({
                message: "You cannot unstake 0 RANCE",
                status: STATUS.ERROR,
                type: TYPE.ERROR,
            });
            return toast(toastBody);
        }

        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: `unstaking ${amount} RANCE from ${stakeTokenSymbol}/${rewardTokenSymbol} pool`,
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
                setSendingTx(true);
            },
            successfull: async () => {
                const toastBody = CustomToast({
                    message: `Successfully staked ${amount} RANCE from ${stakeTokenSymbol}/${rewardTokenSymbol} pool`,
                    status: STATUS.SUCCESSFULL,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
                onClose();
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "Error unstaking tokens",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast.dismiss(pendingToastId);
                toast(toastBody);
                setSendingTx(false);
            },
        };

        unstake(contractAddress, poolId, utils.parseEther(amount), callbacks);
    };

    const handleApprove = async () => {
        if (amount === "0") return;
        let pendingToastId: number | string = "";
        const callbacks = {
            sent: () => {
                const toastBody = CustomToast({
                    message: "Approving RANCE for staking",
                    status: STATUS.PENDING,
                    type: TYPE.TRANSACTION,
                });
                pendingToastId = toast(toastBody, { autoClose: false });
                setSendingTx(true);
            },
            successfull: async () => {
                try {
                    const newAllowance = await getAllowance(contractAddress);
                } catch (error) {
                    console.error(error);
                } finally {
                    toast.dismiss(pendingToastId);
                    const toastBody = CustomToast({
                        message: "RANCE approval successfull",
                        status: STATUS.SUCCESSFULL,
                        type: TYPE.TRANSACTION,
                    });
                    toast(toastBody);
                    setSendingTx(false);
                }
            },
            failed: (errorMessage?: string) => {
                const toastBody = CustomToast({
                    message: errorMessage
                        ? truncateString(errorMessage, 100)
                        : "RANCE approval failed",
                    status: STATUS.ERROR,
                    type: TYPE.TRANSACTION,
                });
                toast(toastBody);
                setSendingTx(false);
            },
        };
        try {
            await approve(contractAddress, utils.parseEther(amount), callbacks);
        } catch (error: any) {
            console.error(error);
        }
    };
    return (
        <ModalWrapper
            open={open}
            label={`${action} modal`}
            onClose={onClose}
            onAfterClose={onAfterCloseHandler}
            contentClassName={styles.root}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>{action}</h1>
                <button className={styles.close__btn} onClick={onClose}>
                    <div className={styles.close__icon__wrapper}>
                        <Image
                            src={`/icons/close.svg`}
                            alt="modal close icon"
                            layout="fill"
                        />
                    </div>
                </button>
            </div>

            <div className={styles.tokens__logos__container}>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token-icons/${stakeTokenSymbol}.png`}
                        alt={`${stakeTokenSymbol} logo`}
                        layout="fill"
                    />
                </div>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token-icons/${rewardTokenSymbol}.png`}
                        alt={`${rewardTokenSymbol} logo`}
                        layout="fill"
                    />
                </div>
            </div>
            <h2
                className={styles.pool__tokens}
            >{`${stakeTokenSymbol} - ${rewardTokenSymbol}`}</h2>

            <div className={styles.input__group}>
                <div className={styles.label__and__balance}>
                    <label className={styles.label} htmlFor="amount__input">
                        {action === "staking"
                            ? "Amount to stake"
                            : "Amount to unstake"}
                    </label>
                    <span className={styles.balance}>
                        {action === "staking"
                            ? `Available: ${Number(
                                  utils.formatEther(ranceBalance)
                              )} RANCE`
                            : `staked: ${Number(
                                  utils.formatEther(userStake as BigNumber)
                              )} RANCE`}
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="Enter an amount to stake"
                    value={amount}
                    onChange={handleAmountChange}
                    className={styles.amount__input}
                    autoFocus
                />
            </div>
            {action === "staking" ? (
                amount === "" ? (
                    <span className={styles.message}>Enter amount</span>
                ) : Number(amount) > Number(utils.formatEther(ranceBalance)) ? (
                    <span className={styles.message}>Insufficient balance</span>
                ) : allowances[contractAddress] &&
                  allowances[contractAddress].gte(utils.parseEther(amount)) ? (
                    <button
                        className={styles.action__button}
                        onClick={stakeHandler}
                        disabled={sendingTx}
                    >
                        {sendingTx ? "Staking RANCE..." : "Stake"}
                    </button>
                ) : (
                    <button
                        className={styles.action__button}
                        onClick={handleApprove}
                        disabled={sendingTx}
                    >
                        {sendingTx ? "Approving RANCE..." : "Approve RANCE"}
                    </button>
                )
            ) : amount === "" ? (
                <span className={styles.message}>Enter amount</span>
            ) : Number(amount) > Number(utils.formatEther(userStake!)) ? (
                <span className={styles.message}>
                    Insufficient stake balance
                </span>
            ) : (
                <button
                    className={styles.action__button}
                    onClick={unstakeHandler}
                    disabled={sendingTx}
                >
                    {sendingTx ? "Unstaking RANCE..." : "Unstake"}
                </button>
            )}
        </ModalWrapper>
    );
};

export default StakingModal;
