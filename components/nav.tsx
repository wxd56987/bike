import { FC } from 'react';
import styles from '../styles/index.module.scss'
import Link from 'next/link'

type Props = {
  isactive: boolean
}

const Nav: FC<Props> = ({ isactive }) => {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <div className={`${styles.navBtn} ${isactive ? styles.navBtnA : null}`}>
          <div className="text">骑行🚴🏻相册</div>
        </div>
      </Link>
      <Link href="/map">
        <div className={`${styles.navBtn} ${!isactive ? styles.navBtnA : null}`}>
          <div className="text">推荐🚴🏻路线</div>
        </div>
      </Link>
    </div>
  );
}

export default Nav;