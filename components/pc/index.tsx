import { FC, useState, useContext } from "react";
import Roadmap from "./roadmap";
import RoadmapItem from './roadmap-item'
import styles from '../../styles/index.module.scss'
import { BikeDate } from "../../utils/config";
import Preview from './img-preview'
import RodemapCtx from '../../hooks/use-roadmao-content'
import { RoadmapItemType } from "../../utils/types"
import { formatBikeDaydate } from "../../utils/tools";

const PC: FC = () => {
  const { v } = useContext(RodemapCtx)
  const [imgList, setImgList] = useState<RoadmapItemType[]>([])
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleVisibleChange = (vis: boolean) => {
    setVisible(vis)
  }

  const handleImgShow = (f: string, c: number) => {
    setCurrent(c)
    setVisible(true)
    setImgList((prev) => {
      let arrCopy = prev.slice();
      arrCopy = formatBikeDaydate(v, f)
      return arrCopy;
    });
  }

  return (
    <div className={styles.PC}>
      <div className={styles.title}>风林火山骑行团 | 总活动 {v.length} 次</div>
      <Roadmap>
        {
          BikeDate.map((item, index) => (
            <RoadmapItem
              folderItem={item}
              key={index}
              handleImgShow={handleImgShow}
            />
          ))
        }
      </Roadmap>
      <Preview
        visible={visible}
        list={imgList}
        onVisibleChange={handleVisibleChange}
        current={current}
      />
    </div>
  );
};

export default PC;