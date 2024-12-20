/*
 * @Author: your name
 * @Date: 2021-11-08 16:10:07
 * @LastEditTime: 2024-12-19 18:32:01
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/User/Login/index.tsx
 */

import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { history } from 'umi';
import { useHistory } from '@/hooks/useHistory';
import { Form, Input, Button, message, Avatar, Spin } from 'antd';
import { setUserInfo, setToken } from 'utils/authority';
import {
  FacebookOutlined,
  GithubOutlined,
  QqOutlined,
  LockOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
// import { renderSize } from '@/utils';
import { oauthPwd } from '@/services/user';
import logoImg from 'assets/global/logo.png';
import styles from './index.less';

const Login: FC = (): React.ReactElement => {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);
  const { params: urlParams } = useHistory();
  

  // 登录
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const { username, password } = values;
    const params = {
      name: username,
      password,
    };
    oauthPwd(params)
      .then((res) => {
        const { data } = res;
        const { token } = data;
        const { redirect } = urlParams;
        setUserInfo(data);
        setToken(token);
        history.replace(redirect || '/');
      })
      .catch((err) => {
        message.error('登录失败，请检查用户名或密码');
        console.error(err);
      });
  };

  // github 单点登录
  function githubSso() {
    setSpinning(true);
    const CLIENT_ID = process.env.ClientID; // prod
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${process.env.ClientSecret}`;
    window.location.href = url;
  }

  // 单点登录
  function sso(way: string) {
    switch (way) {
      case 'github':
        githubSso();
        break;
      case 'weibo':
        message.warning('暂不支持，以后估计也不会支持！');
        break;
      case 'facebook':
        message.warning('暂不支持，看看算了！');
        break;
      default:
        message.warning('开发中。。。等着吧');
    }
  }

  useEffect(() => {
    // debugger
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.formBox}>
        <Spin tip="正在跳转第三方平台..." spinning={spinning}>
          <Form
            form={form}
            name="normal_login"
            className={styles.form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <div className={styles.formHeader}>
              <Avatar size={65} src={logoImg} />
            </div>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <span style={{ marginLeft: 8 }}>or</span>
              <span
                style={{ marginLeft: 8, color: '#1890ff', cursor: 'pointer' }}
                onClick={() => history.replace('/user/register')}
              >
                register now!
              </span>
            </Form.Item>
            <div className={classnames(styles.signinWith, styles['fade-in'])}>
              <div className={styles.signItem} onClick={() => sso('github')}>
                <GithubOutlined />
                <span className={styles.label}>github</span>
              </div>
              <div className={styles.signItem} onClick={() => sso('weibo')}>
                <WeiboOutlined />
                <span className={styles.label}>微博</span>
              </div>
              <div className={styles.signItem} onClick={() => sso('wechat')}>
                <WechatOutlined />
                <span className={styles.label}>微信</span>
              </div>
              <div className={styles.signItem} onClick={() => sso('qq')}>
                <QqOutlined />
                <span className={styles.label}>QQ</span>
              </div>
              <div className={styles.signItem} onClick={() => sso('facebook')}>
                <FacebookOutlined />
                <span className={styles.label}>FaceBook</span>
              </div>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
