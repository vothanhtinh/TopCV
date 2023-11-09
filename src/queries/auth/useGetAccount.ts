// Libraries
import { useQuery } from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants/queries';

// Services
import { callGetInfoUser } from '@/services/auth.api';

export const useGetProfileAccount = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: callGetInfoUser,
    staleTime: 5 * 1000,
  });
  return { data: data, isLoading };
};
