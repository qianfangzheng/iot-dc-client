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
                <template slot="menuLeft">
                    <el-button type="success" icon="el-icon-upload" size="small" @click="dialogFormVisible=true">批量导入</el-button>
                </template>

                <template slot="status" slot-scope="scope">
                    <el-tag v-if="scope.row.status==='ONLINE'" type="success" effect="plain">在线</el-tag>
                    <el-tag v-else-if="scope.row.status==='MAINTAIN'" type="warning" effect="plain">维护</el-tag>
                    <el-tag v-else-if="scope.row.status==='FAULT'" type="danger" effect="plain">故障</el-tag>
                    <el-tag v-else type="info" effect="plain">离线</el-tag>
                </template>
            </avue-crud>
        </base-card>
        <el-dialog title="批量导入"
                   :visible.sync="dialogFormVisible"
                   :modal-append-to-body="false"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
        >
            <div class="upload">
                <el-upload drag
                           :on-progress="handleUploadProgress"
                           :on-success="handleUploadSuccess"
                           :on-error="handleUploadError"
                           :show-file-list="false"
                           action="/manager_api/manager/batch/import"
                           accept="application/json"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 json 格式文件，批量导入过程比较耗时，需要耐心等待，请勿切换其他页面！</div>
                </el-upload>
                <el-progress class="upload-progress" :percentage="loadProgress" :text-inside="true" :stroke-width="15" :status="progressStatus"></el-progress>
            </div>
        </el-dialog>
    </el-col>
</template>

<script>
    import {deviceApi, dictionaryApi} from '@/api/manager'
    import {failMessage, successMessage} from "@/util/util";

    export default {
        data() {
            return {
                loadProgress: 0,
                progressFlag: false,
                progressStatus: null,
                dialogFormVisible: false,
                form: {},
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
                            label: '设备',
                            prop: 'name',
                            span: 24,
                            search: true,
                            searchSpan: 8,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入 设备名称',
                                    trigger: 'blur'
                                }, {
                                    min: 2,
                                    max: 32,
                                    message: '请输入 2~32 位字长的设备名称',
                                    trigger: 'blur'
                                }, {
                                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5-_]*$/,
                                    message: '请输入 正确格式的设备名称'
                                }
                            ]
                        }, {
                            label: '所属模板',
                            prop: 'profileId',
                            span: 8,
                            search: true,
                            searchSpan: 8,
                            type: 'tree',
                            dicData: [],
                            defaultExpandAll: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择使用模板',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '所属分组',
                            prop: 'groupId',
                            width: 180,
                            span: 8,
                            search: true,
                            searchSpan: 8,
                            type: 'select',
                            filterable: true,
                            searchFilterable: true,
                            dicData: [],
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属分组',
                                    trigger: 'click'
                                }
                            ]
                        }, {
                            label: '存储类型',
                            prop: 'multi',
                            width: 100,
                            span: 8,
                            type: 'select',
                            value: false,
                            dicData: [
                                {
                                    label: '单点数据',
                                    value: false
                                }, {
                                    label: '结构数据',
                                    value: true
                                }
                            ]
                        }, {
                            label: '状态',
                            prop: 'status',
                            width: 100,
                            span: 8,
                            disabled: true,
                            display: false,
                            slot: true,
                            type: 'select',
                            value: 'OFFLINE',
                            dicData: [
                                {
                                    label: '在线',
                                    value: 'ONLINE'
                                }, {
                                    label: '离线',
                                    value: 'OFFLINE'
                                }, {
                                    label: '维护',
                                    value: 'MAINTAIN'
                                }, {
                                    label: '故障',
                                    value: 'FAULT'
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
            this.group();
            this.profile();
        },
        methods:
            {
                list(page) {
                    this.loading = true;
                    deviceApi.list(Object.assign({
                        page: {
                            current: page.currentPage,
                            size: page.pageSize
                        }
                    }, this.query)).then(list => {
                        const data = list.data;
                        this.page.total = data.total;
                        deviceApi.status(Object.assign({
                            page: {
                                current: page.currentPage,
                                size: page.pageSize
                            }
                        }, this.query)).then(statuses => {
                            this.listData = data.records.map(d => {
                                d.status = statuses.data[d.id] || "OFFLINE";
                                return d;
                            });
                        });
                    }).catch(() => {
                    }).finally(() => {
                        this.loading = false;
                    });
                },
                group() {
                    dictionaryApi.groupDictionary().then(res => {
                        this.findObject(this.listOption.column, 'groupId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                profile() {
                    dictionaryApi.profileDictionary().then(res => {
                        this.findObject(this.listOption.column, 'profileId').dicData = res.data;
                    }).catch(() => {
                    });
                },
                listAdd(row, done, loading) {
                    deviceApi.add(row).then(() => {
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
                        return deviceApi.delete(row.id);
                    }).then(() => {
                        this.list(this.page);
                        successMessage();
                    });
                },
                listUpdate(row, index, done, loading) {
                    deviceApi.update(row).then(() => {
                        loading();
                        this.list(this.page);
                        successMessage();
                    }).catch(() => {
                    }).finally(() => {
                        done();
                    });
                },
                handleUploadProgress(event, file) {
                    event.percent = 0;
                    this.loadProgress = 0;
                    this.progressFlag = true;
                    this.progressStatus = null;
                    let that = this;
                    this.getFileContent(file.raw, function (step) {
                        let interval = setInterval(function () {
                            if (!that.progressFlag) {
                                clearInterval(interval);
                                return;
                            }
                            if (that.loadProgress >= 99 && that.progressFlag) {
                                that.loadProgress = 99;
                                clearInterval(interval);
                                return;
                            }
                            that.loadProgress += step;
                        }, 500);
                    });
                },
                handleUploadSuccess(response) {
                    if (response.ok) {
                        this.loadProgress = 100;
                        this.progressFlag = false;
                        this.progressStatus = "success";
                        successMessage("批量导入成功！");
                    } else {
                        this.handleUploadError();
                    }
                },
                handleUploadError() {
                    this.loadProgress = 50;
                    this.progressFlag = false;
                    this.progressStatus = "exception";
                    failMessage("批量导入失败");
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
                },
                getFileContent(file, callback) {
                    let fileReader = new FileReader();
                    fileReader.onload = function (content) {
                        let services = JSON.parse(content.target.result || "{}");
                        let pointLength = 0;
                        services.forEach(function (service) {
                            service.profiles.forEach(function (profile) {
                                let deviceLength = 0;
                                profile.groups.forEach(function (group) {
                                    deviceLength += group.devices.length;
                                });
                                pointLength += profile.points.length * deviceLength;
                            });
                        });
                        let step = 100 / pointLength;
                        step = step < 1 ? 1 : step;
                        step = step > 50 ? 50 : step;
                        callback(step);
                    };
                    fileReader.readAsText(file);
                }
            }
    }
</script>

<style lang="scss">
    .upload {
        text-align: center;
    }

    .upload-progress {
        margin-top: 10px;
    }
</style>
