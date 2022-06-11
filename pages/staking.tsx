import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/staking.module.css";

const Staking: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Rance Protocol - Staking</title>
            </Head>
            <main className={styles.main}></main>
        </div>
    );
};

export default Staking;
