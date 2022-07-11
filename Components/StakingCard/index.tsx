import styles from "./styles.module.css";
import type { IStakingPool } from "../../constants/dummyData";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import {AiOutlineInfoCircle} from "react-icons/ai"
import clsx from "clsx";
import StakingModal from "../StakingModal";

interface IProps extends IStakingPool {}

const StakingCard: FC<IProps> = (props) => {
    const {
        apr,
        contractUrl,
        earnToken,
        poolId,
        stakeToken,
        stakeTokenPrice,
        staked,
        stakedUsd,
        totalEarning,
        totalEarningUsd,
        totalStaked,
        totalStakedUsd,
        walletUnlockStatus,
    } = props;

    const [modalState, setModalState] = useState<{open: boolean, action: "staking" | "unstaking"}>({open: false, action: "staking"})

    const stakeHandler = () => {

    }

    const unstakeHandler = () => {
        
    }

    const tringerActionModal = (action: "staking" | "unstaking") => {
        setModalState({open: true, action})
    }

    return (
        <Fragment>
             <div className={styles.root}>
            <div className={styles.tokens__logos__container}>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token-icons/${stakeToken}.png`}
                        alt={`${stakeToken} logo`}
                        layout="fill"
                    />
                </div>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token-icons/${earnToken}.png`}
                        alt={`${earnToken} logo`}
                        layout="fill"
                    />
                </div>
            </div>

            <h2 className={styles.pool__tokens}>{`${stakeToken} - ${earnToken}`}</h2>
            <p className={styles.pool__description}>{`Stake ${stakeToken}, Earn ${earnToken}`}</p>

            <div className={styles.apr}>
                <span className={styles.apr__text}>{`${apr}% APR`}</span>
                <AiOutlineInfoCircle className={styles.info__icon} />
            </div>

            <div className={styles.pool__details}>
                <div className = {styles.key__values}>
                    <span className={styles.key}>Total Earnings</span>
                    <span className={styles.value}>{`$${totalEarningUsd}`}</span>
                </div>

                <div className = {styles.key__values}>
                    <span className={styles.key}>Total Staked</span>
                    <span className={styles.value}>{`$${totalStakedUsd}`}</span>
                </div>
            </div>

            <div className={styles.user__details}>
                <div className = {styles.key__values}>
                    <span className={styles.key}>Earnings</span>
                    <span className={styles.value}>0.0 ~ $0.0</span>
                </div>

                <div className = {styles.key__values}>
                    <span className={styles.key}>Stake</span>
                    <span className={styles.value}>0.0 ~ $0.0</span>
                </div>
            </div>
            {!walletUnlockStatus ? 
                <button className = {clsx(styles.btn, styles.btn__hollow)}>Approve</button>
            :
            (!staked ? 
                <button className = {clsx(styles.btn, styles.btn__solid)}>Stake</button>
            : <div className={styles.btn__group}>
                <button className = {clsx(styles.btn__small, styles.btn__solid)} onClick={() => tringerActionModal("staking")}>Stake</button>
                <button className = {clsx(styles.btn__small, styles.btn__solid2)} onClick={() => tringerActionModal("unstaking")}>Unstake</button>
                <button className = {clsx(styles.btn__small, styles.btn__hollow)}>Harvest</button>
            </div>)
            }

            <a className={styles.contract__link} href={contractUrl} target = "_blank" rel="noreferrer">view contract</a>
        </div>
            <StakingModal 
                open = {modalState.open}
                action = {modalState.action}
                onClose = {() => setModalState(prev => ({...prev, open: false}))}
                actionHandler = {modalState.action === "staking" ? stakeHandler : unstakeHandler }
                earnTokenName = {earnToken}
                stakeTokenName = {stakeToken}
                poolId = {poolId}
            />
        </Fragment>
    );
};

export default StakingCard;
