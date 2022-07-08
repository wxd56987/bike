import { FC } from "react";
import axios from 'axios'
import { heicToJpg } from "../utils/tools";
import { uploadType } from "../utils/types"

const Test: FC = () => {
  const getFile = () => {
    axios({
      method: 'get',
      url: '/api/get?key=touxiang.jpeg',
    }).then((e) => {
      console.log(e.data)

    })
  }

  const upImg = (data: uploadType) => {
    axios({
      method: 'post',
      url: '/api/up',
      data,
    }).then((e) => {
      console.log(e.data)

    })
  }

  return (
    <div>
      <input type="file" accept="image/heic,image/jpg,image/png,image/gif" onChange={async (e) => {
        var reader = new FileReader();
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];

          reader.readAsDataURL(file);
          reader.onloadend = async function () {
            //将转换结果赋值给img标签
            const key = file.name
            // 计算大小
            if (file.size / 1024 / 1024 > 50) {
              alert("图片不能大于50M")
              return
            }
            const url = reader.result as string
            // heic 图片
            if (key.toLowerCase().endsWith(`.heic`)) {
              heicToJpg(file, key).then(({ key, url }) => {
                upImg({ key, url })
              });
            } else {
              upImg({ key, url })
            }
          }
        }
      }} />
      <button onClick={getFile}>get</button>
    </div>
  )
}

export default Test;