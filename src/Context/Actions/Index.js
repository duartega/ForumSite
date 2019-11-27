import { VALIDATE_LOGIN } from '../Constants/Action-types';

export function validateLogin(payload) {
  return { type: VALIDATE_LOGIN, payload }
};