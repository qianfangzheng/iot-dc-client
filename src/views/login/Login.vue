<template>
    <div class="login-container">
        <div class="login-wrapper-left animated bounceInDown">
            <div class="login-left">
                <img class="img" src="/images/logo/logo-white.png">
            </div>
        </div>
        <particles/>
        <div class="login-wrapper-right animated bounceInDown">
            <div class="login-border">
                <div class="login-main">
                    <h4 class="login-title">
                        Demo Application
                    </h4>
                    <p style="text-align: center;">基于 DC3 接口开发的 demo 应用，仅供演示和测试用途!</p>
                    <el-form class="login-form"
                             status-icon
                             :rules="loginRules"
                             ref="loginForm"
                             :model="loginForm"
                             label-width="0">
                        <el-form-item prop="name">
                            <el-input size="small"
                                      @keyup.enter.native="handleLogin"
                                      v-model="loginForm.name"
                                      auto-complete="off"
                                      placeholder="请输入用户名">
                                <i slot="prefix" class="el-icon-user"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input size="small"
                                      @keyup.enter.native="handleLogin"
                                      :type="passwordType"
                                      v-model="loginForm.password"
                                      auto-complete="off"
                                      placeholder="请输入密码">
                                <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
                                <i slot="prefix" class="el-icon-lock"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                       size="small"
                                       @click.native.prevent="handleLogin"
                                       class="login-submit">登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import particles from "@/components/particles/particles";

    export default {
        name: "login",
        components: {particles},
        data() {
            return {
                loginForm: {
                    name: "pnoker",
                    password: "dc3dc3dc3"
                },
                loginRules: {
                    name: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 1, message: "密码长度最少为6位", trigger: "blur"}
                    ]
                },
                passwordType: "password"
            };
        },
        methods: {
            showPassword() {
                this.passwordType === ""
                    ? (this.passwordType = "password")
                    : (this.passwordType = "");
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let loading = this.$loading({
                            lock: true,
                            text: '登录中,请稍后。。。',
                            spinner: "el-icon-loading"
                        });
                        this.$store.dispatch("GenerateSalt", this.loginForm.name).then((salt) => {
                            this.$store.dispatch("GenerateToken", {salt, user: this.loginForm}).then(() => {
                                this.$router.push({path: '/'}).then(() => loading.close());
                            }).catch(() => {
                                loading.close();
                            });
                        }).catch(() => {
                            loading.close();
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss">
    @import "~@/assets/styles/login.scss";
</style>
