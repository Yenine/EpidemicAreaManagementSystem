<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 隔离状况
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<el-row>-->
            <!--<el-col :span="20">-->
                <!--<div class=grid-content style="padding: 10px">-->
                    <!--<el-row :gutter="6">-->
                        <!--<el-col :span="4">-->
                            <!--住户名:-->
                            <!--<el-input v-model="query.name" placeholder="住户名" size="mini" class="handle-input mr10" style="width:90px;"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="3">-->
                            <!--栋号:-->
                            <!--<el-input type="text" v-model="query.buildingID" placeholder="栋号" size="mini" class="handle-input mr10" style="width:120px;"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="3">-->
                            <!--户号:-->
                            <!--<el-input type="text" v-model="query.familyID" placeholder="户号" size="mini" class="handle-input mr10" style="width:120px;"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="6">-->
                            <!--手机号:-->
                            <!--<el-input v-model="query.number" placeholder="手机号" size="mini" class="handle-input mr10" style="width:150px;"></el-input>-->
                        <!--</el-col>-->
                        <!--<el-col :span="4">-->
                            <!--<el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">搜索</el-button>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--&lt;!&ndash;<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-option key="1" label="广东省" value="广东省"></el-option>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-option key="2" label="湖南省" value="湖南省"></el-option>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                <!--</div>-->
            <!--</el-col>-->
        <!--</el-row>-->

        <el-row>
            <el-col :span="20">
        <div class="container">
            <el-table
                    :data="segregationData.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    row-key="version"
                    @selection-change="handleSelectionChange"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="position" label="位置"></el-table-column>
<!--                <el-table-column prop="buildingId" label="栋"></el-table-column>-->
<!--                <el-table-column prop="familyId" label="户"></el-table-column>-->

<!--                <el-table-column prop="state" label="状态" align="center"-->
<!--                                 :filters="[{ text: '已确诊', value: '已确诊' }, { text: '隔离中', value: '隔离中' }]"-->
<!--                                 :filter-method="filterState"-->
<!--                                 filter-placement="bottom-end">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                                :type="scope.row.state==='已上架'?'success':(scope.row.state==='已确诊'?'danger':'')"-->
<!--                        >{{scope.row.state}}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column prop="beginDate" label="开始时间"></el-table-column>
                <el-table-column prop="endDate" label="结束时间"></el-table-column>
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
                <el-form-item label="结束时间">
                    <el-date-picker
                            v-model="form.endDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                    >

                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="描述">-->
                    <!--<el-input v-model="form.description"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </el-dialog>


        <el-dialog title="编辑" :visible.sync="lowerVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <span>确认下架？</span>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="lowerVisible = false">取 消</el-button>
                <el-button type="primary" @click="reqLower">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchSegregationData } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                options: [
                    {
                        value: '隔离中',
                        label: '隔离中'
                    },
                    {
                        value: '已确诊',
                        label: '已确诊'
                    },
                ],
                query: {
                    name: '',
                    buildingID : '',
                    familyID: '',
                    pageIndex: 1,
                    pageSize: 5
                },
                pageIndex: 1,
                pageSize: 5,

                segregationData:[],
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                delVisible: false,
                upperVisible: false,
                lowerVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                pickerOptions:{
                    disabledDate(time){
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$axios.post('/QuarantineInformation',
                    JSON.stringify({type:"admin",userID:localStorage.getItem("adminID")}))
                    .then((response)=>{
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.segregationData = res.information;
                        this.pageTotal = res.pageTotal
                    }
                    if(res.result=='-2'){
                        this.$message.error('MYSQL执行失败');
                    }
                    if(res.result=='1001'){
                        this.$message.error('id不存在');
                    }
                });
                // fetchSegregationData(this.query).then(res => {
                //     console.log(res);
                //     this.segregationData = res.list;
                //     this.pageTotal = res.pageTotal || 3;
                // });
            },
            filterState(value, row) {
                return row.state === value;
            },
            // 触发搜索按钮
            handleSearch() {
                this.pageIndex=1;
                // this.$set(this.query, 'pageIndex', 1);
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
                let date=row.beginDate;
                console.log(date);
                date=date.replace(/-/g, '/');
                this.pickerOptions={
                    disabledDate(time){
                        return time.getTime() < new Date(date);
                    }
                }
            },
            saveDel() {
                this.delVisible = false;
                this.$message.success(`驳回第 ${this.idx + 1} 行成功`);
                this.form.state='未通过';
                this.$set(this.tableData, this.idx, this.form);
                // this.$set(this.tableData, this.idx, this.form);
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                // this.$set(this.tableData, this.idx, this.form);

                console.log(JSON.stringify({userID:this.form.userId,adminID:localStorage.getItem("adminID"),endDate:this.form.endDate}));
                this.$axios.post("QuarantineStatChange",
                    JSON.stringify({userID:this.form.userId,adminID:localStorage.getItem("adminID"),endDate:this.form.endDate}))
                    .then((response)=> {
                        console.log(response);
                        let res=response.data;
                        if(res.result=='0'){
                            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                            this.getData();
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
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                // this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                // this.$set(this.pageIndex, val);
                this.pageIndex=val;
                this.getData();
            },
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.form.thumb;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
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
