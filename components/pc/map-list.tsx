import { FC, ReactNode } from 'react';
import styles from '../../styles/index.module.scss'

type Props = {
  children: ReactNode
}

const MapList: FC<Props> = ({ children }) => {

  return (
    <div className={styles.mapList}>
      {children}
    </div>
  );
}

export default MapList;