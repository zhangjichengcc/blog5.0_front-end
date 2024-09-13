/*
 * @Author: zhangjicheng
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2024-09-13 17:28:16
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/Home/index.tsx
 */

import { FC, useEffect, useRef } from 'react';
import { useOutletContext } from 'umi';
import type { OutletContextProps } from '@/layouts/HomeLayout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAppDispatch } from '@/store';
import { MenuItem } from '@/components/HomeMenu';
import { setActiveMenu, setMenu } from '@/store/features/home/homeSlice';
import Banner from './Banner';
import About from './About';
import Portfolio from './Portfolio';
import Service from './Service';
import Contact from './Contact';
import Blog from './Blog';

import styles from './index.less';

// 注册插件
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home: FC = () => {
  const layoutContext = useOutletContext<OutletContextProps>() || {};
  const appDispatch = useAppDispatch();
  const { cssStyle } = layoutContext;

  const sections = [
    {
      component: Banner,
      ref: useRef<HTMLDivElement>(null),
      label: 'Home',
      key: 'banner',
    },
    {
      component: About,
      ref: useRef<HTMLDivElement>(null),
      label: 'About',
      key: 'about',
    },
    {
      component: Portfolio,
      ref: useRef<HTMLDivElement>(null),
      label: 'Portfolio',
      key: 'portfolio',
    },
    {
      component: Service,
      ref: useRef<HTMLDivElement>(null),
      label: 'Service',
      key: 'service',
    },
    {
      component: Contact,
      ref: useRef<HTMLDivElement>(null),
      label: 'Contact',
      key: 'contact',
    },
    {
      component: Blog,
      ref: useRef<HTMLDivElement>(null),
      label: 'Blog',
      key: 'blog',
    },
  ] as const;

  /**
   * 设置视差滚动
   */
  useGSAP(() => {
    sections.forEach((item) => {
      const { ref } = item;
      gsap.fromTo(
        ref.current,
        {
          backgroundPositionY: `-50vh`,
        },
        {
          backgroundPositionY: `50vh`,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            scrub: true,
          },
        },
      );
    });
  });

  /**
   * 初始化首页目录导航
   */
  function initMenu() {
    const menu: MenuItem[] = sections.map((item) => {
      const { label, key } = item;
      return { label, key };
    });

    // 设置菜单
    appDispatch(setMenu(menu));
  }

  function bindMenuScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting, target } = entry;
          const { dataset } = target as HTMLElement;
          if (isIntersecting) {
            const { label, key } = dataset;
            appDispatch(setActiveMenu(key));
            document.title = label!;
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((item) => {
      const { ref } = item;
      ref.current && observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }

  useEffect(() => {
    initMenu();
    bindMenuScroll();
  }, []);

  return (
    <div className={styles.home}>
      {sections.map((item) => (
        <item.component
          dataset={item}
          key={item.key}
          ref={item.ref}
          id={item.key}
          style={{
            ...cssStyle,
            transition: 'padding .3s ease',
          }}
        />
      ))}
    </div>
  );
};

export default Home;
