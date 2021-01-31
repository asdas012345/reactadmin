import React, { useState,useEffect,useRef } from 'react'
import {Table,Tag,Space,Button,Modal,Form, Input,Radio, message,Popconfirm} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import { getAdminlist,addAdmin,deleteAdmin,updateAdmin } from './../../api/admin'


const Com=()=>{
  const formRef=useRef()
  const formRef1=useRef()
  const [adminlist,setAdminlist]=useState([])
  const [current,setCurrent]=useState([1])
  const [pageSize,setPagesize]=useState([10])
  // useEffect componentDidMount componentDidUpdate componentWillUnmount 合体
  useEffect(() => {
    async function fetchData(){
      const res = await getAdminlist()
      setAdminlist(res.data.data)
    }
    fetchData()
  }, []) // 第二个参数写一个不变量的量， 相当于只会触发componentDidMount
  const columns=[
    {
      title:'序号',
      render:(text,record,index)=>(
      <span>{ (current-1)*pageSize+index+1 }</span>
      )
    },
    {
      title:'管理员账号',
      dataIndex:'adminname',
      key:'adminname'
    },
    {
      title:'角色',
      dataIndex:'role',
      key:'role',
      render:(text,record,index)=>(
        <>
        {
          text>1?<Tag color="green">超级管理员</Tag>:<Tag color="blue">管理员</Tag>
        }
        </>
      )
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <>
        {
          // 不能操作admin用户信息
          record.adminname==='admin'? null : 
        <Space>
          <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick = {
              () => {
                showModal1(record)
              }
            }></Button>
          <Popconfirm
            title="确认删除吗?"
            onConfirm={()=>{
              deleteAdmin({adminid:record.adminid}).then(res=>{
                message.success('删除成功')
                const arr=JSON.parse(JSON.stringify(adminlist))
                arr.splice(index,1)
                setAdminlist(arr)
              })
            }}
              
            onCancel={()=>{}}
            okText="确认"
            cancelText="取消"
          >
            <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
        }
        </>
        
      )
    }
  ]
  const [visible,setVisible]=useState(false)
  const [visible1,setVisible1]=useState(false)
  const handleOk=()=>{
    setVisible(false)
  }
  const handleOk1=()=>{
    setVisible1(false)
  }
  const handleCancel=()=>{
    setVisible(false)
    formRef.current.setFieldsValue({
      adminname:'',
      password:'',
      role:0
    })
  }
  const handleCancel1=()=>{
    setVisible1(false)
    formRef1.current.setFieldsValue({
      adminname:'',
      password:'',
      role:0
    })
  }
  const onFinish = async (values) => {
    console.log(values)
    const res = await addAdmin(values)
    if (res.data.code === '10001') {
      message.warning('该管理员账户已存在');
    } else {
      message.success('插入管理员成功');
      // 模态框消失
      setVisible(false)
      // 清空输入框的值
      formRef.current.setFieldsValue({
        adminname: '',
        password: '',
        role: 0
      })
      // 组合数据
      const arr = JSON.parse(JSON.stringify(adminlist))
      arr.push(res.data.data)
      setAdminlist(arr)
    }
  }
  const onFinish1 = async (values) => {
    console.log(values)
    const res = await updateAdmin(values)
   
      message.success('修改权限成功');
      // 模态框消失
      setVisible1(false)
      // 清空输入框的值
      formRef1.current.setFieldsValue({
        adminname: '',
        password: '',
        role: 0
      })
      // 组合数据
      const arr = JSON.parse(JSON.stringify(adminlist))
      var index = arr.findIndex((item, index, arr) => {
        return values.adminid === item.adminid
      })
      // 更新数据
      arr[index].role = values.role
      arr[index].adminname = values.adminname      // arr.splice(index, 1)
      // arr.fill(values, index)
      // console.log('arr', arr)
      // 修改状态
      setVisible1(false)
      // 清空输入框的值
      formRef1.current.setFieldsValue({
        adminname: '',
        password: '',
        role: 0
      })
      setAdminlist(arr)
  }
  const showModal1 = (record) => {
    setVisible1(true)
  
    setTimeout(() => {
       
      formRef1.current.setFieldsValue({
          adminname: record.adminname,
          role: record.role,
          adminid:record.adminid
        })
      }, 0)
    
  };
  
    return (
      <>
        <Button  type="primary" style={{marginBotton:'10px'}} onClick={()=>{
          setVisible(true)
        }}>添加管理员</Button>
        <Table  dataSource={adminlist} columns={columns} 
        rowKey={ (record) => record.adminid } pagination={{
          position:["bottomLeft"],
          defaultCurrent:current,
          defaultPageSize:pageSize,
          onChange:(page,pageSize)=>{
            setCurrent(page)
          },
          onShowSizeChange:(current, size)=>{
            setPagesize(size)
          }
          }}/>
          <Modal
            title="添加管理员"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
                ref={ formRef }
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="adminname"
                  rules={[
                    {
                      required: true,
                      message: '请输入账号!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>
                <Form.Item name="role" rules={[
                  {
                    required: true,
                    message: '请选择权限',
                  },
                ]}>
                   <Radio.Group>
                      <Radio.Button value={1}>管理员</Radio.Button>
                      <Radio.Button value={2}>超级管理员</Radio.Button>
                    </Radio.Group>
                </Form.Item>
          
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    添加
                  </Button>
                </Form.Item>
              </Form>
          </Modal>
  
          <Modal
            title="修改信息"
            visible={visible1}
            onOk={handleOk1}
            onCancel={handleCancel1}
            footer={null}
          >
              <Form
                ref={ formRef1 }
                name="normal_login"
                className="login-form"
                onFinish={onFinish1}
              >
                <Form.Item
                  name="adminid"
                  hidden="true"
                >
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  name="adminname"
                  rules={[
                    {
                      required: true,
                      message: '请输入账号!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item name="role" rules={[
                  {
                    required: true,
                    message: '请选择权限',
                  },
                ]}>
                   <Radio.Group>
                      <Radio.Button value={1}>管理员</Radio.Button>
                      <Radio.Button value={2}>超级管理员</Radio.Button>
                    </Radio.Group>
                </Form.Item>
          
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    修改
                  </Button>
                </Form.Item>
              </Form>
          </Modal>
      </>
    )        
  }


export default Com

