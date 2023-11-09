// Libraries
import { useQuery } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants/queries';

// Services
import { getUsers } from '@/services/user.api';

export const useGetAllUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getUsers,
    staleTime: 5 * 1000,
  });
  return { data: data, isLoading };
};
