<template>
    <div class="card_title">
        <el-card shadow="hover">
            <div slot="header">
                <span>{{title}}</span>
            </div>
            <div class="text item">
                <slot/>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "title-card",
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss">
    .card_title {
        padding: 2px 3px;
        border-radius: 5px;
        box-sizing: border-box;

        .el-card {
            width: 100%;
            box-sizing: border-box;
        }

        .el-card__header {
            padding: 10px;
        }

        .el-card__body {
            padding: 10px;
        }

        &:first-child {
            padding-top: 0;
            padding-left: 0;
        }
    }
</style>
