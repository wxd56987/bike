import { FC, ReactNode, useContext, useState } from "react";
import styles from '../../styles/index.module.scss'
import { BikeDate } from "../../utils/config";

type Props = {
  children: ReactNode
};

const Roadmap: FC<Props> = ({ children }) => {

  const [lineHeight, setLineHeight] = useState(BikeDate.length * 2 * 200 + 1000)

  return (
    <div className={styles.roadmap}>
      <div className={styles.line} style={{ height: `${lineHeight}px` }}></div>
      {children}
    </div>
  );
};

export default Roadmap;

