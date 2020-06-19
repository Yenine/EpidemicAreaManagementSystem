import axios from 'axios';
import flushPromises from 'flush-promises'
import resident from '../components/page/resident';
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui';


const localVue = createLocalVue();
localVue.use(ElementUI);

describe('resident', () => {
    it('获取住户信息', async () => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0,
                info:[
                    { userID:"452223199908080909",
                        userName:"张三",
                        phone:"13344445555",
                        buildingID:"2",
                        familyID:"3",
                        state:"1",
                        familyName:["张四","张五"]
                    },
                    { userID:"452223199908080907",
                        userName:"李三",
                        phone:"13344445555",
                        buildingID:"2",
                        familyID:"3",
                        state:"1",
                        familyName:["李四","李五"]
                    }
                ],
                pageTotal: 2
            }
        });
        const wrapper = mount(resident, {localVue});
        await flushPromises();
        expect(wrapper.find("#residentData").text()).toBe("姓名身份证号栋号户号状态联系方式操作张三45222319990808090923健康13344445555修改李三45222319990808090723健康13344445555修改");
    });
    it('测试修改住户信息', async() => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0,
                info:[
                    { userID:"452223199908080909",
                        userName:"张三",
                        phone:"13344445555",
                        buildingID:"2",
                        familyID:"3",
                        state:"1",
                        familyName:["张四","张五"]
                    },
                    { userID:"452223199908080907",
                        userName:"李三",
                        phone:"13344445555",
                        buildingID:"2",
                        familyID:"3",
                        state:"1",
                        familyName:["李四","李五"]
                    }
                ],
                pageTotal: 2
            }
        });
        const wrapper = mount(resident, {localVue});
        await flushPromises();
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0
            }
        });
        wrapper.find("#Edit").trigger("click");
        expect(wrapper.vm.editVisible).toBe(true);
        // wrapper.setData({form:{userName:"",state:"2"}});
        // wrapper.find("#saveEdit").trigger("click");
        // expect(wrapper.vm.editVisible).toBe(false);
    });
});