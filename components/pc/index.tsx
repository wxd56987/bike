import { FC, useState } from "react";
import Roadmap from "./roadmap";
import RoadmapItem from './roadmap-item'
import styles from '../../styles/index.module.scss'
import { BikeDate } from "../../utils/config";

const PC: FC = () => {
  return (
    <div className={styles.PC}>
      <div className={styles.title}>风林火山骑行团</div>
      <Roadmap>
        {
          BikeDate.map((item, index) => (
            <RoadmapItem folderItem={item} key={index} />
          ))
        }
      </Roadmap>
    </div>
  );
};

export default PC;