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
    import {dictionaryApi, driverInfoApi} from '@/api/manager'
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
                            label: '所属模板',
                            prop: 'profileId',
                            span: 24,
                            search: true,
                            searchSpan: 12,
                            type: 'tree',
                            dicData: [],
                            defaultExpandAll: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属模板',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '属性',
                            prop: 'driverAttributeId',
                            span: 12,
                            search: true,
                            searchSpan: 12,
                            type: 'tree',
                            dicData: [],
                            defaultExpandAll: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择属性',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '内容',
                            prop: 'value',
                            span: 12,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 内容',
                                    trigger: 'blur'
                                }
                            ]
                        }, {
                            label: '备注',
                            prop: 'description',
                            width: 200,
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
                            width: 155,
                            span: 12,
                            disabled: true,
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss'
                        }, {
                            label: '创建日期',
                            prop: 'createTime',
                            width: 155,
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
        created() {
            this.profile();
            this.driverAttribute();
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    driverInfoApi.list(Object.assign({
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
                profile() {
                    dictionaryApi.profileDictionary().then(res => {
                        this.findObject(this.listOption.column,'profileId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                driverAttribute() {
                    dictionaryApi.driverAttributeDictionary().then(res => {
                        this.findObject(this.listOption.column,'driverAttributeId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                listAdd(row, done, loading) {
                    driverInfoApi.add(row).then(() => {
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
                        return driverInfoApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    driverInfoApi.update(row).then(() => {
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
