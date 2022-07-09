import { Image } from 'antd';
import { FC } from 'react';
import { RoadmapItemType } from "../../utils/types"

type Props = {
  visible: boolean,
  onVisibleChange: (vis: boolean) => void,
  current: number,
  list: RoadmapItemType[]
}

const Preview: FC<Props> = ({ visible, onVisibleChange, current, list }) => {

  return (
    <div style={{ display: 'none' }}>
      <Image.PreviewGroup preview={{ visible, onVisibleChange, current }}>
        {
          list.map((item, index) => (
            <Image
              src={item.img}
              key={index}
              alt=""
            />
          ))
        }
      </Image.PreviewGroup>
    </div>
  );
}

export default Preview;