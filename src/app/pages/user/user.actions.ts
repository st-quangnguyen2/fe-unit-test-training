import ACTION_TYPES from '@app/core/constants/types';

export const getUser = (payload: any) => ({
  type: ACTION_TYPES.GET_USER,
  payload,
});

export const getUserSuccess = (data: any) => ({
  type: ACTION_TYPES.GET_USER_SUCCESS,
  payload: data,
});

export const getUserError = (error: any) => ({
  type: ACTION_TYPES.GET_USER_ERROR,
  payload: error,
});

export const getUsers = () => {
  return {
    type: ACTION_TYPES.GET_USERS
  };
};

export const getUsersSuccess = (data: any) => {
  return {
    type: ACTION_TYPES.GET_USERS_SUCCESS,
    payload: data
  };
};

export const getUsersError = (error: any) => {
  return {
    type: ACTION_TYPES.GET_USERS_ERROR,
    payload: error
  };
};
