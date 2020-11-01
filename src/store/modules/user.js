import md5 from 'js-md5';
import {getStore, removeStore, setStore} from '@/util/store'
import {cancelToken, generateSalt, generateToken} from '@/api/user'

const user = {
    state: {
        user: getStore({name: 'user'}) || '',
        token: getStore({name: 'token'}) || '',
    },
    actions: {
        GenerateSalt({commit}, name) {
            return new Promise((resolve, reject) => {
                generateSalt(name).then(res => {
                    commit('SET_USER', name);
                    resolve(res.data);
                }).catch(error => {
                    reject(error);
                })
            });
        },
        GenerateToken({commit}, form) {
            let user = {
                name: form.user.name,
                password: md5(md5(form.user.password) + form.salt)
            };
            return new Promise((resolve, reject) => {
                generateToken(user).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ClearToken({commit}) {
            return new Promise((resolve, reject) => {
                cancelToken(getStore({name: 'user'})).then((res) => {
                    commit('REMOVE_USER');
                    commit('REMOVE_TOKEN');
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
            setStore({name: 'user', content: state.user});
        },
        REMOVE_USER: (state) => {
            state.user = '';
            removeStore({name: 'user'});
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({name: 'token', content: state.token});
        },
        REMOVE_TOKEN: (state) => {
            state.token = '';
            removeStore({name: 'token'});
        }
    }
};

export default user
