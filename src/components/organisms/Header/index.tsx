'use client';
import { Button, Dropdown, Menu, MenuProps, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { NavbarItem } from './styled';
import { isAuthen } from '@/utils';

const itemsNav: MenuProps['items'] = [
  {
    label: 'Việc làm',
    key: 'job',
  },
  {
    label: 'Hồ sơ & CV',
    key: 'cv',
  },
  {
    label: 'Công ty',
    key: 'company',
  },
  {
    label: 'Phát triển sự nghiệp',
    key: 'growth',
  },
  {
    label: 'Công cụ',
    key: 'SubMenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];

export default function Header() {
  const handleLogoutUser = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const items = [
    {
      label: (
        <label
          style={{ cursor: 'pointer' }}
          onClick={() => setShowManageAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: 'account',
    },

    {
      label: (
        <div style={{ cursor: 'pointer' }} onClick={handleLogoutUser}>
          Đăng xuất
        </div>
      ),
      key: 'logout',
    },
  ];
  const [current, setCurrent] = useState('');
  const [showManageAccount, setShowManageAccount] = useState(false);

  const isLogin = isAuthen();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="flex bg-white px-10 items-center h-[80px]">
      <Image
        src={'/topcv-logo-6.webp'}
        width={200}
        height={78}
        alt="logo"
        className="h-[80px]"
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={itemsNav}
        className="w-full font-medium"
      />
      <ul className="flex gap-3">
        {!isLogin ? (
          <>
            <NavbarItem>
              <Link
                href={'/login'}
                className="text-green-500 border-solid border hover:bg-green-100 "
              >
                Đăng nhập
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href={'/register'}
                className="text-white  bg-green-500 hover:opacity-80 "
              >
                Đăng ký
              </Link>
            </NavbarItem>
          </>
        ) : (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Space>
              {/* <Avatar src={urlAvatar} /> */}
              {/* {user?.email} */}
              tinh
            </Space>
          </Dropdown>
        )}

        <NavbarItem>
          <Link href={'/'} className="text-white bg-slate-950 hover:opacity-80">
            Đăng tuyển hồ sơ
          </Link>
        </NavbarItem>
      </ul>
    </div>
  );
}
