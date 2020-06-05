
<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 信息公开</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="announcement" :show-header="false" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="公告标题">
                                <span>{{ props.row.title }}</span>
                            </el-form-item>
                            <br>
                            <el-form-item label="公告内容">
                                <span>{{ props.row.content }}</span>
                            </el-form-item>
                            <br>
                            <el-form-item label="发布日期">
                                <span>{{ props.row.date }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <span class="message-title">{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="类型" align="center"
                                 :filters="[{ text: '重要', value: '重要' },{ text: '普通', value: '普通' }]"
                                 :filter-method="filterState"
                                 filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.state==='普通'?'success':'danger'"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" width="180"></el-table-column>
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="handle-row">
                <el-button type="info"  @click="handleAdd()">添加公告</el-button>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="form.state">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
<!--                    <el-cascader :options="options" v-model="form.state"></el-cascader>-->
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" autosize v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="40%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="form.state">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--                    <el-cascader :options="options" v-model="form.state"></el-cascader>-->
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" autosize v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchAnnounceData } from '../../api/index';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                editVisible: false,
                addVisible: false,
                announcement:[],
                example:{
                    "title": "通知!",
                    "content": "无证不允许进入。\n",
                    "state": "重要",
                    "date": "2019-11-1"
                },

                form: {},
                idx: -1,
                options:[
                    {
                        value:"重要",
                        label:"重要"
                    },
                    {
                        value:"普通",
                        label:"普通"
                    }
                ],
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                // this.$axios.get('/announcementData.json').then((res)=>{
                //     console.log(res);
                //     this.announcement=res.data.list;
                //     this.pageTotal = res.data.pageTotal
                // })
                this.$axios.get('/GetAllAnnouncement').then((response)=>{
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.announcement=res.list;
                        this.pageTotal = res.pageTotal;
                    }
                    if(res.result=='-2'){
                        this.$message.error('MYSQL执行失败');
                    }
                    if(res.result=='1003'){
                        this.$message.error('数据库有问题');
                    }
                })
            },
            filterState(value, row) {
                return row.state === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.form = JSON.parse(JSON.stringify(row));
                this.editVisible = true;
            },
            handleAdd() {
                this.idx = this.announcement.length;
                this.form = JSON.parse(JSON.stringify(this.example));
                this.addVisible = true;
            },
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {

                        console.log(JSON.stringify({id:row.id}));
                        this.$axios.post('/deleteAnnouncement',JSON.stringify({id:row.id}))
                            .then((response)=> {
                                console.log(response);
                                let res=response.data;
                                if(res.result=='0'){
                                    this.$message.success('删除成功');
                                    this.getData();
                                }
                                if(res.result=='-2'){
                                    this.$message.error('MYSQL执行失败');
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        this.announcement.splice(index, 1);
                    })
                    .catch(() => {});

            },
            saveAdd() {
                this.addVisible = false;
                let date=new Date();
                this.form.date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                console.log(JSON.stringify(this.form));
                this.$axios.post("/newAnnouncement",JSON.stringify(this.form))
                    .then((response)=> {
                        console.log(response);
                        let res=response.data;
                        if(res.result=='0'){
                            this.$message.success(`添加成功`);
                            this.getData();
                        }
                        if(res.result=='-2'){
                            this.$message.error(`执行失败`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            saveEdit() {
                this.editVisible = false;

                // this.$message.success(`修改第 ${this.idx + 1} 条成功`);
                // this.$set(this.announcement, this.idx, this.form);

                console.log(JSON.stringify(this.form));
                this.$axios.post("/modifyAnnouncement",JSON.stringify(this.form))
                    .then((response)=> {
                        console.log(response);
                        let res=response.data;
                        if(res.result=='0'){
                            this.$message.success(`修改第 ${this.idx + 1} 条成功`);
                            this.$set(this.announcement, this.idx, this.form);
                        }
                        if(res.result=='-2'){
                            this.$message.error(`执行失败`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                // this.$set(this.tableData, this.idx, this.form);
            },
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.add-button{
    background: #1f2f3d;
}
.handle-row{
    margin-top: 30px;
}
</style>

