import request from '@/config/axios'

export const driverApi = {
    delete: (id) => request({
        url: '/manager_api/manager/driver/delete/' + id,
        method: 'post'
    }),
    list: (driver) => request({
        url: '/manager_api/manager/driver/list',
        method: 'post',
        data: driver
    }),
    status: (driver) => request({
        url: '/manager_api/manager/driver/status',
        method: 'post',
        data: driver
    })
};

export const driverAttributeApi = {
    add: (driverAttribute) => request({
        url: '/manager_api/manager/driverAttribute/add',
        method: 'post',
        data: driverAttribute
    }),
    delete: (id) => request({
        url: '/manager_api/manager/driverAttribute/delete/' + id,
        method: 'post'
    }),
    update: (driverAttribute) => request({
        url: '/manager_api/manager/driverAttribute/update',
        method: 'post',
        data: driverAttribute
    }),
    list: (driverAttribute) => request({
        url: '/manager_api/manager/driverAttribute/list',
        method: 'post',
        data: driverAttribute
    })
};

export const driverInfoApi = {
    add: (driverInfo) => request({
        url: '/manager_api/manager/driverInfo/add',
        method: 'post',
        data: driverInfo
    }),
    delete: (id) => request({
        url: '/manager_api/manager/driverInfo/delete/' + id,
        method: 'post'
    }),
    update: (driverInfo) => request({
        url: '/manager_api/manager/driverInfo/update',
        method: 'post',
        data: driverInfo
    }),
    list: (driverInfo) => request({
        url: '/manager_api/manager/driverInfo/list',
        method: 'post',
        data: driverInfo
    })
};

export const pointAttributeApi = {
    add: (pointAttribute) => request({
        url: '/manager_api/manager/pointAttribute/add',
        method: 'post',
        data: pointAttribute
    }),
    delete: (id) => request({
        url: '/manager_api/manager/pointAttribute/delete/' + id,
        method: 'post'
    }),
    update: (pointAttribute) => request({
        url: '/manager_api/manager/pointAttribute/update',
        method: 'post',
        data: pointAttribute
    }),
    list: (pointAttribute) => request({
        url: '/manager_api/manager/pointAttribute/list',
        method: 'post',
        data: pointAttribute
    })
};

export const pointInfoApi = {
    add: (pointInfo) => request({
        url: '/manager_api/manager/pointInfo/add',
        method: 'post',
        data: pointInfo
    }),
    delete: (id) => request({
        url: '/manager_api/manager/pointInfo/delete/' + id,
        method: 'post'
    }),
    update: (pointInfo) => request({
        url: '/manager_api/manager/pointInfo/update',
        method: 'post',
        data: pointInfo
    }),
    list: (pointInfo) => request({
        url: '/manager_api/manager/pointInfo/list',
        method: 'post',
        data: pointInfo
    })
};

export const profileApi = {
    add: (profile) => request({
        url: '/manager_api/manager/profile/add',
        method: 'post',
        data: profile
    }),
    delete: (id) => request({
        url: '/manager_api/manager/profile/delete/' + id,
        method: 'post'
    }),
    update: (profile) => request({
        url: '/manager_api/manager/profile/update',
        method: 'post',
        data: profile
    }),
    list: (profile) => request({
        url: '/manager_api/manager/profile/list',
        method: 'post',
        data: profile
    })
};

export const groupApi = {
    add: (group) => request({
        url: '/manager_api/manager/group/add',
        method: 'post',
        data: group
    }),
    delete: (id) => request({
        url: '/manager_api/manager/group/delete/' + id,
        method: 'post'
    }),
    update: (group) => request({
        url: '/manager_api/manager/group/update',
        method: 'post',
        data: group
    }),
    list: (group) => request({
        url: '/manager_api/manager/group/list',
        method: 'post',
        data: group
    })
};

export const deviceApi = {
    add: (device) => request({
        url: '/manager_api/manager/device/add',
        method: 'post',
        data: device
    }),
    delete: (id) => request({
        url: '/manager_api/manager/device/delete/' + id,
        method: 'post'
    }),
    update: (device) => request({
        url: '/manager_api/manager/device/update',
        method: 'post',
        data: device
    }),
    list: (device) => request({
        url: '/manager_api/manager/device/list',
        method: 'post',
        data: device
    }),
    status: (device) => request({
        url: '/manager_api/manager/device/status',
        method: 'post',
        data: device
    })
};

export const pointApi = {
    add: (point) => request({
        url: '/manager_api/manager/point/add',
        method: 'post',
        data: point
    }),
    delete: (id) => request({
        url: '/manager_api/manager/point/delete/' + id,
        method: 'post'
    }),
    update: (point) => request({
        url: '/manager_api/manager/point/update',
        method: 'post',
        data: point
    }),
    list: (point) => request({
        url: '/manager_api/manager/point/list',
        method: 'post',
        data: point
    })
};

export const dictionaryApi = {
    driverDictionary: () => request({
        url: '/manager_api/manager/dictionary/driver',
        method: 'get'
    }),
    profileDictionary: () => request({
        url: '/manager_api/manager/dictionary/profile',
        method: 'get'
    }),
    driverAttributeDictionary: () => request({
        url: '/manager_api/manager/dictionary/driverAttribute',
        method: 'get'
    }),
    pointAttributeDictionary: () => request({
        url: '/manager_api/manager/dictionary/pointAttribute',
        method: 'get'
    }),
    groupDictionary: () => request({
        url: '/manager_api/manager/dictionary/group',
        method: 'get'
    }),
    deviceDictionary: (parent) => request({
        url: '/manager_api/manager/dictionary/device/' + parent,
        method: 'get'
    }),
    pointDictionary: (parent) => request({
        url: '/manager_api/manager/dictionary/point/' + parent,
        method: 'get'
    })
};
