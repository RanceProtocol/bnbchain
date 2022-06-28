import clsx from "clsx";
import Image from "next/image";
import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { isValidAmountValue } from "../../utils/helpers";
import ModalWrapper from "../ModalWrapper";
import styles from "./styles.module.css";
import Select, { GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { insuranceState } from "../../modules/insurance/ui/redux/state";

interface IProps {
    state: { open: boolean; planId: string };
    onClose: () => void;
}

const PackagePurchaseModal: FC<IProps> = ({
    state: { open, planId },
    onClose,
}) => {
    const state = insuranceState();
    const {packagePlans, insurableCoins, paymentTokens} = state;
    const targetPackageData = packagePlans.find(
        (x) => x.planId === planId
    );

    const [formDetails, setFormDetails] = useState<{
        coin: string | undefined;
        amount: string;
        insuranceFee: string;
        total: string;
        paymentToken:  { value: string, label: string } | null
    }>({ coin: undefined, amount: "", insuranceFee: "0", total: "0", paymentToken: null });

    const [paymentTokenOptions, setPaymentTokenOptions] = useState<OptionsOrGroups<{ value: string; label: string; }, GroupBase<{ value: string; label: string; }>> | undefined>()
    const { amount, insuranceFee, total, paymentToken } = formDetails;

    useEffect(() => {
      if(!insurableCoins || formDetails.coin) return
      setFormDetails((prev) => ({
        ...prev,
        coin: Object.keys(insurableCoins)[0],
    }));
    }, [JSON.stringify(insurableCoins)])

    useEffect(() => {
        if(!paymentTokens) return
        const entries = Object.entries(paymentTokens)
        const paymentTokenOptionsObject = entries.map((entry: string[]) => ({value: entry[1], label: entry[0]}))
        setPaymentTokenOptions(paymentTokenOptionsObject)
      }, [JSON.stringify(paymentTokens)])
      
      
    const handleCoinChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setFormDetails((prev) => ({
                ...prev,
                coin: event.target.value,
            }));
        },
        [setFormDetails]
    );

    const handlePaymentTokenChange = useCallback((selectedOpt: SingleValue<{ value: string, label: string }>) => {
       setFormDetails(prev => ({...prev, paymentToken: selectedOpt}))
    },[setFormDetails])

    const handleAmountChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (!isValidAmountValue(event.target.value))
                return event.preventDefault();

            const calculatedInsuranceFee =
                Number(event.target.value) *
                (Number(targetPackageData?.insuranceFee) / 100);

            setFormDetails((prev) => ({
                ...prev,
                amount: event.target.value,
                insuranceFee: calculatedInsuranceFee.toString(),
                total: (
                    Number(event.target.value) + calculatedInsuranceFee
                ).toString(),
            }));
        },
        [targetPackageData?.insuranceFee]
    );

    //reset mmodal state after close
    const onAfterClose = () => {
        setFormDetails({
            coin: Object.keys(insurableCoins)[0],
            amount: "",
            insuranceFee: "0",
            total: "0",
            paymentToken: null
        });
    };

    const onSubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        if (amount || !!isValidAmountValue(amount))
            return console.log("Please enter an amount");

        console.log("submitting....");
    };

    const CustomTokenOption:FC<{value: string, label: string}> = ({label}) => {
        return (
            <div className={styles.token__custom__label}>
                <div className={styles.payment__token__dropdown__icon}>
                    <Image
                        src={`/token icons/${label}.png`}
                        alt="mad usd token icon"
                        layout="fill"
                    />
                </div>
                <span className={styles.payment__token__icon__label}>{label}</span>
            </div>
        )
    }

    return (
        <ModalWrapper
            open={open}
            label="Insurance Package Purchase Modal"
            onClose={onClose}
            onAfterClose={onAfterClose}
            contentClassName={styles.root}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>{`${targetPackageData?.packageType} Package`}</h1>
                <button className={styles.close__btn} onClick={onClose}>
                    <div className={styles.close__icon__wrapper}>
                        <Image
                            src={`/icons/close.svg`}
                            alt="modal close icon"
                            layout="fill"
                        />
                    </div>
                </button>
            </div>

            <div className={styles.notice}>
                <div className={styles.notice__text}>
                    <span className={styles.notice__key}>Notice:</span>
                    <p className={styles.notice__paragraph}>
                        To insure a particular coin, you must provide its
                        equivalent in Mad USD (MUSD).
                    </p>
                </div>
                <div className={styles.payment__token__icon}>
                    <Image
                        src={`/token icons/MUSD.png`}
                        alt="mad usd token icon"
                        layout="fill"
                    />
                </div>
            </div>

            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.coins__container}>
                    {Object.keys(insurableCoins).map((coin: string) => (
                        <label
                            htmlFor={coin}
                            key={coin}
                            className={clsx({
                                [styles.coin__wrapper]: true,
                                [styles.coin__wrapper__active]:
                                    formDetails.coin === coin,
                            })}
                        >
                            <input
                                type="radio"
                                id={coin}
                                name="coin_to_Insure"
                                value={coin}
                                className={styles.coin__radio__button__input}
                                onChange={handleCoinChange}
                            />
                            <div className={styles.coin__radio__button__image}>
                                <Image
                                    src={`/token icons/${coin}.png`}
                                    alt="modal close icon"
                                    layout="fill"
                                />
                            </div>
                        </label>
                    ))}
                </div>
                <div className={styles.input__group}>
                    <label htmlFor="payment__token__dropdown" className = {styles.label}>Payment token</label>
                    <Select
                        onChange={handlePaymentTokenChange}
                        placeholder = "Select payment token"
                        options={paymentTokenOptions}
                        value = {paymentToken}
                        name = "payment__token__dropdown"
                        className={styles.payment__token__select__container}
                        classNamePrefix = "payment__token__select"
                        formatOptionLabel={CustomTokenOption}
                    />
                </div>
                <div className={styles.input__group}>
                    <div className={styles.label__and__balance}>
                        <label className={styles.label} htmlFor="amount__input">
                            Amount to insure
                        </label>
                        <span className={styles.balance}>
                            Available: 1000 MUSD
                        </span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter an amount to insure"
                        value={amount}
                        onChange={handleAmountChange}
                        className={styles.amount__input}
                        autoFocus
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.key__value}>
                        <span className={styles.key}>Lock up period</span>
                        <span
                            className={styles.value}
                        >{`${targetPackageData?.duration} ${targetPackageData?.timeUnitFull}`}</span>
                    </div>

                    <div className={styles.key__value}>
                        <span className={styles.key}>Insurance fee</span>
                        <span
                            className={styles.value}
                        >{`$${insuranceFee}`}</span>
                    </div>

                    <div className={styles.key__value}>
                        <span className={styles.key}>Total</span>
                        <span className={styles.value}>{`$${total}`}</span>
                    </div>
                </div>

                <button type="submit" className={styles.Purchase__button}>
                    Buy package
                </button>
            </form>
        </ModalWrapper>
    );
};

export default PackagePurchaseModal;
