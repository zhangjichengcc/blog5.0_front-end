/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-02 18:53:22
 * @FilePath: \blog5.0_front-end\src\pages\Home\About\index.tsx
 */
import { forwardRef, useEffect, useRef } from 'react';
import Scroller from '@zhangjicheng/scroller';

import styles from './index.less';

const About = forwardRef<HTMLDivElement>((_props, ref) => {

  const scrollDom = useRef(null);
  const scroller = useRef<Scroller>();

  useEffect(function() {
    if(scrollDom.current) {
      scroller.current = new Scroller(scrollDom.current);
    }
  }, [scrollDom])

  function scroll() {
    scroller.current?.start();
  }

  return (
    <div ref={ref} className={styles.about}>
      <h2 onClick={scroll}>about</h2>
      <div ref={scrollDom} className={styles.scrollContainer}>
        <div className={styles.scroller}>scroll</div>
      </div>
    </div>
  )
})

export default About;
