import {isNull} from './validate'
import {Notification} from 'element-ui'

let failNotify = true, failNotifyText = '';

/**
 * 表单序列化
 *
 * @param data
 * @returns {string}
 */
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    });
    return list.join('&');
};

/**
 * 获取对象类型
 *
 * @param obj
 * @returns {string|*}
 */
export const getObjType = obj => {
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

/**
 * 对象深拷贝
 *
 * @param data
 * @returns {{}|*}
 */
export const deepClone = data => {
    let type = getObjType(data);
    let obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};

/**
 * 设置灰度模式
 *
 * @param status
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + ' grayMode';
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};

/**
 * 设置主题
 *
 * @param name
 */
export const setTheme = (name) => {
    document.body.className = name;
};

/**
 * 加密处理
 *
 * @param params
 * @returns {any}
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params;
    let result = JSON.parse(JSON.stringify(data));
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        })
    } else if (type === 'Aes') {
        param.forEach(ele => {
            result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
        })
    }
    return result;
};


/**
 * 递归寻找子类的父类
 *
 * @param menu
 * @param id
 * @returns {undefined|*}
 */
export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length !== 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id === id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length !== 0) {
                        return findParent(menu[i].children[j].children, id);
                    }
                }
            }
        }
    }
};

/**
 * 动态插入css
 *
 * @param url
 */
export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};

/**
 * 判断2个对象属性和值是否相等
 *
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    let o1 = obj1 instanceof Object;
    let o2 = obj2 instanceof Object;
    if (!o1 || !o2) {
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (let attr in obj1) {
        let t1 = obj1[attr] instanceof Object;
        let t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
};

/**
 * 根据字典的value显示label
 *
 * @param dic
 * @param value
 * @returns {string|*}
 */
export const findDicLabel = (dic, value) => {
    let result = '';
    if (isNull(dic)) return value;
    if (typeof (value) == 'string' || typeof (value) == 'number' || typeof (value) == 'boolean') {
        let index = 0;
        index = findDicIndex(dic, value);
        if (index !== -1) {
            result = dic[index].label;
        } else {
            result = value;
        }
    } else if (value instanceof Array) {
        result = [];
        let index = 0;
        value.forEach(ele => {
            index = findDicIndex(dic, ele);
            if (index !== -1) {
                result.push(dic[index].label);
            } else {
                result.push(value);
            }
        });
        result = result.toString();
    }
    return result;
};

/**
 * 根据字典的value查找对应的index
 *
 * @param dic
 * @param value
 * @returns {number}
 */
export const findDicIndex = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
        if (dic[i].value === value) {
            return i;
        }
    }
    return -1;
};

/**
 * 生成随机len位数字
 *
 * @param len
 * @param date
 * @returns {string}
 */
export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
};

/**
 * 打开全屏/关闭全屏
 */
export const triggerFullscreen = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};

/**
 * esc监听全屏
 *
 * @param callback
 */
export const listenFullscreen = (callback) => {
    function listen() {
        callback()
    }

    document.addEventListener('fullscreenchange', function () {
        listen();
    });
    document.addEventListener('mozfullscreenchange', function () {
        listen();
    });
    document.addEventListener('webkitfullscreenchange', function () {
        listen();
    });
    document.addEventListener('msfullscreenchange', function () {
        listen();
    });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};

/**
 * 打开小窗口
 *
 * @param url
 * @param title
 * @param w
 * @param h
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
};

/**
 * 成功操作
 *
 * @param message
 */
export const successMessage = (message) => {
    if (message === '' || message == null) {
        message = '操作成功!';
    }
    Notification.success({
        title: '成功',
        message: message,
        onClose: () => {
            failNotify = false;
            failNotifyText = '';
        }
    });
};

/**
 * 失败操作
 *
 * @param message
 */
export const failMessage = (message) => {
    let show = true;
    if (message === '' || message == null) {
        message = '操作失败!';
    }
    if (failNotify && failNotifyText === message) {
        show = false;
    }
    if (show) {
        failNotify = true;
        failNotifyText = message;
        Notification.error({
            title: '错误',
            dangerouslyUseHTMLString: true,
            message: `<p>${message}</p><p>详情: 请查看浏览器 控制台 输出。</p>`,
            onClose: () => {
                failNotify = false;
                failNotifyText = '';
            }
        });
        console.error(message);
    }
};
