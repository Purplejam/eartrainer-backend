import { ITokenUser } from './createTokenUser.interface';

export const createTokenUser = ({name, id, role}: ITokenUser) => {
  return { name, id, role };
};
