export function getCurrentAuthority () { // 获取当前用户权限（后端给的，这个时候就是模拟一下）
    return ['admin'];
}

export function check (authority) { // 利用传入的权限组对当前权限进行校验
    const current = getCurrentAuthority(); // 先拿到当前的权限
    return current.some(item => authority.includes(item)); // 遍历权限组找是否有权限与当前权限一样就可以判断
}

export function isLogin () { // 判断是否登录，只要不是guest的身份就行
    const current = getCurrentAuthority();
    return current && current[0] !== "guest";
}