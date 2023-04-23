import React from 'react';
import {  waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserService } from '../../../core/services/user.service';
import renderWithProviders from '@app/shared/utils/renderWithProviders';
import UserList from './UserList';
import { act } from 'react-dom/test-utils';

const mockErrorData = {
  response: {
    data: {
      'name':'Forbidden',
      'status':'403',
      'message':'Forbidden',
      'errors':['Forbidden']
    }
  }
};

const mockUsersSuccessData = [
  {
    id: 'ID01',
    name: 'Test Name 1',
    username: 'user-name-1',
    email: 'user+1@email.com',
    phone: '01-000-000-000',
    website: 'user+1.org',
  },
  {
    id: 'ID02',
    name: 'Test Name 2',
    username: 'user-name-2',
    email: 'user+2@email.com',
    phone: '02-000-000-000',
    website: 'user+2.org',
  },
  {
    id: 'ID03',
    name: 'Test Name 3',
    username: 'user-name-3',
    email: 'user+3@email.com',
    phone: '03-000-000-000',
    website: 'user+3.org',
  }
];

const mockGetUsersFunc = jest.spyOn(UserService.prototype, 'getUsers');

describe('<UserList />', () => {
  describe('Loading working correctly', () => {
    test('Loading rendering corretly', async () => {
      const { queryByTestId } = renderWithProviders(<UserList />);
      
      expect(queryByTestId('loading')).toBeInTheDocument();
      expect(queryByTestId('user-list')).toBeNull();
      expect(queryByTestId('empty')).toBeNull();
    });
  });
  
  describe('User List rendering correctly', () => {
    describe('List is empty', () => {
      test('Empty rendering correctly', async () => {
        mockGetUsersFunc.mockResolvedValue([]);
        
        const { queryByTestId } = renderWithProviders(<UserList />);
        
        expect(queryByTestId('loading')).toBeInTheDocument();
        expect(queryByTestId('user-list')).toBeNull();
        expect(queryByTestId('empty')).toBeNull();
        
        await waitFor(() => expect(queryByTestId('empty')).toBeInTheDocument());
        
        expect(queryByTestId('loading')).toBeNull();
        expect(queryByTestId('user-list')).toBeNull();
      });
    });
    
    describe('List has data', () => {
      test('User list rendered', async () => {
        mockGetUsersFunc.mockResolvedValue(mockUsersSuccessData);
        const { queryByTestId } = renderWithProviders(<UserList />);
        
        expect(queryByTestId('loading')).toBeInTheDocument();
        expect(queryByTestId('user-list')).toBeNull();
        expect(queryByTestId('empty')).toBeNull();
        
        await waitFor(() => expect(queryByTestId('user-list')).toBeInTheDocument());
        
        expect(queryByTestId('loading')).toBeNull();
        expect(queryByTestId('empty')).toBeNull();
      });
      
      test('User list data rendering correctly', async () => {
        mockGetUsersFunc.mockResolvedValue(mockUsersSuccessData);
        
        const { queryByTestId } = renderWithProviders(<UserList />);
        
        await waitFor(() => expect(queryByTestId('user-list')).toBeInTheDocument());
        
        mockUsersSuccessData.forEach(user => {
          const id = user.id;
          expect((queryByTestId(`user-link-${id}`) as HTMLLinkElement).href).toMatch(`/users/${id}`);
          expect(queryByTestId(`user-phone-${id}`).textContent).toEqual(user.phone)
          expect(queryByTestId(`user-username-${id}`).textContent).toEqual(user.username);
          expect(queryByTestId(`user-website-${id}`).textContent).toEqual(user.website);
        });
      });
      
      test('Delete function working correctly', async () => {
        mockGetUsersFunc.mockResolvedValue(mockUsersSuccessData);
        const userDeleted = mockUsersSuccessData[0];
        
        const { queryByTestId } = renderWithProviders(<UserList />);
        
        await waitFor(() => expect(queryByTestId('user-list')).toBeInTheDocument());
        
        expect(queryByTestId(`user-link-${userDeleted.id}`)).toBeInTheDocument();
        
        act(() => {
          fireEvent.click(queryByTestId(`btn-del-user-${userDeleted.id}`));
        })
        
        expect(queryByTestId(`user-link-${userDeleted.id}`)).toBeNull();
      });
    });
  });

  describe('Get User List failed', () => {
    test('User list data cannot get', async () => {
      mockGetUsersFunc.mockRejectedValue(mockErrorData);
      
      const { queryByTestId, getByText } = renderWithProviders(<UserList />);
      
      expect(queryByTestId('loading')).toBeInTheDocument();
      
      expect(mockGetUsersFunc).toBeCalled();
      await waitFor(() => expect(queryByTestId('error')).toBeInTheDocument());
      
      expect(getByText('Error')).toBeInTheDocument();
      expect(queryByTestId('loading')).toBeNull();
    });
  });

});
