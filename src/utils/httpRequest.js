import axios from 'axios';

const token = JSON.parse(localStorage.getItem('accessToken'));
if (token) {
  const AUTH_TOKEN = `Bearer ${token}`;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options) => {
  const res = await httpRequest.get(path, options);
  return res.data;
};

export const post = async (path, options) => {
  const res = await httpRequest.post(path, options);
  return res.data;
};

export default httpRequest;
