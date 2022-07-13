import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/staking.module.css";
import StakingCard from "../Components/StakingCard";
import { stakingPools } from "../constants/dummyData";
// import type { IStakingPool } from "../constants/dummyData";
import { useStakingViewModel } from "../modules/staking/controllers/stakingViewModel";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { IStakingPool } from "../modules/staking/domain/entities";
import { stakingState } from "../modules/staking/ui/redux/state";

const Staking: NextPage = () => {
    const { account, library } = useWeb3React();

    const { initializeStakingPools } = useStakingViewModel({
        address: account,
        provider: library,
    });

    useEffect(() => {
        initializeStakingPools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    const {loadingPools, pools} = stakingState()
    return (
        <div className={styles.container}>
            <Head>
                <title>Rance Protocol - Staking</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.banner}>
                    <div className={styles.banner__container}>
                        <h1 className={styles.banner__header}>
                            Stake RANCE to earn RANCE or MUSD
                        </h1>
                        <p className={styles.banner__text}>
                            Staking is a way of earning interest on your RANCE
                            token by depositing it for a fixed period of time
                        </p>
                    </div>
                    <div className={styles.banner__image__container}>
                        <Image
                            src="/staking-banner-image.png"
                            alt="staking page banner"
                            layout="fill"
                            className={styles.banner__image}
                        />
                    </div>
                </div>

                <div className={styles.staking__card__wrapper}>
                    {pools.length !==0 && pools.map((pool: IStakingPool) => (
                        <StakingCard key={pool.id} {...pool} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Staking;
