import request from '@/config/axios'

export const generateSalt = (name) => request({
    url: '/user_api/auth/token/salt',
    method: 'get',
    params: {
        username: name
    }
});

export const generateToken = (user) => request({
    url: '/user_api/auth/token/generate',
    method: 'post',
    data: user
});

export const checkTokenValid = (user, token) => request({
    url: '/user_api/auth/token/check',
    method: 'get',
    params: {
        username: user,
        token
    }
});

export const cancelToken = (name) => request({
    url: '/user_api/auth/token/cancel',
    method: 'get',
    params: {
        username: name
    }
});
