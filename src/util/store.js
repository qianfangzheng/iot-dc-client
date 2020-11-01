import {isNull} from './validate';
import website from '@/config/website'

const keyName = website.key + '-';

/**
 * 存储 localStorage
 * @param params
 */
export const setStore = (params = {}) => {
    let {
        name,
        content,
        type,
    } = params;
    name = keyName + name;
    let obj = {
        dataType: typeof (content),
        content: content,
        type: type,
        datetime: new Date().getTime()
    };
    if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
    else window.localStorage.setItem(name, JSON.stringify(obj));
};

/**
 * 获取 localStorage
 * @param params
 */
export const getStore = (params = {}) => {
    let {
        name,
        debug
    } = params;
    name = keyName + name;
    let obj = {}, content;
    obj = window.sessionStorage.getItem(name);
    if (isNull(obj)) obj = window.localStorage.getItem(name);
    if (isNull(obj)) return;
    try {
        obj = JSON.parse(obj);
    } catch {
        return obj;
    }
    if (debug) {
        return obj;
    }
    if (obj.dataType === 'string') {
        content = obj.content;
    } else if (obj.dataType === 'number') {
        content = Number(obj.content);
    } else if (obj.dataType === 'boolean') {
        content = eval(obj.content);
    } else if (obj.dataType === 'object') {
        content = obj.content;
    }
    return content;
};

/**
 * 删除 localStorage
 * @param params
 */
export const removeStore = (params = {}) => {
    let {
        name,
        type
    } = params;
    name = keyName + name;
    if (type) {
        window.sessionStorage.removeItem(name);
    } else {
        window.localStorage.removeItem(name);
    }
};

/**
 * 获取全部 localStorage
 * @param params
 */
export const getAllStore = (params = {}) => {
    let list = [];
    let {
        type
    } = params;
    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: 'session'
                })
            })
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i),
                })
            })

        }
    }
    return list;
};

/**
 * 清空全部 localStorage
 * @param params
 */
export const clearStore = (params = {}) => {
    let {type} = params;
    if (type) {
        window.sessionStorage.clear();
    } else {
        window.localStorage.clear()
    }
};
