import Cookies from 'js-cookie'
import website from "@/config/website";

const keyName = website.key + '-';
const TokenKey = keyName + 'auth-token';

// 360分钟，360 * 60 * 1000
const expiration = new Date(new Date().getTime() + 360 * 60 * 1000);

export function getTokenCookies() {
    return Cookies.get(TokenKey);
}

export function setTokenCookies(token) {
    return Cookies.set(TokenKey, token, {expires: expiration});
}

export function removeTokenCookies() {
    return Cookies.remove(TokenKey);
}