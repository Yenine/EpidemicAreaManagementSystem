<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="22">
                <!--<el-row :gutter="25" class="mgb20">-->
                    <el-col :span="8">
                        <el-card shadow="hover" class=grid-content>
                            <div style="padding: 4px;">
                                <el-row :gutter="15"><el-col :span="18">当日上报情况</el-col>
                                        <el-button type="text" class="button" style="color: #d3dce6 " @click="getTodaycondition">查看详情</el-button>
                                </el-row>
                                <el-row type="flex" justify="center">
                                    <el-col :span="10">
                                    <div class="grid-cont-bottom">
                                        <div class="grid-num">{{todayList.completed}}</div>
                                        <div>已填报</div>
                                     </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="grid-cont-bottom">
                                            <div class="grid-num">{{todayList.uncompleted}}</div>
                                            <div>未填报</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="14">
                        <el-card shadow="hover" class=grid-content>
                            <div style="padding: 4px;">
                                <el-row :gutter="15"><el-col :span="20">新增人数情况</el-col>
                                    <el-button type="text" class="button" style="color: #d3dce6 ">查看详情</el-button>
                                </el-row>
                                <el-row type="flex" justify="center">
                                    <el-col :span="5">
                                    <div class="grid-cont-bottom">
                                        <div class="grid-num">{{todayIncrease.diagnosis}}</div>
                                        <div>确诊</div>
                                    </div>
                                </el-col>
                                    <el-col :span="5">
                                        <div class="grid-cont-bottom">
                                            <div class="grid-num">{{todayIncrease.suspected}}</div>
                                            <div>疑似</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="grid-cont-bottom">
                                            <div class="grid-num">{{todayIncrease.segregation}}</div>
                                            <div>隔离</div>
                                        </div>
                                    </el-col>
                                    <el-col :span="5">
                                        <div class="grid-cont-bottom">
                                            <div class="grid-num">{{todayIncrease.die}}</div>
                                            <div>死亡</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-card shadow="hover" :body-style="{padding: '0px'}">-->
                            <!--<div class="grid-content grid-con-3">-->
                                <!--<i class="el-icon-lx-goods grid-con-icon"></i>-->
                                <!--<div class="grid-cont-right">-->
                                    <!--<div class="grid-num">5000</div>-->
                                    <!--<div>数量</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</el-card>-->
                    </el-col>
                <!--</el-row>-->
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="22">
            <el-col :span="16">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options0"></schart>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover" class=grid-content>
                    <div style="padding: 4px;">
                        <el-row :gutter="15"><el-col :span="16">总体情况</el-col>
                            <el-button type="text" class="button" style="color: #d3dce6 ">查看详情</el-button>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col>
                                <div class="grid-cont-bottom">
                                    <div class="grid-num">{{total.diagnosis}}</div>
                                    <div>确诊</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col>
                                <div class="grid-cont-bottom">
                                    <div class="grid-num">{{total.suspected}}</div>
                                    <div>疑似</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col>
                                <div class="grid-cont-bottom">
                                    <div class="grid-num">{{total.segregation}}</div>
                                    <div>隔离</div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <el-col>
                                <div class="grid-cont-bottom">
                                    <div class="grid-num">{{total.die}}</div>
                                    <div>死亡</div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            </el-col>
        </el-row>
        <el-dialog title="当日情况" :visible.sync="conditionVisible" width="50%">
            <el-table
                    :data="todayCondition.slice((pageIndex-1)*pageSize,pageIndex*pageSize)">
                <el-table-column
                        prop="userName"
                        label="姓名"
                ></el-table-column>
                <el-table-column
                        prop="userID"
                        label="ID"
                >
                </el-table-column>
                <el-table-column
                        prop="todayTemperature"
                        label="体温"
                >
                </el-table-column>
                <el-table-column
                        prop="HuBeiContact"
                        label="接触湖北人员"
                >
                    <template slot-scope="scope">
                        {{getState(scope.row.HuBeiContact)}}
                    </template>>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="pageIndex"
                        :page-size="pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import { fetchHealthData } from '../../api/index';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            todayList:{},
            todayCondition:[],
            todayIncrease:{},
            total:{},
            trend:{},
            options0:{
                type: 'line',
                title: {
                    text: '发展趋势图'
                },
                bgColor: '#fbfbfb',
                labels: [],
                datasets: []
            },
            stateList:[{id:'0',name:'否'},{id:'1',name:'是'}],
            pageIndex: 1,
            pageSize: 10,
            pageTotal:0,
            conditionVisible:false
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return localStorage.getItem('ms_role') === 'false' ? '开发者': '管理员';
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    created() {
        this.getData();
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        getState(value){
            let list=this.stateList.filter(x=>x.id === value);
            if(list && list.length>0)
                return list[0].name;
        },
        getData() {
            // let today=new Date();
            // let s=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            this.$axios.get('/epidemicSituation'
                // ,JSON.stringify({date:s})
            )
                .then((response)=>{
                // console.log(response);
                let res=response.data;
                console.log(response);
                if(res.result=='0'){
                    this.todayList = res.todayList;
                    this.todayIncrease = res.todayIncrease;
                    this.total = res.total;
                    res.trend.forEach(function(item,index,array){
                        item.data=item.data.map(Number);
                    });
                    console.log(res);
                    this.options0.datasets=res.trend;
                    this.options0.labels=res.date;
                }
                if(res.result=='-2'){
                    this.$message.error('MYSQL执行失败');
                }
                if(res.result=='1003'){
                    this.$message.error('数据库有问题');
                }
            });
            // fetchHealthData(this.query).then(res => {
            //     console.log(res);
            //     this.todayList = res.todayList;
            //     this.todayIncrease = res.todayIncrease;
            //     this.total = res.total;
            //     this.options0.datasets=res.trend;
            //     this.options0.labels=res.time
            // });
        },
        getTodaycondition(){
            this.conditionVisible=true;
            let today=new Date();
            let s=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.log(JSON.stringify({date:s}));
            this.$axios.post('/viewPhysicalCondition',JSON.stringify({date:s})).then((response)=>{
                console.log(response);
                let res=response.data;
                if(res.result=='0'){
                    this.todayCondition = res.info;
                    this.pageTotal=res.pageTotal;
                }
                if(res.result=='-2'){
                    this.$message.error('MYSQL执行失败');
                }
                if(res.result=='1003'){
                    this.$message.error('数据库有问题');
                }
            });
        },
        handlePageChange(val) {
            // this.$set(this.pageIndex, val);
            this.pageIndex=val;
            // this.getData();
        },
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    background-color: #242f42;
    color: #d3dce6;

}

.grid-cont-bottom {
    flex: 1;
    text-align: center;
    font-size: 15px;

}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 0px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 320px;
}
</style>
