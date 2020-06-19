import axios from 'axios';
import flushPromises from 'flush-promises'
import segregation from '../components/page/SegregationList';
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui';


const localVue = createLocalVue();
localVue.use(ElementUI);

describe('segregation', () => {
    it('能够获得隔离列表', async () => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0,
                information:[
                    {
                        userId:"0909",
                        name:"哈哈哈",
                        buildingId:"1",
                        familyId:"1",
                        phone:"11111",
                        beginDate:"2010-01-01",
                        endDate:"2010-01-05"
                    },
                    {
                        userId:"0909",
                        name:"哈哈哈",
                        buildingId:"1",
                        familyId:"1",
                        phone:"11111",
                        beginDate:"2010-01-01",
                        endDate:"2010-01-05"
                    }],
                pageTotal: 3
            }
        });
        const wrapper = mount(segregation, {localVue});
        await flushPromises();
        expect(wrapper.find("#segregationData").text()).toBe("姓名位置开始时间结束时间联系方式操作哈哈哈2010-01-012010-01-0511111修改哈哈哈2010-01-012010-01-0511111修改");
    });
    it('测试修改隔离信息', async() => {
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0,
                information:[
                    {
                        userId:"0909",
                        name:"哈哈哈",
                        buildingId:"1",
                        familyId:"1",
                        phone:"11111",
                        beginDate:"2010-01-01",
                        endDate:"2010-01-05"
                    },
                    {
                        userId:"0909",
                        name:"哈哈哈",
                        buildingId:"1",
                        familyId:"1",
                        phone:"11111",
                        beginDate:"2010-01-01",
                        endDate:"2010-01-05"
                    }],
                pageTotal: 3
            }
        });
        const wrapper = mount(segregation, {localVue});
        await flushPromises();
        console.log(wrapper.text())
        // jest.spyOn(axios,'post').mockResolvedValue({
        //     data: {
        //         result:0
        //     }
        // });
        wrapper.find("#Edit").trigger("click");
        expect(wrapper.vm.editVisible).toBe(true);
        wrapper.find("#saveEdit").trigger("click");
        await flushPromises();
        expect(wrapper.vm.editVisible).toBe(false);
    });
});