/**
 * 判断是否为Url
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
    return /^http[s]?:\/\/.*/.test(url);
}

/**
 * 判断是否为Email
 * @param email
 * @returns {boolean}
 */
export function isEmail(email) {
    return /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
}

/**
 * 判断是否为手机号码
 * @param phone
 * @returns {boolean}
 */
export function isPhone(phone) {
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$/.test(phone);
}

/**
 * 判断是否为整数
 * @param num
 * @param type
 * @returns {boolean}
 */
export function isNum(num, type) {
    let regName = /[^\d.]/g;
    if (type == 1) {
        if (!regName.test(num)) return false;
    } else if (type == 2) {
        regName = /[^\d]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断是否为小数
 * @param num
 * @param type
 * @returns {boolean}
 */
export function isNumord(num, type) {
    let regName = /[^\d.]/g;
    if (type == 1) {
        if (!regName.test(num)) return false;
    } else if (type == 2) {
        regName = /[^\d.]/g;
        if (!regName.test(num)) return false;
    }
    return true;
}

/**
 * 判断是否为空
 * @param val
 * @returns {boolean}
 */
export function isNull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;
}