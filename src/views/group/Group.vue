<template>
    <el-col :span="24">
        <base-card>
            <avue-crud :option="listOption"
                       :data="listData"
                       :page="page"
                       :table-loading="loading"
                       ref="crud"
                       v-model="listForm"
                       @on-load="list"
                       @row-save="listAdd"
                       @row-del="listDelete"
                       @row-update="listUpdate"
                       @search-reset="searchReset"
                       @search-change="searchChange"
                       @refresh-change="refreshChange"
                       @size-change="sizeChange"
                       @current-change="currentChange"
            >
            </avue-crud>
        </base-card>
    </el-col>
</template>

<script>
    import {groupApi} from '@/api/manager'
    import {successMessage} from "@/util/util";

    export default {
        data() {
            return {
                query: {},
                listForm: {},
                listData: [],
                listOption: {
                    tip: false,
                    index: true,
                    stripe: true,
                    border: true,
                    height: 664,
                    align: 'center',
                    column: [
                        {
                            label: '分组',
                            prop: 'name',
                            span: 24,
                            search: true,
                            searchSpan: 24,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 分组名称',
                                    trigger: 'blur'
                                }, {
                                    min: 2,
                                    max: 32,
                                    message: '请输入 2~32 位字长的分组名称',
                                    trigger: 'blur'
                                }, {
                                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5-_]*$/,
                                    message: '请输入 正确格式的分组名称'
                                }
                            ]
                        }, {
                            label: '备注',
                            prop: 'description',
                            span: 24,
                            type: 'textarea',
                            overHidden: true,
                            rules: [
                                {
                                    max: 380,
                                    message: '最多输入380个字符',
                                    trigger: 'blur'
                                }
                            ]
                        }, {
                            label: '修改日期',
                            prop: 'updateTime',
                            span: 12,
                            disabled: true,
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss'
                        }, {
                            label: '创建日期',
                            prop: 'createTime',
                            span: 12,
                            disabled: true,
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss'
                        }
                    ]
                },
                loading: true,
                page: {
                    total: 0,
                    pageSize: 20,
                    currentPage: 1
                }
            }
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    groupApi.list(Object.assign({
                        page: {
                            current: page.currentPage,
                            size: page.pageSize
                        }
                    }, this.query)).then(res => {
                        const data = res.data;
                        this.page.total = data.total;
                        this.listData = data.records;
                    }).catch(() => {
                    }).finally(() => {
                        this.loading = false;
                    });
                },
                listAdd(row, done, loading) {
                    groupApi.add(row).then(() => {
                        loading();
                        this.list(this.page);
                        successMessage();
                    }).catch(() => {
                    }).finally(() => {
                        done();
                    });
                },
                listDelete(row) {
                    this.$confirm('是否删除该条数据？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        return groupApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    groupApi.update(row).then(() => {
                        loading();
                        this.list(this.page);
                        successMessage();
                    }).catch(() => {
                    }).finally(() => {
                        done();
                    });
                },
                refreshChange() {
                    this.list(this.page);
                },
                currentChange(page) {
                    this.page.currentPage = page;
                },
                sizeChange(pageSize) {
                    this.page.pageSize = pageSize;
                },
                searchChange(params, done) {
                    this.query = params;
                    this.list(this.page);
                    done();
                },
                searchReset() {
                    this.query = {};
                    this.list(this.page);
                }
            }
    }
</script>

<style lang="scss">
</style>
