import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => console.log(err))
};
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/admin',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '健康状况' }
                },
                {
                    path: '/register',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/RegisterForm.vue'),
                    meta: { title: '人员登记' }
                },
                {
                    path: '/announcement',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Announcement.vue'),
                    meta: { title: '信息公开' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Supplies.vue'),
                    meta: { title: '物资管理', permission: true}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: '通知消息' }
                },
                {
                    path: '/resident',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Resident.vue'),
                    meta: { title: '关系网络' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '应用上传' }
                },
                {
                    path: '/segregationlist',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SegregationList.vue'),
                    meta: { title: '隔离状况' }
                },
                {
                    path: '/admin/list',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseList.vue'),
                    meta: { title: '应用列表' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // vue-schart组件
                    path: 'admin/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: 'admin/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录|疫情管理系统' }
        }
        // {
        //     path: '/admin/*',
        //     redirect: '/404'
        // }
    ]
});
