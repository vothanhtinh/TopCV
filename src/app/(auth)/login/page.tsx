'use client';
import { Button, Divider, Form, Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLoginUser } from '@/queries/auth';
import { SidebarRight } from './styled';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
export default function LoginPage() {
  const { mutation, isLoading } = useLoginUser();
  const user = useSelector((state: any) => state.userSlice.user);

  const router = useRouter();
  useEffect(() => {
    if (user?._id !== '') {
      router.replace('/');
    }
  }, []);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    await mutation.mutateAsync({ username, password });
  };

  return (
    <section className="w-full flex items-center gap-8  h-screen ">
      <div className="w-full md:px-5 py-16 flex gap-5 flex-col ">
        <div className="flex gap-5 flex-col">
          <h2 className="text-green-500 font-semibold text-xl">
            Chào mừng bạn đã quay trở lại
          </h2>
          <h2>
            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
            tưởng
          </h2>
        </div>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          className="w-max"
        >
          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Email"
            name="username"
            rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }} //whole column
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Mật khẩu không được để trống!' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button htmlType="submit" loading={isLoading}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider>Or</Divider>
          <p className="text text-normal">
            Chưa có tài khoản ?
            <span>
              <Link href="/register"> Đăng Ký </Link>
            </span>
          </p>
        </Form>
      </div>

      <SidebarRight>
        <div className="absolute top-1/4 pl-8">
          <Link href={'/'}>
            <Image
              src={'/topcv_white.webp'}
              width={160}
              height={70}
              alt={'topcv'}
            />
          </Link>
        </div>
      </SidebarRight>
    </section>
  );
}
