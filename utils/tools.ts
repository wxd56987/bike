import type { ChangeEvent } from 'react'
import { uploadType, RoadmapItemType } from "./types"

// 苹果heic格式图片转jpg
export const heicToJpg = (file: any, fileName: string): Promise<uploadType> => {
  return new Promise(async (resolve, reject) => {
    import('heic2any').then((e) => {
      e.default({
        blob: file,
        toType: "image/jpg",
      }).then((resultBlob: any) => {
        file = new File([resultBlob], fileName + ".jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime()
        });
        const reader: any = new FileReader();
        reader.onload = (e: ChangeEvent) => {
          const obj: uploadType = {
            key: fileName.toLowerCase().replace('.heic', '.jpg'),
            url: (e.target as any).result
          }
          resolve(obj)
        };
        reader.readAsDataURL(file);
      }).catch(() => {
        reject('err')
      });
    })

  })

}

enum ApiEnum {
  development = 0,
  production = 1
}

export const ApiStart = (env: string): string => {
  return ApiEnum[0] === env ? 'http://localhost:3000' : 'http://118.195.193.196:3000'
}

export const formatBikeDaydate = (data: RoadmapItemType[], folder: string): RoadmapItemType[] => {
  const arr: RoadmapItemType[] = []
  data.forEach((item) => {
    if (item.name.includes(folder) && item.name.substr(item.name.length - 1, 1) !== '/') {
      arr.push(item)
    }
  })
  return arr
}