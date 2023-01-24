import { bcryptConsts } from 'src/config/constants/bcrypt-constans';
import * as bcrypt from 'bcrypt';

/**
 * This Function recieves an object and removes all empty properties from it and its nested objects properties.
 * @param obj
 * @returns Object
 */
export const removeEmptyProps = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => [
        key,
        value === Object(value) ? removeEmptyProps(value) : value,
      ]),
  );
};

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, bcryptConsts.saltOrRound);

export const comparePassword = async (password: string, userPassword: string) =>
  await bcrypt.compare(password, userPassword);
