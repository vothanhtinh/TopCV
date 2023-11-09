// Libraries
import { useMutation } from '@tanstack/react-query';
import { message, notification } from 'antd';

// services
import { callRegisterUser } from '@/services/auth.api';

export const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: async (user: any) => callRegisterUser(user),
    onSuccess: (data: any) => {
      if (data?.data?._id) {
        message.success('Đăng ký tài khoản thành công!');
        window.location.href = '/login';
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description:
            data.message && Array.isArray(data.message)
              ? data.message[0]
              : data.data.message,
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
