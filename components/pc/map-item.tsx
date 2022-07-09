import { Image } from 'antd';
import { FC } from 'react';
import { RoadmapItemType } from "../../utils/types"
import styles from '../../styles/index.module.scss'
import { StarFilled } from '@ant-design/icons';

type Props = {
  visible: boolean,
  onVisibleChange: (vis: boolean) => void,
  current: number,
  list: RoadmapItemType[]
}

const MapItem: FC = () => {

  return (
    <div className={styles.mapItem}>
      <Image
        src='https://fenglin-1256754106.cos.ap-nanjing.myqcloud.com/bike4.4/IMG_8200.JPG'
        alt=''
        className={styles.left}
      />
      <div className={styles.right}>
        <div className={styles.mptitle}>标题xxxxxxxxxxxx</div>
        <div className={styles.tag}>
          <p>推荐指数：</p>
          <div className={styles.star}>
            <StarFilled style={{color: '#fec400', marginRight: 5}} />
            <StarFilled style={{color: '#fec400', marginRight: 5}} />
          </div>
        </div>
        <div className={styles.road}>
          <div>起点：</div>
          <div>终点：</div>
          <div>全程：</div>
        </div>
        <div className={styles.dec}>
          xxxxxxxxxxxx
        </div>
      </div>
    </div>
  );
}

export default MapItem;