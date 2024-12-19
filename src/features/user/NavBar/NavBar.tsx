import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import './NavBar.css'
import { useStore } from "../../../app/store/store";

function NavBar (){
    const {userStore} = useStore()

    const menu = (
        <Menu>
        <Menu.Item key="1" icon={<SettingOutlined />}>
            Change Profile
        </Menu.Item>
        <Menu.Item
            key="2" 
            icon={<LogoutOutlined />}
            onClick={() => {userStore.logout()}}
         >
            Logout
        </Menu.Item>
        </Menu>
    )

    return (
        
            <div className="headerNavBar">
                <div className="nameOfUser">
                        {userStore.getFullName()}
                </div>
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