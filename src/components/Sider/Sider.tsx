import { useState } from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"; 
import img from '../../assets/Frame.png';
import "./Sider.css";
import Banners from "../Banners/Banners";

const { Sider } = Layout;

const SiderCom = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
   
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 1000,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

     
      <Sider
        width={350}
        className="sider-container"
        collapsible 
        collapsed={collapsed} 
        onCollapse={(collapsed) => setCollapsed(collapsed)} 
        breakpoint="lg" 
        collapsedWidth={0} 
      >
        <div className="sider-content">
          <div>
            <img 
              src={img} 
              alt="Бесплатные товары" 
              className="sider-image"
            />
          </div>
          <div className="sider-text-container">
            <div className="sider-text">
              Получай товары БЕСПЛАТНО!
            </div>
            <Button type="primary">
              Узнать больше
            </Button>
          </div>
        </div>
        <Banners />
        <Banners />
        <Banners />
      </Sider>
    </>
  );
};

export default SiderCom;