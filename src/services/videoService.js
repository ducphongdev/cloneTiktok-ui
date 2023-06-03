import * as response from '~/utils/httpRequest';

export const video = async ({ page = 1, type = 'for-you' }) => {
  try {
    const res = await response.get('videos', {
      params: {
        type,
        page,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
