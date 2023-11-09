// Libraries
import { useMutation } from '@tanstack/react-query';
import { message, notification } from 'antd';

// services
import { callLogoutUser } from '@/services/auth.api';

export const useLogoutUser = () => {
  const mutation = useMutation({
    mutationFn: async () => callLogoutUser(),
    onSuccess: (data: any) => {},

    onError(error: any) {},
  });

  return {
    mutation,
    isLoading: mutation.isPending,
  };
};
