import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import styles from "./styles.module.css"
import clsx from "clsx"
import {routes} from "../../constants/routes"

interface IProp {
  
}

const Header:FC<IProp> = () => {

  const router = useRouter()
  return (
    <header className={styles.root}>
      <Link href = "/">
        <div className={styles.logo__wrapper}>
          <Image 
            src = "/rance-protocol-logo.png"
            alt = "Rance Logo"
            layout = "fill"
          />
        </div>
      </Link>

      <nav className={styles.navigation}>
        <ul className={styles.nav__list__container}>
          <li>
            <Link href = {routes.insurance}>
              <a className={clsx({[styles.link]:true, [styles.active__link]: [routes.home, routes.insurance].includes(router.pathname)})}>Insurance</a>
            </Link>
          </li>
          <li>
            <Link href = {routes.staking}>
              <a className={clsx({[styles.link]:true, [styles.active__link]: router.pathname === routes.staking})}>Staking</a>
            </Link>
          </li>
        </ul>
      </nav>
      <button className={styles.connect__btn}>
        Connect wallet
      </button>
    </header>
  )
}

export default Header