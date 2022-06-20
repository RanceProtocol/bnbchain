import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import type { IinsurancePackagePlan, PackageEnum } from "../../constants/data";
import { insurableCoins } from "../../constants/data";

interface IProp extends IinsurancePackagePlan {
    onClickAction: (data: { open: boolean; packageType: PackageEnum }) => void;
}

const InsurancePackagePlanCard: FC<IProp> = (props) => {
    const {
        name,
        duration,
        insuranceFeePercentage,
        timeUnit,
        unInsureFeeInRance,
        packageType,
        onClickAction,
    } = props;

    return (
        <div className={styles.insurance__package__card}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.insurable__coins__wrapper}>
                <span className={styles.insurable__coins__key}>
                    Insurable coins
                </span>
                <div className={styles.insurable__coins__container}>
                    {insurableCoins.map((coninSymbol: string) => (
                        <div
                            className={styles.coin_logo__wrapper}
                            key={coninSymbol}
                        >
                            <Image
                                src={`/token icons/${coninSymbol}.png`}
                                alt={`${coninSymbol} logo`}
                                layout="fill"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.package__details}>
                <div className={styles.key__value}>
                    <span className={styles.value}>
                        {duration}{" "}
                        <span className={styles.value__unit}>{timeUnit}</span>
                    </span>
                    <span className={styles.key}>Duration</span>
                </div>
                <div className={styles.key__value}>
                    <span className={styles.value}>
                        {insuranceFeePercentage} <span>&#37;</span>
                    </span>
                    <span className={styles.key}>Insurance Fee</span>
                </div>
                <div className={styles.key__value}>
                    <span className={styles.value}>
                        {unInsureFeeInRance}{" "}
                        <span className={styles.value__unit}>RANCE</span>
                    </span>
                    <span className={styles.key}>Unsurance Fee</span>
                </div>
            </div>
            <button
                className={styles.button}
                onClick={() => onClickAction({ open: true, packageType })}
            >
                Buy package
            </button>
        </div>
    );
};

export default InsurancePackagePlanCard;
