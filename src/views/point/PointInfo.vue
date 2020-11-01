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
    import {dictionaryApi, pointInfoApi} from '@/api/manager'
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
                            label: '所属设备',
                            prop: 'deviceId',
                            span: 12,
                            search: true,
                            searchSpan: 8,
                            type: 'tree',
                            dicData: [],
                            defaultExpandAll: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属设备',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '所属位号',
                            prop: 'pointId',
                            span: 12,
                            search: true,
                            searchSpan: 8,
                            type: 'tree',
                            dicData: [],
                            defaultExpandAll: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属位号',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '属性',
                            prop: 'pointAttributeId',
                            span: 12,
                            search: true,
                            searchSpan: 8,
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
            this.device();
            this.point();
            this.pointAttribute();
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    pointInfoApi.list(Object.assign({
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
                device() {
                    dictionaryApi.deviceDictionary('group').then(res => {
                        this.findObject(this.listOption.column,'deviceId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                point() {
                    dictionaryApi.pointDictionary('profile').then(res => {
                        this.findObject(this.listOption.column,'pointId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                pointAttribute() {
                    dictionaryApi.pointAttributeDictionary().then(res => {
                        this.findObject(this.listOption.column,'pointAttributeId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                listAdd(row, done, loading) {
                    pointInfoApi.add(row).then(() => {
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
                        return pointInfoApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    pointInfoApi.update(row).then(() => {
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
