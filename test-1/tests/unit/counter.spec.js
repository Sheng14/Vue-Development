import { mount } from "@vue/test-utils";
import sinon from 'sinon';
import Counter from "@/components/Counter.vue";

describe("Counter.vue", () => {
 // let flag = false // 标志位标记是否已经触发了抛出的事件
  const change = sinon.spy() // 利用辅助库的间谍就无需再用标志位什么的
  const wrapper = mount(Counter, {
      listeners: { // 监听组件中的事件
      /*  change () {
            flag = true // 改变标志位代表已经走过抛出的事件
        }*/
        change
      }
  });
  it("renders props.msg when passed", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("click", () => { // 监听点击事件
    const button = wrapper.find('button'); // 找到button按钮
    button.trigger('click'); // 点击一次
    expect(wrapper.vm.count).toBe(1); // 希望点击次数为1
    // expect(flag).toBe(true) // 希望标志位被改变即经过了抛出的事件
    expect(change.called).toBe(true); // 希望间谍被触发
    button.trigger("click"); // 点击第二次就再一次触发间谍change
    expect(change.callCount).toBe(2); // 希望间谍的被触发次数被2
  })
});
