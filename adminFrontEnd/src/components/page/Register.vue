<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管理员注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <span>用户名</span>
                    <el-input v-model="param.userid" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>

                </el-form-item>>
                <el-form-item prop="role">
                    <el-switch
                        style="display: block"
                        v-model="param.role"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="管理员"
                        inactive-text="开发者">
                    </el-switch>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                userid: 'admin',
                password: '123123',
                role:true,
            },
            rules: {
                userid: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    console.log(JSON.stringify({
                        user:this.param.userid,
                        password:this.param.password
                    }));
                    this.$axios.post('/login',{
                        user:this.param.userid,
                        password:this.param.password
                    }
                    )
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    this.$message.success('登录成功');
                    localStorage.setItem("adminID", this.param.userid );
                    localStorage.setItem('ms_username', this.param.userid);
                    localStorage.setItem('ms_role', this.param.role);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
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