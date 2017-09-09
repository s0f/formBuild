<template>
<div id="headerDefault">
    <header id="header" class="header">
        <div class="flex header-in">
            <div class="flex-item header-left">Simple Form Tools</div>
            <div class="flex-item header-center">
            </div>
            <div class="flex-item header-right">
                <div class="header-tools">
                    <span @click="dialogVisible = true">登录</span>
                </div>
            </div>
        </div>
    </header>
    <el-dialog title="登陆" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" custom-class="login-form">
        <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label="账号">
                <el-input placeholder="请输入账号" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>
</div>
</template>
<script>
export default {
    name: "headerDefault",
    data: () => ({
        dialogVisible: false,
        form: {
            name: '',
            password: ''
        }
    }),
    methods: {
        handleClose(done) {
            let self = this;
            this.$http.get('https://easy-mock.com/mock/5961e71e9adc231f357c229e/example/login')
                .then((res) => {
                    if (res.data.data.state) {
                        done();
                        self.$router.push({
                            name: 'list'
                        });
                    }
                });
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
