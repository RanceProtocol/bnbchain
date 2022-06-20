import React, { Fragment, useState } from 'react'
import MyPackageCard from './MyPackageCard';
import styles from "./styles.module.css";
import { insurancePackages } from '../../constants/data';
import WithdrawInsuranceModal from '../WithdrawInsuranceModal';

const MyPackages = () => {

  const [withdrawModalState, setWithdrawModalState] = useState<{open: boolean, id:string | null}>({open: false, id: null})

  const clickAction = (id: string) => {
    setWithdrawModalState({open: true, id})
  }

  return (
    <Fragment>
       <div className={styles.root}>
        {insurancePackages.map(item => <MyPackageCard key = {item.packageId} {...item} clickAction = {clickAction} />)}
      </div>
      <WithdrawInsuranceModal
        state = {withdrawModalState}
        onClose = {() => setWithdrawModalState({open: false, id: null})}
      />
    </Fragment>
  )
}

export default MyPackages