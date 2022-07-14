import { BikeDateType } from './types'

export const SecretId: string = '' // 腾讯云 SecretId
export const SecretKey: string = '' // 腾讯云 SecretKey
export const Bucket: string = '' // 腾讯云 对象存储 Bucket
export const Region: string = '' // 腾讯云 对象存储 Region
export const UrlStart: string = 'https://fenglin-1256754106.cos.ap-nanjing.myqcloud.com/' // 腾讯云 对象存储 资源域名根据申请的对象存储资源链接替换

export const MYSQL_HOST = '' // 数据库服务器ip
export const MYSQL_PORT = 3306 // 数据库服务器端口
export const MYSQL_DATABASE = 'BIKE' // 数据库
export const MYSQL_USER = '' // 数据库用户名
export const MYSQL_PASSWORD = '' // 数据库 密码

// 里程碑数据配置
export const BikeDate: BikeDateType[] = [
  {
    folder: 'bike7.2', // 上传腾讯云文件夹
    name: '九堡大桥', // 里程碑名称
    date: '7月2日', // 日期
    icon: '🚴🏻' // icon
  },
  {
    folder: 'bike6.25',
    name: '上龙井',
    date: '6月25日',
    icon: '🚴🏻'
  },
]