import axios from 'axios';
import flushPromises from 'flush-promises'
import announcement from '../components/page/Announcement';
import { mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui';


const localVue = createLocalVue();
localVue.use(ElementUI);
describe('announcement', () => {
    it('能够获得公告', async () => {
        jest.spyOn(axios,'get').mockResolvedValue({
            data: {
                result:0,
                list: [      {
                    id: 1,
                    title: "重要通知!",
                    content: "本社区从疫情开始进行封闭管理。每次出入需要进行体温检测，出入需凭借学生证或教师证，无证不允许进入。\n",
                    state: "重要",
                    date: "2019-11-1"
                },
                    {
                        id: 2,
                        title: "防护用具发放通知",
                        content: "本社区开始发放防护用具，请到XXX领取用具及指南.\n",
                        state: "普通",
                        date: "2019-11-1"
                    }
                ],
                pageTotal: 3
            }
        });
        const wrapper = mount(announcement, {localVue});
        await flushPromises();
        expect(wrapper.find("#announcement").text()).toBe("重要通知!重要2019-11-1编辑删除防护用具发放通知普通2019-11-1编辑删除");
    });
    it('测试添加公告', async() => {
        const wrapper = mount(announcement, {localVue});
        wrapper.find("#addAnnouncement").trigger("click");
        expect(wrapper.vm.addVisible).toBe(true);
        jest.spyOn(axios,'post').mockResolvedValue({
            data: {
                result:0
            }
        });
        wrapper.find("#saveAdd").trigger("click");
        await flushPromises();
        expect(wrapper.vm.addVisible).toBe(false);

    });
    // it('测试修改公告', async() => {
    //     jest.spyOn(axios,'get').mockResolvedValue({
    //         data: {
    //             result:0,
    //             list: [      {
    //                 id: 1,
    //                 title: "重要通知!",
    //                 content: "本社区从疫情开始进行封闭管理。每次出入需要进行体温检测，出入需凭借学生证或教师证，无证不允许进入。\n",
    //                 state: "重要",
    //                 date: "2019-11-1"
    //             },
    //                 {
    //                     id: 2,
    //                     title: "防护用具发放通知",
    //                     content: "本社区开始发放防护用具，请到XXX领取用具及指南.\n",
    //                     state: "普通",
    //                     date: "2019-11-1"
    //                 }
    //             ],
    //             pageTotal: 3
    //         }
    //     });
    //     const wrapper = mount(announcement, {localVue});
    //     await flushPromises();
    //     wrapper.find("#editAnnouncement").trigger("click");
    //     expect(wrapper.vm.editVisible).toBe(true);
    // });
});