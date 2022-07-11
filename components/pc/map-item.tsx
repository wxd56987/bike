import { Image } from 'antd';
import { FC } from 'react';
import { RoadmapItemType } from "../../utils/types"
import styles from '../../styles/index.module.scss'
import { StarFilled } from '@ant-design/icons';
import { MapListType } from "../../utils/types"

type Props = {
  info: MapListType
}

const MapItem: FC<Props> = ({ info }) => {

  const getStar = (star: string) => {
    let s = []
    for (let i = 0; i < +star; i++) {
      s.push(i)
    }
    return s
  }

  return (
    <div className={styles.mapItem}>
      <div className={styles.left}>
        <Image
          src={info.img}
          alt=''
          className={styles.leftImg}
        >
        </Image>
        <div className={styles.top}>
          <div className={styles.mptitle}>{info.title}</div>
          <div className={styles.star}>
            {
              getStar(info.star).map((item, index) => (
                <StarFilled key={index} style={{ color: '#fec400', marginRight: 5 }} />
              ))
            }
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.road}>
            <div>🚴🏻起点：{info.start}</div>
            <div>🚴🏻终点：{info.end}</div>
          </div>
          <div className={styles.distance}>
            <div>全程：{info.distance}km</div>
          </div>
          <div className={styles.dec}>
            路线详细：{info.decs}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapItem;