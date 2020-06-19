
import axios from 'axios';
import Users from './users';
import flushPromises from 'flush-promises'
import supply from '../components/page/Supplies';
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui';


const localVue = createLocalVue();
localVue.use(ElementUI);
describe('supply', () => {
    it('能够获得物资数据', async () => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result: "0",
                applyNum: 4,
                applyInfo: [
                    {
                        applyID: "9999",
                        userID: "452223199707090000",
                        equipmentName: "cloth",
                        amount: 3,
                        date: "2020-05-28",
                        state: "2"
                    },
                    {
                        applyID: "10000",
                        userID: "452223199907095222",
                        equipmentName: "mask",
                        amount: 33,
                        date: "2020-03-03",
                        state: "2"
                    },
                    {
                        applyID: "10002",
                        userID: "452223199907095222",
                        equipmentName: "mask",
                        amount: 3,
                        date: "2020-05-28",
                        state: "2"
                    },
                ]
            }
        });
        const wrapper = mount(supply, {localVue});
        await flushPromises();
        // const resp = {data: { }};
        expect(wrapper.find('#pagination').text()).toBe("共 4 条1");

    });
    it('能够添加物资', async () =>{
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result: "0",
            }
        });
        const wrapper = mount(supply, {localVue});
        wrapper.find('#addSupply').trigger('click');
        expect(wrapper.vm.addVisible).toBe(true);
        wrapper.setData({
            form: {
                equipmentName:"alcohol",
                storage:100
            }
        });
        wrapper.find('#saveAdd').trigger('click');
        await flushPromises();
        expect(wrapper.vm.addVisible).toBe(false);

    });
});