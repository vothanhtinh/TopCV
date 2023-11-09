'use client';
import React, { useState } from 'react';
import {
  ExceptionOutlined,
  ApiOutlined,
  UserOutlined,
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AliwangwangOutlined,
  LogoutOutlined,
  BugOutlined,
  HeartTwoTone,
  ScheduleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { setLogoutAction } from '@/store/slices/userSlice';
import { useLogoutUser } from '@/queries/auth/useLogout';
import ProtectedRoute from '@/components/molecules/ProtectedRoute';

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const user = useSelector((state: any) => state.userSlice.user);

  const dispatch = useDispatch();
  const { mutation } = useLogoutUser();

  const handleLogout = async () => {
    dispatch(setLogoutAction(''));
    mutation.mutate();
    window.location.href = '/';
  };

  const items: MenuProps['items'] = [
    {
      label: <Link href="/admin">Dashboard</Link>,
      key: 'dashboard',
      icon: <BankOutlined />,
    },
    {
      label: <Link href="/admin/company">Company</Link>,
      key: 'company',
      icon: <BankOutlined />,
    },
    {
      label: <Link href="/admin/user">User</Link>,
      key: 'user',
      icon: <UserOutlined />,
    },
    {
      label: <Link href="/admin/job">Job</Link>,
      key: 'job',
      icon: <ScheduleOutlined />,
    },
    {
      label: <Link href="/admin/resume">Resume</Link>,
      key: 'resume',
      icon: <AliwangwangOutlined />,
    },
    {
      label: <Link href="/admin/permission">Permission</Link>,
      key: 'permission',
      icon: <ApiOutlined />,
    },
    {
      label: <Link href="/admin/role">Role</Link>,
      key: 'role',
      icon: <ExceptionOutlined />,
    },
  ];

  if (isMobile) {
    items.push({
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: 'logout',
      icon: <LogoutOutlined />,
    });
  }

  const itemsDropdown = [
    {
      label: <Link href={'/'}>Trang chủ</Link>,
      key: 'home',
    },
    {
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: 'logout',
    },
  ];

  return (
    <ProtectedRoute>
      <Layout style={{ minHeight: '100vh' }} className="layout-admin">
        {!isMobile ? (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
              <BugOutlined /> ADMIN
            </div>
            <Menu
              defaultSelectedKeys={[activeMenu]}
              mode="inline"
              items={items}
              onClick={(e) => setActiveMenu(e.key)}
            />
          </Sider>
        ) : (
          <Menu
            defaultSelectedKeys={[activeMenu]}
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
            mode="horizontal"
          />
        )}

        <Layout>
          {!isMobile && (
            <div
              className="admin-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: 20,
              }}
            >
              <Button
                type="text"
                icon={
                  collapsed
                    ? React.createElement(MenuUnfoldOutlined)
                    : React.createElement(MenuFoldOutlined)
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />

              <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                  Welcome {user?.name}
                  <Avatar> {user?.name?.substring(0, 2)?.toUpperCase()} </Avatar>
                </Space>
              </Dropdown>
            </div>
          )}
          <Content style={{ padding: '15px' }}>{children}</Content>
          <Footer style={{ padding: 10, textAlign: 'center' }}>
            Copyright &copy; Võ Thành Tính - Made with <HeartTwoTone />
          </Footer>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default LayoutAdmin;
