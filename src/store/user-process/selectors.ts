import { NameSpace, AuthorizationStatus } from '@/const';
import { State } from '@/types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: State): string | null => state[NameSpace.User].userEmail;
