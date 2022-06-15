import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/staking.module.css";

const Staking: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Rance Protocol - Staking</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.banner}>
                    <div className={styles.banner__container}>
                        <h1 className = {styles.banner__header}>Stake RANCE to earn RANCE or MUSD</h1>
                        <p className={styles.banner__text}>Staking is a way of earning interest on your cryptocurrency by depositing it for a fixed period of time</p>
                    </div>
                    <div className={styles.banner__image__container}>
                        <Image 
                            src = "/staking-banner-image.png"
                            alt = "staking page banner"
                            layout = "fill"
                            className={styles.banner__image}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Staking;
