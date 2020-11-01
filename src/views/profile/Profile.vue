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
    import {dictionaryApi, profileApi} from '@/api/manager'
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
                            label: '模板',
                            prop: 'name',
                            span: 24,
                            search: true,
                            searchSpan: 12,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 模板名称',
                                    trigger: 'blur'
                                }, {
                                    min: 2,
                                    max: 32,
                                    message: '请输入 2~32 位字长的模板名称',
                                    trigger: 'blur'
                                }, {
                                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5-_]*$/,
                                    message: '请输入 正确格式的模板名称'
                                }
                            ]
                        }, {
                            label: '公/私有',
                            prop: 'share',
                            width: 100,
                            search: true,
                            searchSpan: 6,
                            type: 'select',
                            searchFilterable: true,
                            value: false,
                            dicData: [
                                {
                                    label: '私有',
                                    value: false
                                },
                                {
                                    label: '公有(web暂不支持,该模式请使用批量导入)',
                                    value: true,
                                    disabled: true

                                }
                            ],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择模板共享类型',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '所属驱动',
                            prop: 'driverId',
                            search: true,
                            searchSpan: 6,
                            type: 'select',
                            filterable: true,
                            searchFilterable: true,
                            dicData: [],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属驱动',
                                    trigger: 'click'
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
            this.driver();
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    profileApi.list(Object.assign({
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
                driver() {
                    dictionaryApi.driverDictionary().then(res => {
                        this.findObject(this.listOption.column, 'driverId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                listAdd(row, done, loading) {
                    profileApi.add(row).then(() => {
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
                        return profileApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    profileApi.update(row).then(() => {
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
