import { check } from '../utils/auth'; // 引入校验方法

function install (Vue, options={}) { // 提供一个可以use的方法
    Vue.directive(options.name || "auth", { // 指令   随便给名字
        inserted(el, binding) { // 在inserted生命周期中书写逻辑
            if (!check(binding.value)) { // 如果权限校验不通过就删除这个元素（如按钮无权限就删除按钮）
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    });
}

export default { install };