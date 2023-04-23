import React from 'react';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import UserDetail from './UserDetail';
import { UserService } from '../../../core/services/user.service';
import renderWithProviders from '@app/shared/utils/renderWithProviders';

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

const mockUserSuccessData =   {
  id: 'ID01',
  name: 'Test Name 1',
  username: 'user-name-1',
  email: 'user+1@email.com',
  phone: '01-000-000-000',
  website: 'user+1.org',
};

const mockGetUserFunc = jest.spyOn(UserService.prototype, 'getUser');

describe('<UserDetail />', () => {
  describe('Loading working correctly', () => {
    test('Loading rendering corretly', async () => {
      const { queryByTestId } = renderWithProviders(<UserDetail />);

      expect(queryByTestId('loading')).toBeInTheDocument();
      expect(queryByTestId('not-found')).toBeNull();
      expect(queryByTestId('user-detail')).toBeNull();
      
    });
  });

  describe('User rendering correctly', () => {
    describe('User not found', () => {
      test('Not found rendering correctly', async () => {
        mockGetUserFunc.mockResolvedValue(null);

        const { queryByTestId } = renderWithProviders(<UserDetail />);

        expect(queryByTestId('loading')).toBeInTheDocument();
        expect(queryByTestId('user-detail')).toBeNull();
        expect(queryByTestId('not-found')).toBeNull();
        
        await waitFor(() => expect(queryByTestId('not-found')).toBeInTheDocument());
        
        expect(queryByTestId('loading')).toBeNull();
        expect(queryByTestId('user-detail')).toBeNull();
      });
    });
    
    describe('User has data', () => {
      test('User rendered', async () => {
        mockGetUserFunc.mockResolvedValue(mockUserSuccessData);
        const { queryByTestId } = renderWithProviders(<UserDetail />);

        expect(queryByTestId('loading')).toBeInTheDocument();
        expect(queryByTestId('user-detail')).toBeNull();
        expect(queryByTestId('not-found')).toBeNull();

        await waitFor(() => expect(queryByTestId('user-detail')).toBeInTheDocument());

        expect(queryByTestId('loading')).toBeNull();
        expect(queryByTestId('not-found')).toBeNull();
      });

      test('User data rendering correctly', async () => {
        mockGetUserFunc.mockResolvedValue(mockUserSuccessData);
        const user = mockUserSuccessData;

        const { queryByTestId } = renderWithProviders(<UserDetail />);

        await waitFor(() => expect(queryByTestId('user-detail')).toBeInTheDocument());

        expect(queryByTestId(`user-phone`).textContent).toEqual(user.phone)
        expect(queryByTestId(`user-username`).textContent).toEqual(user.username);
        expect(queryByTestId(`user-website`).textContent).toEqual(user.website);
      });
    });
  });

  describe('Get User failed', () => {
    test('Can not get User', async () => {
      mockGetUserFunc.mockRejectedValue(mockErrorData);

      const { queryByTestId, getByText } = renderWithProviders(<UserDetail />);

      expect(queryByTestId('loading')).toBeInTheDocument();

      expect(mockGetUserFunc).toBeCalled();
      await waitFor(() => expect(queryByTestId('error')).toBeInTheDocument());

      expect(getByText('Error')).toBeInTheDocument();
      expect(queryByTestId('loading')).toBeNull();
    });
  });
});
