import axios from 'axios';
import { notification } from 'ant-design-vue';

function request (options) { // 请求二次封装
    return axios(options)
    .then((res) => {
        return res;
    }) // 直接返回
    .catch((error) => { // 捕获错误
        const { response: { status, statusText } } = error; // 拿到错误信息
        notification.error({
            // eslint-disable-next-line no-unused-vars
            message: h=> ( // 用jsx的方式来修改错误提示框的样式
                <div>
                    请求错误 <span style="color: red">{status}</span>: {options.url}
                </div>
            ),
            description: statusText
        });
        return Promise.reject(error); // 返回个错误，外面调用的就不会走then同时也可以再catch一下
    });
}

export default request;
