'use client';
import { Button, Divider, Form, Input, Select } from 'antd';
import Link from 'next/link';

// Types
import { IUser } from '@/app/types/backend';
import { useRegisterUser } from '@/queries/auth/useRegister';

const { Option } = Select;

const RegisterPage = () => {
  const { mutation, isLoading } = useRegisterUser();

  const onFinish = async (values: IUser) => {
    const { name, email, password, age, gender, address } = values;

    await mutation.mutateAsync({ name, email, password, age, gender, address });
  };

  return (
    <div className="p-4">
      <main>
        <div>
          <section>
            <div>
              <h2 className="text-center text-green-500"> Đăng Ký Tài Khoản </h2>
              <Divider />
            </div>
            <Form<IUser>
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Họ tên"
                name="name"
                rules={[
                  { required: true, message: 'Họ tên không được để trống!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Email không được để trống!' },
                ]}
              >
                <Input type="email" />
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
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Tuổi"
                name="age"
                rules={[
                  { required: true, message: 'Tuổi không được để trống!' },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                name="gender"
                label="Giới tính"
                rules={[
                  { required: true, message: 'Giới tính không được để trống!' },
                ]}
              >
                <Select
                  // placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: 'Địa chỉ không được để trống!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button htmlType="submit">Đăng ký</Button>
              </Form.Item>
              <Divider> Or </Divider>
              <p className="text text-normal flex justify-center">
                Đã có tài khoản ?
                <span>
                  <Link href="/login"> Đăng Nhập </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
