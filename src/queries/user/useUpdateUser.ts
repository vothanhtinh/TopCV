// Libraries
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// // Constants
import { QUERY_KEYS } from '@/constants/queries';

// // Services
import { updateUser } from '@/services/user.api';

// // Types

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (user: any) => updateUser(user),

    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });
  return mutation;
};
