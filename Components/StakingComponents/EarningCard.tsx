import styles from "./earningCard.module.css";
import { FC } from "react";
import Image from "next/image";
import { BigNumber } from "ethers";

interface IProps {
    id: number;
    contractAddress: string;
    rewardTokenDecimals: number;
    rewardTokenSymbol: string;
    rewardTokenPrice: number;
    userEarned: BigNumber | undefined;
}

const EarningCard: FC<IProps> = (props) => {
    const {
        id,
        contractAddress,
        rewardTokenDecimals,
        rewardTokenSymbol,
        rewardTokenPrice,
        userEarned,
    } = props;

    return (
        <div className={styles.root}>
            <div className={styles.heading}>
                <div className={styles.token__logo}>
                    <Image
                        src={`/token-icons/${rewardTokenSymbol}.png`}
                        alt={`${rewardTokenSymbol} logo`}
                        layout="fill"
                    />
                </div>
                <span className = {styles.dollar__value}>{`~ $${450}`}</span>
            </div>

            <div className={styles.token__section}>
                <span className = {styles.token__name}>{rewardTokenSymbol}</span>
                <span className = {styles.token__amount}>234,000</span>
            </div>

            <div className={styles.withdraw__section}>
                <button className = {styles.withdraw__button}>{`withdraw ${rewardTokenSymbol}`}</button>
            </div>
            
        </div>
    );
};

export default EarningCard;
