import { createReducer } from '@app/core/helpers/reducer-factory';
import ACTION_TYPES from '@core/constants/types';

const initialState = {
  userList: null,
  user: null,
  isLoading: false,
  hasError: false,
  error: '',
};

const getUsers = (state, payload) => ({
  ...state,
  isLoading: true,
});

const getUsersSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  userList: payload,
});

const getUsersError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const getUser = (state, payload) => ( {
  ...state,
  isLoading: true,
});

const getUserSuccess = (state, payload) =>  ({
  ...state,
  isLoading: false,
  user: payload,
});

const getUserError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const strategies = {
  [ACTION_TYPES.GET_USERS]: getUsers,
  [ACTION_TYPES.GET_USERS_SUCCESS]: getUsersSuccess,
  [ACTION_TYPES.GET_USERS_ERROR]: getUsersError,
  [ACTION_TYPES.GET_USER]: getUser,
  [ACTION_TYPES.GET_USER_SUCCESS]: getUserSuccess,
  [ACTION_TYPES.GET_USER_ERROR]: getUserError,
  __default__: state => state
};

const userReducer = createReducer(strategies, initialState);

export default userReducer;
