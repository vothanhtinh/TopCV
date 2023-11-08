// Libraries
import { handleLoginUser } from '@/services/auth.api';
import { useMutation } from '@tanstack/react-query';
import { message, notification } from 'antd';

// services

export const useLoginUser = () => {
  //navigate

  //dispatch

  const mutation = useMutation({
    mutationFn: async (user: any) => handleLoginUser(user),
    onSuccess: (data: any) => {
      if (data.data) {
        localStorage.setItem('access_token', data.data.access_token);
        message.success('Đăng nhập tài khoản thành công!');
        window.location.href = '/';
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description:
            data.message && Array.isArray(data.message)
              ? data.message[0]
              : data.message,
          duration: 5,
        });
      }
    },

    onError(error: any) {},
  });

  return {
    mutation,
    isLoading: mutation.isPending,
  };
};
