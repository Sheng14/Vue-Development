<script>
import { check } from '../utils/auth';
export default {
    functional: true, // 函数式组件
    props: {
        authority: {
            type: Array,
            required: true
        }
    },
    render(h, context) {
        const { props, scopedSlots } = context;
        return check(props.authority) ? scopedSlots.default() : null; // 接受的权限校验通过则返回子组件（就被我们包围的那个组件），否则null
    }
}
</script>

<style>

</style>