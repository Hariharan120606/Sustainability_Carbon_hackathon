// src/features/userActions.js
import { registerSuccess, registerFailure, loginFailure, loginSuccess, clearAlert } from '../slices/UserSlice.js';

export const register = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const user_data = await response.json();
      dispatch(registerSuccess(user_data.data.user));
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } catch (error) {
      dispatch(registerFailure(error.message || 'Network error'));
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
  };
};


export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const user_data = await response.json();
      dispatch(loginSuccess({
        user : user_data.data.user,
        token : user_data.data.token
      }));
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    } catch (error) {
      dispatch(loginFailure(error.message || 'Network error'));
      setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
    }
  };
};

