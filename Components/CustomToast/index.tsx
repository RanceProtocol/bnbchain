import styles from "./styles.module.css";
import { BsLightningCharge } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { ReactNode } from "react";
import { ToastContentProps } from "react-toastify";

export enum STATUS {
    ERROR = "Error",
    PENDING = "Pending",
    SUCCESSFULL = "Successfull",
}

export enum TYPE {
    TRANSACTION = "transaction",
    ERROR = "error",
    SUCCESSFULL = "successfull",
}

interface IProps {
    message: string;
    status: STATUS;
    type: TYPE;
}

const icons = {
    transaction: <BsLightningCharge />,
    error: <BiError />,
    successfull: <IoMdCheckmarkCircleOutline />,
};
const CustomToast =
    ({ message, status, type }: IProps) =>
    ({ closeToast }: ToastContentProps<unknown>):ReactNode =>
        (
            <div className={styles.root}>
                <div
                    className={clsx({
                        [styles.type__icon]: true,
                        [styles.transaction__icon]: type === TYPE.TRANSACTION,
                        [styles.error__icon]: type === TYPE.ERROR,
                        [styles.successfull__icon]: type === TYPE.SUCCESSFULL,
                    })}
                >
                    {icons[type]}
                </div>
                <div className={styles.main}>
                    <IoCloseOutline
                        className={styles.close__icon}
                        onClick={closeToast}
                    />
                    <span className={styles.message}>{message}</span>
                    <span className={styles.status}>Status - {status}</span>
                </div>
            </div>
        );

export default CustomToast;
