import React, { Component } from 'react'
import { Table, Checkbox } from 'antd'
import { getCartlist } from './../../api/cart'
export default class Com extends Component {
  state = { cartlist: [] }
  columns = [
    {
      title: '序号',
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '选中状态',
      dataIndex: 'flag',
      key: 'flag',
      render: (text, record, index) => (
        <Checkbox checked = { text } />
      )
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
    },
    {
      title: '产品图片',
      dataIndex: 'proimg',
      key: 'proimg',
      render: (text, record, index) => (
        <img src={ text } alt="" style={{height: '80px', width: '80px'}}/>
      )
    },
    {
      title: '产品名称',
      dataIndex: 'proname',
      key: 'proname',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    }
  ]
  async componentDidMount () {
    const res = await getCartlist()
    this.setState({
      cartlist: res.data.data
    })
  }
  render() {
    return (
      <>
        <Table dataSource={this.state.cartlist} columns={this.columns} />
      </>
    )
  }
}