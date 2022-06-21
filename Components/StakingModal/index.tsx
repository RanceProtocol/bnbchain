import { BigNumber } from "ethers";
import Image from "next/image";
import { FC } from "react";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";

interface IProps {
    open: boolean;
    action: "staking" | "unstaking";
    poolId: string;
    stakeTokenName: string;
    earnTokenName: string;
    ranceBalance?: BigNumber;
    stakeBalance?: BigNumber;
    actionHandler: () => void;
    onClose: () => void;
}

const StakingModal: FC<IProps> = ({
    open,
    action,
    onClose,
    stakeTokenName,
    actionHandler,
    earnTokenName,
    poolId,
    ranceBalance,
    stakeBalance,
}) => {
    return (
        <ModalWrapper
            open={open}
            label={`${action} modal`}
            onClose={onClose}
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
                        src={`/token icons/${stakeTokenName}.png`}
                        alt={`${stakeTokenName} logo`}
                        layout="fill"
                    />
                </div>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token icons/${earnTokenName}.png`}
                        alt={`${earnTokenName} logo`}
                        layout="fill"
                    />
                </div>
            </div>
            <h2
                className={styles.pool__tokens}
            >{`${stakeTokenName} - ${earnTokenName}`}</h2>

            <div className={styles.input__group}>
                <div className={styles.label__and__balance}>
                    <label className={styles.label} htmlFor="amount__input">
                        Amount to stake
                    </label>
                    <span className={styles.balance}>Available: 1000 MUSD, 80 RANCE</span>
                </div>
                <input
                    type="text"
                    placeholder="Enter an amount to stake"
                    // value={amount}
                    // onChange={handleAmountChange}
                    className={styles.amount__input}
                    autoFocus
                />
            </div>
            <button className={styles.action__button}>Stake</button>
        </ModalWrapper>
    );
};

export default StakingModal;
