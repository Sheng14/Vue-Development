function chart (method) { // 返回图表数据（根据请求方法）
    let res = null
    switch(method) {
        case "GET": 
            res=[35, 40, 80, 60, 30, 25];
            break;
        default: 
            res = null
    }
    return res
}
module.exports = chart; // 记得是跑在node.js上面的，需要走commonJs规范