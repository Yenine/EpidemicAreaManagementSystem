<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.userid" placeholder="userID">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <span v-on:click="ToRegister">没有账号？马上注册</span>
            </el-form>
        </div>
        <el-dialog title="注册" :visible.sync="registerVisible" width="25%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                    <el-col :span="18">
                        <el-input v-model="form.userName" placeholder="username"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份ID">
                    <el-col :span="18">
                        <el-input v-model="form.userID" placeholder="userID"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码">
                    <el-col :span="18">
                        <el-input type="password" v-model="form.password" placeholder="password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-col :span="18">
                        <el-input v-model="form.phone" placeholder="phonenumber"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="管理栋号">
                    <el-col :span="18">
                        <el-input v-model="form.buildingID" placeholder="XX_XX_XX"></el-input>
                    </el-col>

                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="registerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitRegister">注册</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                userid: '',
                password: '',
                role:true,
            },
            rules: {
                userid: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
            registerVisible:false,
            form:{
                userID:'',
                userName:'',
                password:'',
                phone:'',
                buildingID:''
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    console.log(JSON.stringify({
                        userID:this.param.userid,
                        password:this.param.password,
                        isAdmin: '1'
                    }));
                    this.$axios.post('/login',
                        {
                            userID: this.param.userid,
                            password: this.param.password,
                            isAdmin: '1'
                        }
                    )
                        .then( (response)=> {
                            console.log(response);
                            if(response.data.result=='0'){

                                this.$message.success('登录成功');
                                localStorage.setItem("adminID", this.param.userid );
                                localStorage.setItem('ms_username', response.data.userName);
                                this.$router.replace('/dashboard');
                            }
                            if(response.data.result=='1001'){
                                this.$message.error('该身份证账号尚未注册');
                            }
                            if(response.data.result=='1002'){
                                this.$message.error('登录密码错误');
                            }
                            if(response.data.result=='1003'){
                                this.$message.error('数据库数据有误');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        ToRegister(){
            this.registerVisible=true;
        },

        submitRegister() {
            this.registerVisible = false;

            console.log(JSON.stringify(this.form));
            this.$axios.post("/adminRegister",JSON.stringify(this.form))
                .then((response)=> {
                    console.log(response);
                    let res=response.data;
                    if(res.result=='0'){
                        this.$message.success('注册成功');
                    }
                    if(res.result=='-2'){
                        this.$message.error('执行失败');
                    }
                    if(res.result=='1000'){
                        this.$message.error('该身份证已被注册过');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>