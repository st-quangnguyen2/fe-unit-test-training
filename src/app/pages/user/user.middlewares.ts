/* eslint-disable func-style */
import { AxiosResponse } from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getUserError,
  getUserSuccess,
  getUsersError,
  getUsersSuccess,
} from './user.actions';
import ACTION_TYPES from '@app/core/constants/types';
import { UserService } from '@app/core/services/user.service';

const userService = new UserService();

export function* getUser({ payload }: any) {
  try {
    const res: AxiosResponse<any> = yield userService.getUser(payload);
    yield put(getUserSuccess(res));
  } catch (error) {
    yield put(getUserError(error));
  }
}

export function* getUsers(){
  try {
    const res = yield userService.getUsers();
    yield put(getUsersSuccess(res));
  } catch (error) {
    yield put(getUsersError(error));
  }
}

export function* watchUsers() {
  yield all([
    takeLatest(ACTION_TYPES.GET_USERS, getUsers),
    takeLatest(ACTION_TYPES.GET_USER, getUser)
  ]);
}
