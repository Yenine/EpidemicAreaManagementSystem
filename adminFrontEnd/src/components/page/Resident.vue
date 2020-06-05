<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 关系网络
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--{{residentData}}-->
        <el-row>
            <el-col :span="20">
                <div class=grid-content style="padding: 10px">
                    <el-row :gutter="2">
                        <el-col :span="4">
                            住户名:
                            <el-input type="text" v-model="query.userName" placeholder="住户名" size="mini" class="handle-input mr10" style="width:90px;"></el-input>
                        </el-col>
                        <el-col :span="3">
                            栋号:
                            <el-input type="text" v-model="query.buildingID" placeholder="栋号" size="mini" class="handle-input mr10" style="width:60px;"></el-input>
                        </el-col>
                        <el-col :span="3">
                            户号:
                            <el-input type="text" v-model="query.familyID" placeholder="户号" size="mini" class="handle-input mr10" style="width:60px;"></el-input>
                        </el-col>
                        <el-col :span="6">
                            身份证号:
                            <el-input type="text" v-model="query.userID" placeholder="身份证号" size="mini" class="handle-input mr10" style="width:150px;"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>
                        </el-col>
                    </el-row>
                <!--<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--</el-select>-->
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
        <div class="container">
            <el-table
                    :data="residentData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                    border
                    header-cell-class-name="table-header"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="姓名">
                                    <span>{{ props.row.userName}}</span>
                                </el-form-item>
                                <br>
                                <el-form-item label="身份证号">
                                    <span>{{ props.row.userID}}</span>
                                </el-form-item>
                                <br>
                                <el-form-item label="位置">
                                    <span>{{ props.row.buildingID }}栋{{props.row.familyID}}户</span>
                                </el-form-item>
                                <br>
                                <el-form-item label="状态">
                                    <span>{{ getState(props.row.state) }}</span>
                                </el-form-item>
                                <br>
                                <el-form-item label="家庭成员">
                                    <span v-on:click="handlenameJump(person)" v-for="person in props.row.familyName">{{ person }} </span>
                                </el-form-item>
                                <br>
                                <el-form-item label="联系方式">
                                    <span>{{ props.row.phone }}</span>
                                </el-form-item>
                            </el-form>
                        </el-form>
                    </template>
                </el-table-column>
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="userName" label="姓名"></el-table-column>
                <el-table-column prop="userID" label="身份证号"></el-table-column>
                <el-table-column prop="buildingID" label="栋号"></el-table-column>
                <el-table-column prop="familyID" label="户号"></el-table-column>
                <el-table-column prop="state" label="状态" align="center"
                                 :filters="[{value:'1',text:'健康'},{value:'2',text:'隔离'},{value:'3',text:'疑似'},{value:'4',text:'确诊'},{value:'5',text:'死亡'}]"
                                 :filter-method="filterState"
                                 filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="getState(scope.row.state)==='健康'?'success':
                                (getState(scope.row.state)==='确诊'?'danger':
                                (getState(scope.row.state)==='死亡'?'info':
                                (getState(scope.row.state)==='疑似'?'warning':'')
                                ))"
                        >{{getState(scope.row.state)}}</el-tag>
                    </template>

                </el-table-column>

<!--                <el-table-column prop="duration" label="隔离期限"></el-table-column>-->
<!--                <el-table-column prop="beginning" label="开始时间"></el-table-column>-->
                <el-table-column prop="phone" label="联系方式"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <!--<el-button-->
                                <!--type="text"-->
                                <!--icon="el-icon-delete"-->
                                <!--class="red"-->
                                <!--@click="handleDelete(scope.$index, scope.row)"-->
                        <!--&gt;删除</el-button>-->
                    </template>
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
        </div>
            </el-col>
        </el-row>


        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                    <span>{{form.userName}}</span>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.state">
                        <el-option
                                v-for="item in stateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <!--<el-cascader :options="options" v-model="form.state"></el-cascader>-->
                </el-form-item>
                <!--<el-form-item label="期限">-->
                    <!--<el-input-number v-model="form.duration" :step="1"></el-input-number>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="描述">-->
                    <!--<el-input v-model="form.description"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchResidentData } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {

                stateList:[{id:'1',name:'健康'},{id:'2',name:'隔离'},{id:'3',name:'疑似'},{id:'4',name:'确诊'},{id:'5',name:'死亡'}],
                query: {
                    userID:'',
                    userName: '',
                    buildingID : '',
                    familyID: '',
                },
                pageIndex: 1,
                pageSize: 5,
                residentData:[],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                delVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.handleSearch();
            },
            getState(value){
                let list=this.stateList.filter(x=>x.id === value);
                if(list && list.length>0)
                    return list[0].name;
            },
            filterState(value, row) {
                return row.state === value;
            },
            // 触发搜索按钮
            handleSearch() {
                // this.$set(this.pageIndex, 1);
                console.log(JSON.stringify(this.query));
                this.$axios.post(
                    '/viewUserInfo'
                    ,JSON.stringify(this.query)
                )
                    .then(response=> {
                        console.log(response);
                        let res=response.data;
                        if(res.result=='0'){
                            this.residentData=res.info;
                            this.pageTotal = res.pageTotal;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.pageIndex=1;
                // this.getData();
            },
            // 触发跳转
            handlenameJump(value) {
                this.query={
                    userID:'',
                    userName: value,
                    buildingID: '',
                    familyID: '',
                };
                this.handleSearch();
                // this.getData();
            },

            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },

            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = JSON.parse(JSON.stringify(row));
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                console.log(JSON.stringify({userID:this.form.userID,adminID:localStorage.getItem("adminID"),
                    state:this.form.state}));
                this.$axios.post("/HealthStateChange",
                    JSON.stringify({userID:this.form.userID,adminID:localStorage.getItem("adminID"), state:this.form.state})
                )
                    .then((response)=> {
                        console.log(response);
                        let res=response.data;
                        if(res.result=='0'){
                            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            this.handleSearch();
                        }
                        if(res.result=='-2'){
                            this.$message.error(`Mysql执行失败`);
                        }
                        if(res.result=='1001'){
                            this.$message.error(`用户id不存在`);
                        }
                        if(res.result=='1004'){
                            this.$message.error(`管理员无权限进行修改`);
                        }
                        if(res.result=='1006'){
                            this.$message.error(`管理员id不存在`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 分页导航
            handlePageChange(val) {
                this.pageIndex=val;
            }
        }
    };
</script>

<style scoped>

    .pre-img{
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input {
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }

    .demo-table-expand .el-form-item {

        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .handle-box {
        margin-bottom: 5px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .grid-content {
        font-size: 12px;
        background-color: #242f42;
        color: #d3dce6;

    }
    /*.demo-table-expand .el-form-item {*/
    /*margin-right: 0;*/
    /*margin-bottom: 0;*/
    /*width: 50%;*/
    /*}*/
</style>
