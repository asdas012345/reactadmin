import React, { Component } from 'react'
import { Table, Button, Space } from 'antd'
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import {getProlist} from './../../api/pro'


export default class Com extends Component {
  state={ prolist:[],current:1,pageSize:10 }
  columns = [
    {
      title: '序号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record, index) => <span>{ (this.state.current-1)*this.state.pageSize+index+1 }</span>,
    },
    {
      title: '产品图片',
      dataIndex: 'proimg',
      key: 'proimg',
      align: 'center',
      render: (text, record, index) => {
        return (
          <img src={ text } alt="" style={{width: '90px', height: '90px'}}/>
        )
      }
    },
    {
      title: '产品名称',
      dataIndex: 'proname',
      width: 300,
      align: 'center',
      key: 'proname',
      filters:[
        {
          text:'手机',
          value:'手机',
        },
        {
          text:'零食',
          value:'零食'
        }
      ],
      onFilter:(value,record)=>record.proname.indexOf(value)!==-1
    },
    {
      title: '产品价格',
      dataIndex: 'price',
      align: 'center',
      sorter:(a,b)=>a.price-b.price,
      key: 'price',
    },
    {
      title: '产品销量',
      dataIndex: 'sales',
      align: 'center',
      sorter:(a,b)=>a.sales-b.sales,
      key: 'sales',
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record, index) => (
        <Space>
          <Button  type="primary" shape="circle" icon={<EditOutlined />}></Button>
          <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
        </Space>
      )
    }
  ]
  async componentDidMount(){
    const res=await getProlist()
    this.setState({
      prolist:res.data.data
    })
  }
  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={ this.state.prolist } rowKey={ (record) => record.proid } pagination={{
        position:["bottomLeft"],
        defaultCurrent:this.state.current,
        defaultPageSize:this.state.pageSize,
        onChange:(page,pageSize)=>{
          console.log(page,pageSize)
          this.setState({
            current:page
          })
        },
        onShowSizeChange:(current, size)=>{
          console.log(current,size)
          this.setState({
            pageSize:size
          })
        }
        }}/>
      </div>
    )
  }
}
