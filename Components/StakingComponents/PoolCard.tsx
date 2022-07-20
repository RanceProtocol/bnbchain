import styles from "./poolCard.module.css";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import { AiOutlineInfoCircle } from "react-icons/ai";
import clsx from "clsx";
import StakingModal from "../StakingModal";
import type { IStakingPool } from "../../modules/staking/domain/entities";
import useLazyToken from "../../hooks/useLazyToken";
import { utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { toggleWalletModal } from "../../appState/shared/action";
import { useDispatch } from "react-redux";

interface IProps extends IStakingPool {}

const PoolCard: FC<IProps> = (props) => {
    const {
        id,
        apr,
        contractAddress,
        rewardTokenAddress,
        rewardTokenDecimals,
        rewardTokenSymbol,
        rewardTokenPrice,
        stakeTokenSymbol,
        stakeTokenAddress,
        stakeTokenDecimals,
        stakeTokenPrice,
        potentialEarnings,
        totalStaked,
        userEarned,
        userStaked,
    } = props;

    const { getSymbol } = useLazyToken();

    const [modalState, setModalState] = useState<{
        open: boolean;
        action: "staking" | "unstaking";
    }>({ open: false, action: "staking" });
    const { account } = useWeb3React();

    const dispatch = useDispatch();

    const stakeHandler = () => {};

    const unstakeHandler = () => {};

    const tringerActionModal = (action: "staking" | "unstaking") => {
        setModalState({ open: true, action });
    };

    return (
        <Fragment>
            <div className={styles.root}>
                <div className={styles.tokens__logos__container}>
                    <div className={styles.token__logo}>
                        <Image
                            src="/token-icons/RANCE.png"
                            alt="RANCE logo"
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
                <p
                    className={styles.pool__description}
                >{`Stake ${stakeTokenSymbol}, Earn ${rewardTokenSymbol}`}</p>

                <div className={styles.apr}>
                    <span className={styles.apr__text}>{`${apr}% APR`}</span>
                    <AiOutlineInfoCircle className={styles.info__icon} />
                </div>

                {account && userEarned !== undefined && (
                    <div className={styles.user__details}>
                        <div className={styles.key__values}>
                            <span className={styles.key}>Earnings</span>
                            <span className={styles.value}>{`$${
                                Number(
                                    utils.formatUnits(
                                        userEarned!,
                                        rewardTokenDecimals
                                    )
                                ) * rewardTokenPrice
                            }`}</span>
                        </div>

                        <div className={styles.key__values}>
                            <span className={styles.key}>Stake</span>
                            <span className={styles.value}>{`$${
                                Number(
                                    utils.formatUnits(
                                        userStaked!,
                                        stakeTokenDecimals
                                    )
                                ) * stakeTokenPrice
                            }`}</span>
                        </div>
                    </div>
                )}

                <div className={styles.pool__details}>
                    <div className={styles.key__values}>
                        <span className={styles.key}>Potential earnings</span>
                        <span className={styles.value}>{`$${
                            Number(
                                utils.formatUnits(
                                    potentialEarnings,
                                    rewardTokenDecimals
                                )
                            ) * rewardTokenPrice
                        }`}</span>
                    </div>

                    <div className={styles.key__values}>
                        <span className={styles.key}>Total Staked</span>
                        <span className={styles.value}>{`$${
                            Number(
                                utils.formatUnits(
                                    totalStaked,
                                    stakeTokenDecimals
                                )
                            ) * stakeTokenPrice
                        }`}</span>
                    </div>
                </div>

                {!account ? (
                    <button
                        className={clsx(styles.btn, styles.btn__solid)}
                        onClick={() => toggleWalletModal(dispatch)}
                    >
                        Connect wallet
                    </button>
                ) : (
                    <div className={styles.btn__group}>
                        <button
                            className={clsx(
                                styles.btn__small,
                                styles.btn__solid
                            )}
                            onClick={() => tringerActionModal("staking")}
                        >
                            Stake
                        </button>
                        <button
                            className={clsx(
                                styles.btn__small,
                                styles.btn__solid2
                            )}
                            onClick={() => tringerActionModal("unstaking")}
                        >
                            Unstake
                        </button>
                        <button
                            className={clsx(
                                styles.btn__small,
                                styles.btn__hollow
                            )}
                        >
                            Harvest
                        </button>
                    </div>
                )}

                <a
                    className={styles.contract__link}
                    href={`https://cronos.com/address/${contractAddress}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    view contract
                </a>
            </div>
            {/* <StakingModal 
                open = {modalState.open}
                action = {modalState.action}
                onClose = {() => setModalState(prev => ({...prev, open: false}))}
                actionHandler = {modalState.action === "staking" ? stakeHandler : unstakeHandler }
                earnTokenName = {earnToken}
                stakeTokenName = {stakeToken}
                poolId = {poolId}
            /> */}
        </Fragment>
    );
};

export default PoolCard;
