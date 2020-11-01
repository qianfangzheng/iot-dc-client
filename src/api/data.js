import request from '@/config/axios'

export const pointValueApi = {
    list: (pointValue) => request({
        url: '/data_api/data/list',
        method: 'post',
        data: pointValue
    })
};
