import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import './NavBar.css'

function NavBar (){
    const menu = (
        <Menu>
        <Menu.Item key="1" icon={<SettingOutlined />}>
            Change Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<LogoutOutlined />}>
            Logout
        </Menu.Item>
        </Menu>
    )

    return (
        
            <div className="headerNavBar">
                <Dropdown overlay={menu} placement="bottomRight">
                    <div className="navBarAvater">
                        <Avatar
                            icon={<UserOutlined />}
                            size={'small'}
                            style={{
                            margin: "2px"
                            }}
                        />
                    </div>
                </Dropdown>
            </div>
      
    
    )
}

export default observer(NavBar)