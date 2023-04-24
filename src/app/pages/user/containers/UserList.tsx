import { RootState } from '@app/app.reducers';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../user.actions';

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [users, setUsers] = useState([]);

  const handleDeleteUser = (id: string | number) => {
    setUsers(users?.filter(user => user.id !== id));
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);
  
  const renderUsers = (users) => {
    return (
      <table className='users' data-testid="user-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Website</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={`/users/${user.id}`} data-testid={`user-link-${user.id}`}>{user.name}</a>
              </td>
              <td data-testid={`user-phone-${user.id}`}>{user.phone}</td>
              <td data-testid={`user-username-${user.id}`}>{user.username}</td>
              <td data-testid={`user-website-${user.id}`}>{user.website}</td>
              <td>
                <button
                  data-testid={`btn-del-user-${user.id}`}
                  onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  return (
    <>
      {isLoading && <p data-testid="loading">Loading...</p>}
      <h2
        className='txt-center users-title'
        data-testid="title">
        USERS LIST
      </h2>
      {error && <p data-testid="error">Error</p>}
      { !isLoading && (users?.length ? renderUsers(users) : <p data-testid="empty">List is empty...</p>)}
    </>
  );
};

export default UserList;
