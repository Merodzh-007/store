import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Header from './components/Header';
import AppRoutes from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
const { Content } = Layout;
import SiderCom from './components/Sider/Sider';
import FooterCom from './components/Footer';

const App: React.FC = () => {


  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Layout>
        <Header />
        <Content style={{ margin: '0px', background: 'white' }}>
          <div
            style={{
              paddingTop: '20px',
              minHeight: '100vh',
            }}
          >
            <AppRoutes />
          </div>
        </Content>
        <FooterCom />
      </Layout>
     <SiderCom />
    </Layout>
  );
};

export default App;