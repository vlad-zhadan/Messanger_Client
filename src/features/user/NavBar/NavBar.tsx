import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { observer } from "mobx-react-lite";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";

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
        <Layout>
      <Header
        style={{
          height: "6%",
          padding: "0 20px",
          backgroundColor: "rgba(13, 13, 80, 0.76)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: "1px solidrgb(38, 56, 128)",
        }}
      >
          

          <Dropdown overlay={menu} placement="bottomRight">
         <Avatar
            icon={<UserOutlined />}
            size={'small'}
            style={{
              margin: "2px"
            }}
          />
        </Dropdown>
        
      </Header>
    </Layout>
    )
}

export default observer(NavBar)