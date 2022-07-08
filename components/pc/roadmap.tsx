import { FC, ReactNode } from "react";
import styles from '../../styles/index.module.scss'

type Props = {
  children: ReactNode
};

const Roadmap: FC<Props> = ({ children }) => {

  return (
    <div className={styles.roadmap}>
      <div className={styles.line}></div>
      {children}
    </div>
  );
};

export default Roadmap;

