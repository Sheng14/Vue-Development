function form (method) { // 返回图表数据（根据请求方法）
    let res = null
    switch(method) {
        case "POST": 
            res="ok";
            break;
        default: 
            res = null
    }
    return res
}
module.exports = form; // 记得是跑在node.js上面的，需要走commonJs规范