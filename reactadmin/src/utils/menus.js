import React from 'react'
import {
    HomeOutlined,TableOutlined,FundOutlined,TeamOutlined,ShoppingCartOutlined,ShoppingOutlined
} from '@ant-design/icons'
export default[
    {
        path:'/home',
        title:'首页',
        icon:<HomeOutlined/>,
        role:1
    },
    {
        path:'/pro',
        title:'产品管理',
        icon:<TableOutlined/>,
        role:1,
        children:[
            {
                path:'/pro/list',
                title:'产品列表',
                icon:<TableOutlined/>,
                role:1
            },
            {
                path:'/pro/hotlist',
                title:'热销产品',
                icon:<TableOutlined/>,
                role:1
            }

        ]
    },
    {
        path:'/banner',
        title:'轮播图管理',
        icon:<FundOutlined/>,
        role:1
    },
    {
        path:'/user',
        title:'用户管理',
        icon:<TeamOutlined/>,
        role:1,
        children:[
            {
                path:'/user/list',
                title:'用户列表',
                icon:<TableOutlined/>,
                role:1,
            },
            {
                path:'/user/admin',
                title:'管理员列表',
                icon:<TableOutlined/>,
                role:2
            }
        ]
    },
    {
        path:'/cart',
        title:'购物车管理',
        icon:<ShoppingCartOutlined/>,
        role:1
    },
    {
        path:'/order',
        title:'订单管理',
        icon:<ShoppingOutlined/>,
        role:2
    },
]