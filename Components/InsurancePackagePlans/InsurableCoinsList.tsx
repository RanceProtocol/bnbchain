import Image from "next/image";
import { FC } from "react";
import styles from "./insurableCoinsListStyles.module.css";

interface IProp {
    coinSymbols: string[];
}

const InsurableCoinsList: FC<IProp> = ({ coinSymbols }) => {
    return (
        <div className={styles.root}>
            <div className={styles.coin_logo__container}>
                {coinSymbols.slice(0, 4).map((symbol: string) => (
                    <div className={styles.coin_logo__wrapper} key={symbol}>
                        <Image
                            src={`/token-icons/${symbol}.png`}
                            alt={`${symbol} logo`}
                            layout="fill"
                        />
                    </div>
                ))}
            </div>
            <p className={styles.remaining__test}>{`+${
                coinSymbols.length - 4
            }`}</p>
        </div>
    );
};

export default InsurableCoinsList;
