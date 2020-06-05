<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
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
                                        >
                                </el-table-column>

                            </el-table>
                        </el-row>
                    </el-card>
                    <br>
                    <el-card shadow="hover" class=grid-content>
                        <el-row>
                            防护用具
                        </el-row>
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
                                >
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card shadow="hover" class=grid-content>
                        <el-row>
                            物资申请
                        </el-row>
                        <el-table
                            :data="applyData"
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                            row-key="version"
                            @selection-change="handleSelectionChange"
                            >
                            <el-table-column prop="name" label="物资名称"></el-table-column>
                            <el-table-column prop="position" label="住户位置"></el-table-column>
                            <el-table-column prop="amount" label="需求量"></el-table-column>
                            <el-table-column prop="description" label="说明" width="150"></el-table-column>

                            <el-table-column prop="state" label="状态" align="center"
                                             :filters="[{ text: '待审核', value: '待审核' }, { text: '未通过', value: '未通过' }, { text: '已通过', value: '已通过' }]"
                                             :filter-method="filterState"
                                             filter-placement="bottom-end">
                                <template slot-scope="scope">
                                    <el-tag
                                            :type="scope.row.state==='已通过'?'success':(scope.row.state==='未通过'?'danger':'')"
                                    >{{scope.row.state}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="申请时间"></el-table-column>
                            <el-table-column label="操作"  align="center">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.state==='待审核'">
                                        <el-button
                                                type="text"
                                                icon="el-icon-circle-check"
                                                @click="handleEdit(scope.$index, scope.row)"
                                        >批准</el-button>
                                        <el-button
                                                type="text"
                                                icon="el-icon-circle-close"
                                                class="red"
                                                @click="handleDelete(scope.$index, scope.row)"
                                        >驳回</el-button>
                                    </template>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>

            <!--<el-table>-->
                <!--:data="applyData"-->
                <!--class="table"-->
                <!--ref="multipleTable"-->
                <!--header-cell-class-name="table-header"-->
                <!--@selection-change="handleSelectionChange"-->
            <!--&gt;-->
                <!--<el-table-column type="expand">-->
                    <!--<template slot-scope="props">-->
                        <!--<el-form label-position="left" inline class="demo-table-expand">-->
                            <!--<el-form-item label="物资名称">-->
                                <!--<span>{{ props.row.name }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="住户位置">-->
                                <!--<span>{{ props.row.position }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="需求量">-->
                                <!--<span>{{ props.row.amount }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="分类">-->
                                <!--<span>{{ props.row.category }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="标签">-->
                                <!--<el-tag v-for="tag in props.row.tags" type="info">{{ tag }}</el-tag>-->

                            <!--</el-form-item>-->
                            <!--<el-form-item label="应用描述">-->
                                <!--<span>{{ props.row.desc }}</span>-->
                            <!--</el-form-item>-->
                        <!--</el-form>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <!--<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
                <!--<el-table-column prop="name" label="应用名"></el-table-column>-->
                <!--<el-table-column prop="version" label="版本号"></el-table-column>-->
                <!--<el-table-column label="类别">-->
                    <!--<template slot-scope="scope">{{scope.row.category}}</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="图标" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-image-->
                            <!--class="table-td-thumb"-->
                            <!--:src="scope.row.thumb"-->
                            <!--:preview-src-list="[scope.row.thumb]"-->
                        <!--&gt;</el-image>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="developer" label="开发者"></el-table-column>-->

                <!--<el-table-column prop="state" label="状态" align="center"-->
                                 <!--:filters="[{ text: '待审核', value: '待审核' }, { text: '未通过', value: '未通过' }, { text: '已通过', value: '已通过' }]"-->
                                 <!--:filter-method="filterState"-->
                                 <!--filter-placement="bottom-end">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-tag-->
                                <!--:type="scope.row.state==='已通过'?'success':(scope.row.state==='未通过'?'danger':'')"-->
                        <!--&gt;{{scope.row.state}}</el-tag>-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <!--&lt;!&ndash;<el-table-column label="状态" align="center">&ndash;&gt;-->
                    <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-tag&ndash;&gt;-->
                            <!--&lt;!&ndash;:type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"&ndash;&gt;-->
                        <!--&lt;!&ndash;&gt;{{scope.row.state}}</el-tag>&ndash;&gt;-->
                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

                <!--<el-table-column prop="date" label="上传时间"></el-table-column>-->
                <!--<el-table-column label="操作" width="180" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<template v-if="scope.row.state==='待审核'">-->
                        <!--<el-button-->
                            <!--type="text"-->
                            <!--icon="el-icon-circle-check"-->
                            <!--@click="handleEdit(scope.$index, scope.row)"-->
                        <!--&gt;批准</el-button>-->
                        <!--<el-button-->
                            <!--type="text"-->
                            <!--icon="el-icon-circle-close"-->
                            <!--class="red"-->
                            <!--@click="handleDelete(scope.$index, scope.row)"-->
                        <!--&gt;驳回</el-button>-->
                        <!--</template>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <span>确认通过？</span>
                <!--<el-form-item label="用户名">-->
                    <!--<el-input v-model="form.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="地址">-->
                    <!--<el-input v-model="form.address"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="delVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <span>确认不通过？</span>
                <el-form-item label="修改意见">
                <el-input v-model="form.advice"></el-input>
                </el-form-item>
                <!--<el-form-item label="地址">-->
                <!--<el-input v-model="form.address"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveDel">确 定</el-button>
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
            suppliesData:[],
            applyData:[],
            tableData: [],
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
            fetchSuppliesData(this.query).then(res => {
                console.log(res);
                this.suppliesData = res.list;
            });
            fetchApplyData(this.query).then(res => {
                console.log(res);
                this.applyData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // getData() {
        //     // fetchSuppliesData(this.query).then(res => {
        //     //     console.log(res);
        //     //     this.suppliesData = res.list;
        //     // });
        //     fetchData1(this.query).then(res => {
        //         console.log(res);
        //         this.tableData = res.list;
        //         this.pageTotal = res.pageTotal || 50;
        //     });
        // },
        filterState(value, row) {
            return row.state === value;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            // this.$confirm('确定要删除吗？', '提示', {
            //     type: 'warning'
            // })
            //     .then(() => {
            //         this.$message.success('删除成功');
            //         this.tableData.splice(index, 1);
            //     })
            //     .catch(() => {});
            this.idx = index;
            this.form = row;
            this.delVisible = true;
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
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        saveDel() {
            this.delVisible = false;
            this.$message.success(`驳回第 ${this.idx + 1} 行成功`);
            this.form.state='未通过';
            this.$set(this.tableData, this.idx, this.form);

            console.log(JSON.stringify({id:this.form.id,state:"未通过",advice:this.form.advice}));
            this.$axios.post("",{id:this.form.id,state:"未通过",advice:this.form.advice})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`通过第 ${this.idx + 1} 行成功`);
            this.form.state='已通过';
            this.$set(this.tableData, this.idx, this.form);

            console.log(JSON.stringify({id:this.form.id,state:"已通过"}));
            this.$axios.post("",{id:this.form.id,state:"已通过"})
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
