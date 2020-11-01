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
                       @row-del="listDelete"
                       @row-update="listUpdate"
                       @search-reset="searchReset"
                       @search-change="searchChange"
                       @refresh-change="refreshChange"
                       @size-change="sizeChange"
                       @current-change="currentChange"
            >
                <template slot="status" slot-scope="scope">
                    <el-tag v-if="scope.row.status" type="success" effect="plain">在线</el-tag>
                    <el-tag v-else type="info" effect="plain">离线</el-tag>
                </template>
            </avue-crud>
        </base-card>
    </el-col>
</template>

<script>
    import {driverApi} from '@/api/manager'
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
                    menu: false,
                    addBtn: false,
                    editBtn: false,
                    delBtn: false,
                    height: 664,
                    align: 'center',
                    column: [
                        {
                            label: '名称',
                            prop: 'name',
                            span: 8,
                            search: true,
                            searchSpan: 6
                        }, {
                            label: '服务',
                            prop: 'serviceName',
                            span: 8,
                            search: true,
                            searchSpan: 6
                        }, {
                            label: '状态',
                            prop: 'status',
                            width: 100,
                            span: 8,
                            disabled: true,
                            slot: true
                        }, {
                            label: '主机',
                            prop: 'host',
                            width: 180,
                            span: 12,
                            search: true,
                            searchSpan: 6
                        }, {
                            label: '端口',
                            prop: 'port',
                            width: 100,
                            span: 12,
                            search: true,
                            searchSpan: 6
                        }, {
                            label: '备注',
                            prop: 'description',
                            width: 400,
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
        methods:
            {
                list(page) {
                    this.loading = true;
                    driverApi.list(Object.assign({
                        page: {
                            current: page.currentPage,
                            size: page.pageSize
                        }
                    }, this.query)).then(list => {
                        const data = list.data;
                        this.page.total = data.total;
                        driverApi.status(Object.assign({
                            page: {
                                current: page.currentPage,
                                size: page.pageSize
                            }
                        }, this.query)).then(statuses => {
                            this.listData = data.records.map(d => {
                                d.status = statuses.data[d.serviceName] === true;
                                return d;
                            });
                        });
                    }).catch(() => {
                    }).finally(() => {
                        this.loading = false;
                    });
                },
                listDelete(row) {
                    this.$confirm('是否删除该条数据？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        return driverApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    driverApi.update(row).then(() => {
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
