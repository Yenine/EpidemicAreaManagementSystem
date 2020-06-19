import axios from 'axios';
import flushPromises from 'flush-promises'
import health from '../components/page/Dashboard';
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui';


const localVue = createLocalVue();
localVue.use(ElementUI);

describe('dashboard', () => {
    it('查看疫情统计信息', async () => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                result: "0",
                todayList: {"completed": "0", "uncompleted": "5"},
                total: {segregation: "2", suspected: "1", diagnosis: "0", die: "0"},
                todayIncrease: {
                    segregation: "-1",
                    suspected: "-2",
                    diagnosis: "-3",
                    die: "-3"
                },
                date: ["2020-05-27", "2020-05-26", "2020-05-25", "2020-05-24", "2020-05-23", "2020-05-22", "2020-05-21"],
                trend: [
                    {
                        label: "隔离",
                        data: ["2", "7", "6", "5", "4", "3", "2"]
                    },
                    {
                        label: "疑似",
                        "data": ["1", "7", "6", "5", "4", "3", "1"]
                    },
                    {
                        label: "确诊",
                        "data": ["0", "7", "6", "5", "4", "3", "0"]
                    },
                    {
                        label: "死亡",
                        data: ["0", "7", "6", "5", "4", "3", "0"]
                    }
                ]
            }
        });
        const wrapper = mount(health, {localVue});
        await flushPromises();
        expect(wrapper.text()).toBe("当日上报情况 查看详情 0 已填报 5 未填报 新增人数情况 查看详情 -3 确诊 -2 疑似 -1 隔离 -3 死亡   总体情况 查看详情 0 确诊 1 疑似 2 隔离 0 死亡 当日情况")
    });
    it('查看详细情况', async () => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                result: "0",
                todayList: {"completed": "0", "uncompleted": "5"},
                total: {
                    segregation: "2",
                    suspected: "1",
                    diagnosis: "0",
                    die: "0"
                },
                todayIncrease: {
                    segregation: "-1",
                    suspected: "-2",
                    diagnosis: "-3",
                    die: "-3"
                },
                date: ["2020-05-27", "2020-05-26", "2020-05-25", "2020-05-24", "2020-05-23", "2020-05-22", "2020-05-21"],
                trend: [
                    {
                        label: "隔离",
                        data: ["2", "7", "6", "5", "4", "3", "2"]
                    },
                    {
                        label: "疑似",
                        "data": ["1", "7", "6", "5", "4", "3", "1"]
                    },
                    {
                        label: "确诊",
                        "data": ["0", "7", "6", "5", "4", "3", "0"]
                    },
                    {
                        label: "死亡",
                        data: ["0", "7", "6", "5", "4", "3", "0"]
                    }
                ]
            }
        });
        const wrapper = mount(health, {localVue});
        await flushPromises();
        jest.spyOn(axios, 'post').mockResolvedValue({
            data: {
                result:0,
                pageTotal:2,
                info:[
                    {userID:"452223199909090099",date:"2020-05-28",todayTemperature:"36.5",HuBeiContact:"1", userName:"李甲"},
                    {userID:"452223199909090090",date:"2020-05-28",todayTemperature:"37.1",HuBeiContact:"0",userName:"李乙"}
                ]
            }
        });
        wrapper.find("#getTodaycondition").trigger('click');
        await flushPromises();
        expect(wrapper.find("#todayCondition").text())
            .toMatch("姓名ID体温接触湖北人员李甲45222319990909009936.5")
    })
});