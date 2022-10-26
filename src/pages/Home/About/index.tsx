/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-26 10:15:54
 * @FilePath: \blog5.0_front-end\src\pages\Home\About\index.tsx
 */
import { forwardRef } from 'react';
import styles from './index.less';

const About = forwardRef<HTMLDivElement>((_props, ref) => {

  return (
    <div ref={ref} className={styles.about}>
      <h2>about</h2>
    </div>
  )
})

export default About;
