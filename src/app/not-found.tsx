import React from 'react';
import { Button, Result } from 'antd';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="Không tìm thấy trang"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}
