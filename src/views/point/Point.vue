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
    import {dictionaryApi, pointApi} from '@/api/manager'
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
                    viewBtn: true,
                    height: 664,
                    align: 'center',
                    column: [
                        {
                            label: '所属模板',
                            prop: 'profileId',
                            width: 220,
                            span: 12,
                            search: true,
                            searchSpan: 6,
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
                            label: '位号',
                            prop: 'name',
                            width: 220,
                            span: 12,
                            search: true,
                            searchSpan: 6,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 位号名称',
                                    trigger: 'blur'
                                }, {
                                    min: 2,
                                    max: 32,
                                    message: '请输入 2~32 位字长的位号名称',
                                    trigger: 'blur'
                                }, {
                                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5-_]*$/,
                                    message: '请输入 正确格式的位号名称'
                                }
                            ]
                        }, {
                            label: '类型',
                            prop: 'type',
                            width: 100,
                            span: 8,
                            search: true,
                            searchSpan: 4,
                            type: 'select',
                            searchFilterable: true,
                            value: 'string',
                            dicData: [
                                {
                                    label: '字符串(string)',
                                    value: 'string'
                                }, {
                                    label: '布尔量(boolean)',
                                    value: 'boolean'
                                }, {
                                    label: '字节(byte)',
                                    value: 'byte'
                                }, {
                                    label: '短整数(short)',
                                    value: 'short'
                                }, {
                                    label: '整数(int)',
                                    value: 'int'
                                }, {
                                    label: '长整数(long)',
                                    value: 'long'
                                }, {
                                    label: '浮点数(float)',
                                    value: 'float'
                                }, {
                                    label: '双精度浮点数(double)',
                                    value: 'double'
                                }
                            ],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择位号数据类型',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '读/写',
                            prop: 'rw',
                            width: 60,
                            span: 8,
                            search: true,
                            searchSpan: 4,
                            type: 'select',
                            searchFilterable: true,
                            value: 0,
                            dicData: [
                                {
                                    label: '只读',
                                    value: 0
                                }, {
                                    label: '只写',
                                    value: 1
                                }, {
                                    label: '读写',
                                    value: 2
                                }
                            ],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择位号读写类型',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '累计标识',
                            prop: 'accrue',
                            width: 70,
                            span: 8,
                            search: true,
                            searchSpan: 4,
                            type: 'select',
                            searchFilterable: true,
                            value: false,
                            dicData: [
                                {
                                    label: '累计',
                                    value: true
                                }, {
                                    label: '不累计',
                                    value: false
                                }
                            ],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择位号是否为累计数据',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '基值',
                            prop: 'base',
                            width: 60,
                            span: 8,
                            searchSpan: 12,
                            value: 0,
                            rules: [
                                {
                                    pattern: /^-?(([0-9]*(\.[0-9]{1,3})$)|([0-9]+$))/,
                                    message: '请输入 正确格式的基值'
                                }
                            ]
                        }, {
                            label: '倍数',
                            prop: 'multiple',
                            width: 60,
                            span: 8,
                            searchSpan: 12,
                            value: 1,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 倍数',
                                    trigger: 'blur'
                                }, {
                                    pattern: /^-?(([0-9]*(\.[0-9]{1,3})$)|([0-9]+$))/,
                                    message: '请输入 正确格式的倍数'
                                }
                            ]
                        }, {
                            label: '格式',
                            prop: 'format',
                            width: 60,
                            span: 8,
                            searchSpan: 12,
                            value: '%.3f',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 格式',
                                    trigger: 'blur'
                                }
                            ]
                        }, {
                            label: '最小值',
                            prop: 'minimum',
                            width: 70,
                            span: 8,
                            searchSpan: 12,
                            value: -999999,
                            rules: [
                                {
                                    pattern: /^-?(([0-9]*(\.[0-9]{1,3})$)|([0-9]+$))/,
                                    message: '请输入 正确格式的最小值'
                                }
                            ]
                        }, {
                            label: '最大值',
                            prop: 'maximum',
                            width: 70,
                            span: 8,
                            searchSpan: 12,
                            value: 999999,
                            rules: [
                                {
                                    pattern: /^-?(([0-9]*(\.[0-9]{1,3})$)|([0-9]+$))/,
                                    message: '请输入 正确格式的最大值'
                                }
                            ]
                        }, {
                            label: '单位',
                            prop: 'unit',
                            width: 70,
                            span: 8,
                            searchSpan: 12
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
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    pointApi.list(Object.assign({
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
                listAdd(row, done, loading) {
                    pointApi.add(row).then(() => {
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
                        return pointApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    pointApi.update(row).then(() => {
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
