import { IUser } from '@/app/types/backend';
import { post, get } from './http';

const pathUrl = '/auth/login';

export const handleLoginUser = async (user: any) => {
  const result = await post(pathUrl, user);
  return result;
};

export const callRegisterUser = async (user: IUser) => {
  const { age, role = 'USER' } = user;
  const newAge = Number(age);
  const result = await post('/auth/register', { ...user, age: newAge });
  return result;
};

export const callGetInfoUser = async () => {
  const result = await get('/auth/account');
  return result;
};

export const callLogoutUser = async () => {
  const result = await get('/auth/logout');
  return result;
};
