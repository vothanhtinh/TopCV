'use client';
// Libraries

import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import {
  Button,
  Space,
  Table,
  Popconfirm,
  Drawer,
  Form,
  Input,
  InputRef,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import moment from 'moment';
// Queries
// import { useGetAllUser } from 'app/queries/User/useGetAllUser'

// Types
import { IUser } from '@/app/types/backend';
import { useUpdateUser } from '@/queries/user/useUpdateUser';
// import { useDeleteUser } from 'app/queries/User/useDeleteUser'
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useGetAllUser } from '@/queries/user/useGetAllUser';

const ManagerUser = () => {
  // const mutation = useUpdateUser()
  // const mutationDelete = useDeleteUser()
  const [dataUser, setDataUser] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { data, isLoading } = useGetAllUser();

  useEffect(() => {
    setSelectedUser(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if (data) {
      setDataUser(data.data.result);
    }
  }, [data]);

  const showDrawer = (user: IUser) => {
    setSelectedUser(user);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleDelete = (userId: any) => {
    // mutationDelete.mutate(userId)
  };

  const handleSave = () => {
    console.log(selectedUser);

    closeDrawer();
  };

  // handle fillter table
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  type DataIndex = keyof IUser;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a: any, b: any) => a.username.length - b.username.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      key: 'role',
      render: (text: any, record: IUser) => {
        return record.role;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: IUser) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              showDrawer(record);
            }}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              handleDelete(record._id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: '10px' }}>
      <Table
        dataSource={dataUser}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          pageSize: 7,
          showQuickJumper: true,
        }}
      />
      <Drawer
        title="Chỉnh sửa thông tin người dùng"
        placement="right"
        width={400}
        onClose={closeDrawer}
        open={isDrawerVisible}
      >
        {selectedUser && (
          <Form>
            <Form.Item label="Tên">
              <Input
                value={selectedUser.name}
                onChange={(e) => {
                  setSelectedUser({
                    ...selectedUser,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                value={selectedUser.email}
                onChange={(e) => {
                  setSelectedUser({ ...selectedUser, email: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Role">
              <Input value={selectedUser?.role} />
            </Form.Item>
            <Button type="primary" onClick={handleSave}>
              Lưu
            </Button>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default ManagerUser;
