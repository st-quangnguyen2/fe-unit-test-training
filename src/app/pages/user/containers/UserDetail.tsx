import { RootState } from '@app/app.reducers';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../user.actions';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <>
      {isLoading && <p className="loading" data-testid="loading">Loading...</p>}
      <h2
        className='txt-center users-title'
        data-testid="title">
        USER DETAIL
      </h2>
      {error && <p data-testid="error">Error</p>}
      {!isLoading && (user ? (
        <table className='users user-detail' data-testid="user-detail">
          <tbody>
            <tr>
              <td>Name</td>
              <td data-testid="user-name">{user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td data-testid="user-email">{user.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td data-testid="user-phone">{user.phone}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td data-testid="user-username">{user.username}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td data-testid="user-website">{user.website}</td>
            </tr>
          </tbody>
        </table>) : 
        (<p data-testid="not-found">User not found...</p>))
      }
    </>
  );
};

export default UserDetail;
