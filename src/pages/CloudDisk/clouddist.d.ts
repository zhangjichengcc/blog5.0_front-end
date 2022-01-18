/*
 * @Author: your name
 * @Date: 2022-01-04 17:05:35
 * @LastEditTime: 2022-01-18 11:26:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\index.d.ts
 */

declare namespace API {
  type testProps = string;
}

declare interface fileDataProps {
  _id: string;
  parent_id: string;
  lock?: boolean;
  name: string;
  attribute: {
    create_time: string;
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

// declare namespace cloudDisk {
//   interface DataType {

//   }
// }
