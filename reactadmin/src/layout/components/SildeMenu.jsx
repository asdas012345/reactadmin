import React from 'react'
import { Menu } from 'antd';
import menus from './../../utils/menus'
import { withRouter } from 'react-router-dom'
const { SubMenu } =Menu

class SildeMenu extends React.Component {
  renderMenu = (menus)=>{
      return menus.map(item=>{
        if(sessionStorage.getItem('role')*1 >= item.role){
          if(item.children){
            return(
                <SubMenu key={item.path} icon={item.icon} title={item.title}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            )
          } else {
            return(
                <Menu.Item key={item.path} icon={ item.icon }>
                    {item.title}
                </Menu.Item>
            )
          }
        } else {
          return null
        }
      })
  }
  changePage=(obj)=>{
      this.props.history.push(obj.key)
  }

  render() {
      const pathname=this.props.location.pathname
      const str='/'+pathname.split('/')[1]
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={ this.changePage }
          defaultOpenKeys={[str]}
          defaultSelectedKeys={[pathname]}
        >
          {this.renderMenu(menus)}
        </Menu>
      </div>
    );
  }
}
export default withRouter(SildeMenu)