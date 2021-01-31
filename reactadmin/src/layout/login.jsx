/*
 * @Descripttion: 
 * @version: 
 * @Author: lujj
 * @Date: 2020-03-13 22:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-03-19 09:18:31
 */
import React, { Component } from 'react'
import Particles from 'react-particles-js';
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { login } from './../api/admin'
const Login = (props) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    login(values).then(res => {
      if (res.data.code === '10002') {
        message.error('账户名或者密码错误')
      } else {
        sessionStorage.setItem('adminid', res.data.data.adminid)
        sessionStorage.setItem('adminname', res.data.data.adminname)
        sessionStorage.setItem('token', res.data.data.token)
        sessionStorage.setItem('role', res.data.data.role)
        sessionStorage.setItem('loginState', true)
        props.history.replace('/')
      }
    })
  };
        return (
            <div style={{background: 'rgb(35, 39, 65)',height:"100%"}}>

            <Form
                name="normal_login"
                className="login"
                // initialValues={{ username: "111111" }} // 初始值
                onFinish={onFinish}
                >
                <Form.Item
                    name="adminname"
                    rules={[{ required: true, message: '请输入你的用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
                </Form.Item>
                </Form>


                <Particles height={window.innerHeight-5+"px"}
                params={{
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                          "onhover": {
                            "enable": false,
                            "mode": "repulse"
                          },
                          "onclick": {
                            "enable": true,
                            "mode": "push"
                          },
                          "resize": true
                        },
                        "modes": {
                          "grab": {
                            "distance": 800,
                            "line_linked": {
                              "opacity": 1
                            }
                          },
                          "bubble": {
                            "distance": 800,
                            "size": 80,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                          },
                          "repulse": {
                            "distance": 400,
                            "duration": 0.4
                          },
                          "push": {
                            "particles_nb": 4
                          },
                          "remove": {
                            "particles_nb": 2
                          }
                        }
                      }
                }}/>
            </div>
        )
    
}
export default Login