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
                       @search-reset="searchReset"
                       @date-change="dateChange"
                       @search-change="searchChange"
                       @refresh-change="refreshChange"
                       @size-change="sizeChange"
                       @current-change="currentChange"
            >
                <template slot="interval" slot-scope="scope">
                    {{scope.row.createTime-scope.row.originTime||""}}
                </template>
            </avue-crud>
        </base-card>
    </el-col>
</template>

<script>
    import {dictionaryApi} from '@/api/manager'
    import {pointValueApi} from '@/api/data'

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
                    dateBtn: true,
                    menu: false,
                    addBtn: false,
                    delBtn: false,
                    editBtn: false,
                    height: 664,
                    align: 'center',
                    defaultExpandAll: true,
                    column: [
                        {
                            label: '所属设备',
                            prop: 'deviceId',
                            span: 12,
                            search: true,
                            searchSpan: 12,
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
                            searchSpan: 12,
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
                            label: '原始值',
                            prop: 'rawValue',
                            span: 12
                        }, {
                            label: '处理值',
                            prop: 'value',
                            span: 12
                        }, {
                            label: '自定义',
                            prop: 'customValue',
                            span: 12
                        }, {
                            label: '采集日期',
                            prop: 'originTime',
                            width: 180,
                            span: 10,
                            disabled: true,
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss.SSS'
                        }, {
                            label: '延时(毫秒)',
                            prop: 'interval',
                            width: 90,
                            span: 4,
                            slot: true
                        }, {
                            label: '保存日期',
                            prop: 'createTime',
                            width: 180,
                            span: 10,
                            disabled: true,
                            type: 'date',
                            format: 'yyyy-MM-dd HH:mm:ss.SSS'
                        }
                    ]
                },
                loading: true,
                page: {
                    total: 0,
                    pageSize: 20,
                    currentPage: 1,
                    startTime: 0,
                    endTime: 0
                }
            }
        },
        created() {
            this.device();
            this.point();
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    pointValueApi.list(Object.assign({
                        page: {
                            current: page.currentPage,
                            size: page.pageSize,
                            startTime: page.startTime,
                            endTime: page.endTime
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
                        this.findObject(this.listOption.column, 'deviceId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                point() {
                    dictionaryApi.pointDictionary('profile').then(res => {
                        this.findObject(this.listOption.column, 'pointId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                dateChange(date) {
                    if (date != null && date.length === 2) {
                        this.page.startTime = new Date(date[0]).getTime();
                        this.page.endTime = new Date(date[1]).getTime();
                    }
                    this.list(this.page);
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
