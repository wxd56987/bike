import { FC, ChangeEvent } from "react";
import styles from '../../styles/index.module.scss'
import { PlusOutlined } from '@ant-design/icons'

type Props = {
  handleUploadImg: (e: ChangeEvent<HTMLInputElement>) => void
};

const Upload: FC<Props> = ({ handleUploadImg }) => {

  return (
    <div className={styles.upload}>
      <input
        type="file"
        accept="image/heic,image/jpg,image/png,image/gif"
        onChange={handleUploadImg}
      />
      <div className={styles.upBox}>
        <PlusOutlined
          style={{ fontSize: 60, color: '#ffffff', fontWeight: 'bold' }}
        />
        <p>点击上传</p>
      </div>
    </div>
  );
};

export default Upload;

