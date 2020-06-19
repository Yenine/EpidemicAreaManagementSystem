// Import the mount() method from the test utils
// and the component you want to test

import login from '../components/page/login'
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import flushPromises from "flush-promises"
import axios from 'axios';


const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.prototype.$axios = axios;

describe('login', () => {
  const wrapper = mount(login, {localVue});
  it('测试注册窗口是否能正常显示', () => {
    expect(wrapper.vm.registerVisible).toBe(false);
    wrapper.find('#register').trigger('click');
    expect(wrapper.vm.registerVisible).toBe(true)
  });
  it('测试注册', async () => {
    wrapper.find('#register').trigger('click');
      expect(wrapper.vm.registerVisible).toBe(true);
    wrapper.setData({registerForm:{
        userID: '452223199909090088',
        password: '222',
        userName:'333',
        phone:'444',
        buildingID:'5'
      }});
    wrapper.find('#submitRegisterForm').trigger('click');
    await flushPromises();
      expect(wrapper.vm.registerVisible).toBe(false)
  });
    it('测试登录失败', async () => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result: "1002"
            }
        });
        wrapper.setData({
            param: {
                userid: '123',
                password: '123',
                role:true,
            }
        });
        wrapper.find('#login').trigger('click');
        await flushPromises();
        expect(localStorage.getItem("ms_username")).toBeNull();
    });
    it('测试登录成功', async () => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result: "0",
                userName:"Master"
            }
        });
        wrapper.setData({
            param: {
                userid: '123',
                password: '123',
                role:true,
            }
            });
        wrapper.find('#login').trigger('click');
        await flushPromises();
        expect(localStorage.getItem("ms_username")).toBe("Master");
    });
});