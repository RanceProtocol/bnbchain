import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/insurance.module.css";

const Insurance: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Rance Protocol - Insurance</title>
            </Head>
            <main className={styles.main}></main>
        </div>
    );
};

export default Insurance;
