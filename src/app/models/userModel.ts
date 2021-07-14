import {ID} from '@datorama/akita';
import {ProductModel} from './product.model';

export type UserModel = {
  id: ID;
  username: string;
  email: string;
  phone: string;
  password: string;
  roles: [string];
};

export function createUserModel({id, username, email, phone, password, roles }: Partial<UserModel>): UserModel {
  return {
    id,
    username,
    email,
    phone,
    password,
    roles,
  } as UserModel;
}
