<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 物资管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-card shadow="hover" class=grid-content>
                        <el-row>
                            防护用具
                        </el-row>
                        <br>
                        <el-row>
                            <el-table

                                    :data="suppliesData">
                                <el-table-column
                                        prop="name"
                                        label="物资名称"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="remain"
                                        label="剩余量"
                                        width="60"
                                        >
                                </el-table-column>
                                <el-table-column
                                        label="操作" width="100" align="center">
                                    <template slot-scope="scope">
                                        <el-button
                                                type="text"
                                                icon="el-icon-edit"
                                                @click="handleSupplies(scope.$index, scope.row)"
                                        >修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <div class="handle-row">
                            <el-button type="info"  @click="handleAdd()">添加</el-button>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card shadow="hover" class=grid-content>
                        <el-row>
                            物资申请
                        </el-row>
                        <br>
                        <el-table
                            :data="applyData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                            row-key="version"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column prop="equipmentName" label="物资名称"></el-table-column>
                            <el-table-column prop="userID" label="住户ID"></el-table-column>
                            <el-table-column prop="amount" label="需求量"></el-table-column>
                            <el-table-column prop="applyID" label="订单号" width="150"></el-table-column>

                            <el-table-column prop="state" label="状态" align="center"
                                             :filters="[{value:'0',text:'已驳回'},{value:'1',text:'已同意'},{value:'2',text:'未处理'}]"
                                             :filter-method="filterState"
                                             filter-placement="bottom-end">
                                <template slot-scope="scope">
                                    <el-tag
                                            :type="getState(scope.row.state)==='已同意'?'success':(getState(scope.row.state)==='已驳回'?'danger':'')"
                                    >{{getState(scope.row.state)}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="申请时间"></el-table-column>
                            <el-table-column label="操作"  align="center">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.state==='2'">
                                        <el-button
                                                type="text"
                                                icon="el-icon-circle-check"
                                                @click="handleApprove(scope.$index, scope.row)"
                                        >批准</el-button>
                                        <el-button
                                                type="text"
                                                icon="el-icon-circle-close"
                                                class="red"
                                                @click="handleReject(scope.$index, scope.row)"
                                        >驳回</el-button>
                                    </template>
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
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!-- 物资添加弹出框 -->
        <el-dialog title="添加物资" :visible.sync="addVisible" width="20%">
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="名称">
                    <el-input v-model="form.equipmentName " ></el-input>
                </el-form-item>
                <el-form-item label="余量">
                    <el-input-number v-model="form.storage" :step="10"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
        </el-dialog>
        <!-- 物资编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="suppliesVisible" width="20%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="名称">
                    <span>{{form.name}}</span>
<!--                    <el-input v-model="form.name"></el-input>-->
                </el-form-item>
                <el-form-item label="修改量">
                    <el-input-number v-model="form.change" :step="1"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="suppliesVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveSupplies">确 定</el-button>
                </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="批准" :visible.sync="approveVisible" width="30%">
            <el-form ref="form" :model="replyform" label-width="70px">
                <el-form-item>
                    <span>确认通过？</span>
                </el-form-item>
                <el-form-item label="回执">
                    <el-input v-model="replyform.reply"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="approveVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveApprove">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="驳回" :visible.sync="rejectVisible" width="30%">
            <el-form ref="form" :model="replyform" label-width="70px">
                <el-form-item>
                    <span>确认不通过？</span>
                </el-form-item>
                <el-form-item label="回执">
                    <el-input v-model="replyform.reply"></el-input>
                </el-form-item>
                <!--<el-form-item label="地址">-->
                <!--<el-input v-model="form.address"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveReject">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchSuppliesData } from '../../api/index';
import { fetchApplyData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                category: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            stateList:[{id:'0',name:'已驳回'},{id:'1',name:'已同意'},{id:'2',name:'未处理'}],
            suppliesData:[],
            applyData:[],
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            approveVisible: false,
            suppliesVisible: false,
            rejectVisible: false,

            pageTotal: 0,
            pageIndex: 1,
            pageSize: 5,

            form: {},
            replyform:{
                adminID:0,
                applyID:0,
                result:0,
                reply:'',
                date:''
            },
            example:{
                equipmentName:'',
                storage:0
            },
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
            // fetchSuppliesData(this.query).then(res => {
            //     console.log(res);
            //     this.suppliesData = res.list;
            // });
            // fetchApplyData(this.query).then(res => {
            //     console.log(res);
            //     this.applyData = res.applyInfo;
            //     this.pageTotal = res.pageTotal || 50;
            // });
            //获取申请列表
            this.$axios.post("/getApplyEquipment",JSON.stringify({adminID:localStorage.getItem('adminID')}))
                .then(response=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.applyData = res.applyInfo;
                        this.pageTotal = res.applyNum ;
                    }
                    if(res.result=='-2'){
                        this.$message.error(`执行失败`);
                    }
                    if(res.result=='1001'){
                        this.$message.error(`该管理员id尚未注册`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            //获取物资列表
            this.$axios.get("/GetAllEquipment")
                .then(response=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.suppliesData = res.list;
                        // this.pageTotal = response.applyNum || 50;
                    }
                    if(res.result=='-2'){
                        this.$message.error(`执行失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

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
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        handleAdd() {
            this.idx = this.suppliesData.length;
            this.form = JSON.parse(JSON.stringify(this.example));
            this.addVisible = true;
        },
        // 编辑操作
        handleSupplies(index, row) {
            this.idx = index;
            this.form = JSON.parse(JSON.stringify(row));
            this.suppliesVisible = true;
        },
        // 批准操作
        handleApprove(index, row) {
            this.idx = index;
            this.form=row;

            this.replyform.applyID= row.applyID;
            this.approveVisible = true;
        },
        // 驳回操作
        handleReject(index, row) {
            // this.$set(this.reply, 'applyID', 1);
            this.idx = index;
            this.form=row;

            this.replyform.applyID= row.applyID;
            this.rejectVisible = true;
        },
        saveReject() {
            this.rejectVisible = false;
            // this.$message.success(`驳回第 ${this.idx + 1} 行成功`);
            this.replyform.result='0';
            let date=new Date();
            this.replyform.date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            this.replyform.adminID=localStorage.getItem("adminID");

            // //成功
            // this.form.state='0';
            console.log(JSON.stringify(this.replyform));
            this.$axios.post("/handleApplication",this.replyform)
                .then(response=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.form.state='0';
                    }
                    if(res.result=='0'){
                        this.$message.success(`驳回第 ${this.idx + 1} 行成功`);
                    }
                    if(res.result=='1001'){
                        this.$message.error(`订单ID不存在`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 保存编辑
        saveSupplies() {
            this.suppliesVisible = false;
            let str=String(this.form.change);
            if(this.form.change>0){
                str="+"+str;
            }
            console.log(JSON.stringify({equipmentID:this.form.id,storageChange:str}));
            this.$axios.post("/modifyEquipment",JSON.stringify({equipmentID:this.form.id,storageChange:str}))
                .then( (response)=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.getData();
                    }
                    if(res.result=='-2'){
                        this.$message.error(`执行失败`);
                    }
                    if(res.result=='1001'){
                        this.$message.error(`该物资id尚未注册`);
                    }
                    if(res.result=='1007'){
                        this.$message.error(`该物资余量不足`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        saveAdd() {
            this.addVisible = false;

            // this.$message.success(`添加成功`);
            // this.$set(this.tableData, this.idx, this.form);

            this.form.storage=String(this.form.storage);
            console.log(JSON.stringify(this.form));
            this.$axios.post("/newEquipment",JSON.stringify(this.form))
                .then((response)=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result==='0'){
                        this.$message.success(`添加成功`);
                        this.getData()
                    }
                    if(res.result==='-2'){
                        this.$message.error(`Mysql执行失败`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 保存编辑
        saveApprove() {
            this.approveVisible = false;
            // this.$message.success(`通过第 ${this.idx + 1} 行成功`);
            this.replyform.result='1';
            let date=new Date();
            this.replyform.date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

            this.replyform.adminID=localStorage.getItem("adminID");

            // //成功
            // this.form.state='1';

            console.log(JSON.stringify(this.replyform));
            this.$axios.post("/handleApplication",this.replyform)
                .then((response)=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result==='0'){
                        this.$message.success(`通过第 ${this.idx + 1} 行成功`);
                        this.form.state='1';
                    }
                    if(res.result==='-2'){
                        this.$message.error(`Mysql执行失败`);
                    }
                    if(res.result==='1001'){
                        this.$message.error(`订单ID不存在`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex=val;
            // this.$set(this.query, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {

        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.grid-content {
    background-color: #242f42;
    color: #d3dce6;
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
/*.demo-table-expand .el-form-item {*/
    /*margin-right: 0;*/
    /*margin-bottom: 0;*/
    /*width: 50%;*/
/*}*/
</style>
