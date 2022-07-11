import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/index.module.scss'
import { Rodemap } from '../utils/types'
import axios from 'axios'
import MapItem from '../components/pc/map-item'
import MapList from '../components/pc/map-list'
import { useState, ChangeEvent, useEffect } from 'react'
import { Modal, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { heicToJpg } from "../utils/tools";
import { uploadType, MapListType } from "../utils/types"
import { UrlStart } from '../utils/config'
import Nav from '../components/nav'

const Map: NextPage<Rodemap> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgl, setImgl] = useState('');
  const [img, setImg] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [star, setStar] = useState(0);
  const [dec, setDec] = useState('');
  const [distance, setDistance] = useState('');
  const [title, setTitle] = useState('');
  const [mapList, setMapList] = useState<MapListType[]>([]);

  const handleResetInfo = () => {
    setImgl('')
    setImg('')
    setStart('')
    setEnd('')
    setStar(0)
    setDec('')
    setDistance('')
    setTitle('')
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    var reader = new FileReader();
    const folder = 'map'
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
      message.success('上传成功')
      setImg(`${UrlStart}map/${data.key}`);
      setImgl(data.url)
    })
  }

  const up = () => {
    axios({
      method: 'post',
      url: '/api/upload-map',
      data: {
        img,
        star,
        start,
        title,
        end,
        distance,
        dec
      }
    }).then((e) => {
      console.log(e)
      if (e.status === 200) {
        message.info('上传成功！')
        setIsModalVisible(false);
        getMapInfo()
      }
    })
  }

  useEffect(() => {
    if (!mapList.length) {
      getMapInfo()
    }
  }, [mapList])

  const getMapInfo = () => {
    axios({
      method: 'get',
      url: `/api/get-map`,
    }).then((e) => {
      setMapList(e.data.map)
    })
  }

  const uploadMapInfo = () => {
    if (!img) {
      message.info('请上传图片')
      return
    }
    if (!title) {
      message.info('请填写路线名')
      return
    }
    if (!star) {
      message.info('请填写推荐指数')
      return
    }
    if (![1, 2, 3, 4, 5].includes(star)) {
      message.info('推荐指数1-5')
      return
    }
    if (!start) {
      message.info('请填写路线起点')
      return
    }
    if (!end) {
      message.info('请填写路线终点')
      return
    }
    if (!distance) {
      message.info('请填写大概距离')
      return
    }
    if (!dec) {
      message.info('请填写路线详细')
      return
    }
    up()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>风|林|火|山|🚴🏻</title>
        <meta name="description" content="风林火山骑行团" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.MAP}>
        <div className={styles.title}>风林火山骑行团 | NICE路线推荐</div>
        <div className={styles.recommend}
          onClick={() => {
            handleResetInfo()
            setIsModalVisible(true)
          }}
        >
          <div className={styles.btn}>一键推荐</div>
        </div>
        <Modal
          title="上传地图"
          visible={isModalVisible}
          onOk={uploadMapInfo}
          onCancel={handleCancel}>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>路线图片:</div>
            <div className={styles.right}>
              {
                !imgl
                  ?
                  <>
                    <input
                      type="file"
                      onChange={handleUploadImg}
                    />
                    <div className={styles.mapUpBox}>
                      <PlusOutlined style={{ fontSize: 30 }} />
                    </div>
                  </>
                  :
                  <Image
                    src={imgl}
                    alt=''
                    className={styles.mapUpBoxImg}
                  ></Image>
              }
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>路线名称:</div>
            <div className={styles.right}>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>推荐指数:</div>
            <div className={styles.right}>
              <input
                type="number"
                value={star}
                onChange={(e) => {
                  setStar(+e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>路线起点:</div>
            <div className={styles.right}>
              <input
                type="text"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>路线终点:</div>
            <div className={styles.right}>
              <input
                type="text"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value)
                }}
              />
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>全程距离:</div>
            <div className={styles.right}>
              <input
                type="number"
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value)
                }} />
            </div>
          </div>
          <div className={styles.mapFormItem}>
            <div className={styles.left}>路线介绍:</div>
            <div className={styles.right}>
              <textarea
                placeholder='路线详细，注意事项等'
                value={dec}
                onChange={(e) => {
                  setDec(e.target.value)
                }} />
            </div>
          </div>
        </Modal>
        <MapList>
          {
            mapList.map((item, index) => (
              <MapItem key={index} info={item} />
            ))
          }

        </MapList>
      </div>

      <Nav isactive={false} />

      <div className={styles.footer}>
        Powered by @Kmy
        <br />
        Github: https://github.com/wxd56987/bike
      </div>
    </div>
  )
}

export default Map
