/*
 * @Author: your name
 * @Date: 2021-11-08 15:52:20
 * @LastEditTime: 2021-11-08 16:09:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\app.ts
 */

// ! 约定 src/app.tsx 为运行时配置。
import { history } from 'umi';

export function onRouteChange({ location, routes, action }: any) {
  console.log(location.pathname);
}