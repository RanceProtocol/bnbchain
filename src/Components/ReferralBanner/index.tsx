import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";

const ReferralBanner = () => {
    return (
        <div className={styles.root}>
            <div className={styles.banner__container}>
                <h1 className={styles.banner__header}>Referrals</h1>
                <p className={styles.banner__text}>
                    When your direct referrals buy an insurance package, you are
                    given a % of the package fee plus other indirect commisions.
                </p>
            </div>
            <div className={styles.banner__image__container}>
                <Image
                    src="/referral-banner-image.png"
                    alt="staking page banner"
                    layout="fill"
                    className={styles.banner__image}
                />
            </div>
        </div>
    );
};

export default ReferralBanner;
