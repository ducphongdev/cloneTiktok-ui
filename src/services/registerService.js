import * as response from '~/utils/httpRequest';

export const register = async ({ user = '', pwd = '' }) => {
  try {
    const res = await response.post('/auth/register', {
      type: 'email',
      email: user,
      password: pwd,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
