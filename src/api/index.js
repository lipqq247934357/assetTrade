import {post} from "./getData";

// 所有的不涉及具体的data的接口写到这里，统一维护

export const login = (username, password) => {
    return post('/login', {username: username, password: password});
};

export const getInfo = (data) => {
    return post('/userInfo', data);
};

export const getRoles = (data) => {
    return post('/getRoles', data);
};

export const tzcx = (listId, custName, loanAcNo) => {
    return post('/tzcx', {listId, custName, loanAcNo});
}

export const tzcxDt = (id) => {
    return post('/tzcxDt', {id});
}
