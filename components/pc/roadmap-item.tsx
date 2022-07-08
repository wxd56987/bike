import { FC, ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import styles from '../../styles/index.module.scss'
import Upload from "./upload";
import { heicToJpg, formatBikeDaydate } from "../../utils/tools";
import { uploadType, BikeDateType, RoadmapItemType } from "../../utils/types"
import axios from "axios";
import { message } from "antd";
import RodemapCtx from '../../hooks/use-roadmao-content'


type Props = {
  folderItem: BikeDateType
}

const RoadmapItem: FC<Props> = ({ folderItem }) => {

  const { v } = useContext(RodemapCtx)
  const [imgList, setImgList] = useState<RoadmapItemType[]>(formatBikeDaydate(v, folderItem.folder))

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    var reader = new FileReader();
    const { folder } = folderItem;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      reader.readAsDataURL(file);
      reader.onloadend = async function () {
        //将转换结果赋值给img标签
        const key = file.name
        // 计算大小
        if (file.size / 1024 / 1024 > 50) {
          message.info('图片不能大于50M')
          return
        }
        const url = reader.result as string
        // heic 图片
        if (key.toLowerCase().endsWith(`.heic`)) {
          heicToJpg(file, key).then(({ key, url }) => {
            upImg({ key, url, folder })
          });
        } else {
          upImg({ key, url, folder })
        }
      }
    }
  }

  const upImg = (data: uploadType) => {
    axios({
      method: 'post',
      url: '/api/up',
      data,
    }).then((e) => {
      setImgList((prev) => {
        prev.push({
          name: data.key,
          img: data.url
        })
        const arrCopy = prev.slice();
        return arrCopy;
      });
    })
  }

  return (
    <div className={styles.roadmapItem}>
      <div className={styles.left}>
        <div className={styles.tip} onClick={() => {
        }}>{folderItem.date} 🚴🏻 {folderItem.name}</div>
      </div>
      <div className={styles.right}>
        {
          imgList.map((item, index) => (
            <div className={styles.imgBox} key={index}>
              <Image
                src={item.img} alt=""
                width={300}
                height={200}
              />
            </div>
          ))
        }
        <Upload
          handleUploadImg={handleUploadImg}
        />
      </div>
    </div>
  );
};


export default RoadmapItem;

