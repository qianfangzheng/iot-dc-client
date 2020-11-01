<template>
    <div class="container">
        <div class="header">
            <el-col :span="4" class="header_item">
                <img class="logo" src="/images/logo/logo.png">
            </el-col>
            <el-col :span="16" class="header_item">
                <el-menu class="menu"
                         :default-active="this.$route.path"
                         mode="horizontal"
                         :router=true>
                    <el-menu-item index="/home"><span class="el-icon-menu"/>首页</el-menu-item>
                    <el-menu-item index="/driver">驱动</el-menu-item>
                    <el-menu-item index="/driverAttribute">驱动属性</el-menu-item>
                    <el-menu-item index="/pointAttribute">位号属性</el-menu-item>
                    <el-menu-item index="/profile">模板</el-menu-item>
                    <el-menu-item index="/driverInfo">驱动配置</el-menu-item>
                    <el-menu-item index="/point">位号</el-menu-item>
                    <el-menu-item index="/group">分组</el-menu-item>
                    <el-menu-item index="/device">设备</el-menu-item>
                    <el-menu-item index="/pointInfo">位号配置</el-menu-item>
                    <el-menu-item index="/pointValue">数据</el-menu-item>
                    <!--<el-menu-item index="/now">实时</el-menu-item>
                    <el-menu-item index="/history">历史</el-menu-item>
                    <el-menu-item index="/video">视频</el-menu-item>
                    <el-menu-item index="/alarm">报警</el-menu-item>
                    <el-menu-item index="/setting">设置</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>-->
                </el-menu>
            </el-col>
            <el-col :span="2" class="header_item">
                <el-badge :value="12" :max="99" class="badge_item" type="primary">
                    <span class="span_small" @click="handleMessage">消息</span>
                </el-badge>
            </el-col>
            <el-col :span="2" class="header_item">
                <el-dropdown class="avatar_item" @command="handleCommand">
                    <span class="el-dropdown-link">
                        <el-avatar>
                            <img src="/images/common/avatar.png">
                        </el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                        <el-dropdown-item command="help">帮助</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span class="span_small avatar">管理员</span>
            </el-col>
        </div>
        <div class="body">
            <GeminiScrollbar>
                <router-view/>
            </GeminiScrollbar>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {};
        },
        created() {
        },
        methods: {
            handleMessage() {
                this.$message('click on message');
            },
            handleCommand(command) {
                if (command === 'logout') {
                    this.$store.dispatch('ClearToken').then((res) => {
                        if (res.ok) {
                            this.$router.push('/login');
                        }
                    });
                } else {
                    this.$message('click on item ' + command);
                }
            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        min-width: 1366px;
        min-height: 768px;
    }

    .container {
        color: #2c3e50;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    .header {
        top: 0;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #dcdfe6;
    }

    .header_item {
        height: 100%;
    }

    .logo {
        height: 60px;
        margin-left: 10px;
    }

    .menu {
        display: flex;
        justify-content: center;
        border-bottom: none !important;
    }

    .menu .el-menu-item {
        font-size: 15px;
    }

    .badge_item {
        top: 25px;
        cursor: pointer;
        margin-right: 40px;
    }

    .span_small {
        color: #909399;
        font-size: 14px;
    }

    .span_small.avatar {
        margin: 20px 10px;
    }

    .avatar_item {
        top: 10px;
        cursor: pointer;
    }

    .body {
        top: 60px;
        right: 0;
        left: 0;
        bottom: 0;
        padding: 4px 1px 4px 4px;
        position: absolute;
        background: #f0f2f5;
    }
</style>


