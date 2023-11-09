import { IModelPaginate, IUser } from '@/app/types/backend';
import { post, remove, get } from './http';

const pathUrl = '/users';

export const getUsers = async () => {
  const results = await get<IModelPaginate<IUser>>(pathUrl);
  return results;
};

export const createUser = async (data: Partial<IUser>) => {
  try {
    const results = await post(pathUrl, data);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (data: Partial<IUser>) => {
  try {
    const results = await post(`${pathUrl}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (data: Partial<IUser>) => {
  try {
    const results = await remove(`/user/${data}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};
