<template>
    <div class="inner-container" v-else>
    <breadcrumb :current-router="$route"></breadcrumb>
    <el-row type="flex" class="top-bar">
        <el-col :span="16">
        </el-col>
        <el-col :span="3">
            <el-button type="primary" @click="addAndEdit.showFromAddAndEdit = true;addAndEdit.formAddAndEditStatus='add'">添加{{pageCommonkey.pageTitle}}</el-button>
        </el-col>
        <el-col :span="3">
            <div class="search-container">
                <el-input
                        :placeholder="'请输入'+pageCommonkey.pageTitle+'名称'"
                        icon="search"
                        v-model="name"
                        :on-icon-click="handleSearchClick" @keyup.native="handleSearchEnterClick">
                </el-input>
            </div>
        </el-col>
    </el-row>


    <el-table
            v-loading="loading"
            element-loading-text="数据加载中"
            :data="page"
            style="width: 100%">
        <el-table-column
                type="index"
                label="序号"
                width="100">
        </el-table-column>
        <el-table-column
                prop="dicCode"
                label="编码">
        </el-table-column>
        <el-table-column
                prop="dicName"
                label="名称">
        </el-table-column>
        <el-table-column
                prop="dicValue"
                label="值">
        </el-table-column>
        <el-table-column
                prop="remark"
                label="备注">
            <template scope="scope">
                <el-tooltip class="item" effect="light"  placement="top">
                    <div slot="content" class="text-break">{{scope.row.remark}}</div>
                    <span>{{scope.row.remark.length>50?scope.row.remark.substr(0,50)+"....":scope.row.remark}}</span>
                </el-tooltip>
            </template>
        </el-table-column>

        <el-table-column
                label="操作">
            <template scope="scope">
                <el-button type="text" icon="edit"  @click="handleShowFromDataDetail(scope.row.id,'edit')">编辑</el-button>
                <el-button type="text" icon="delete"  @click="handleDelete(scope.row.id)">删除</el-button>
                <el-button type="text"  @click="handleShowFromDataDetail(scope.row.id,'detail')">  <i class="iconfont icon-browse"></i>查看</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>

    <!--页面额外部分start-->
    <!-- 添加/编辑 -->
    <el-dialog :title="addAndEdit.formAddAndEditStatus=='add'?addAndEdit.formAddTitle:addAndEdit.formEditTitle" :close-on-click-modal="false" :visible.sync="addAndEdit.showFromAddAndEdit" size="tiny">
        <el-form :model="fromAddAndEditDataParam" ref="fromAddAndEditDataParam" :rules="rules">
            <el-form-item label="编码	" :label-width="formLabelWidth" prop="dicCode">
                <el-input :maxlength="maxlength" v-model="fromAddAndEditDataParam.dicCode"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" prop="dicName">
                <el-input :maxlength="maxlength" v-model="fromAddAndEditDataParam.dicName"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="值" :label-width="formLabelWidth" prop="dicValue">
                <el-input :maxlength="maxlength" v-model="fromAddAndEditDataParam.dicValue"  auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input :maxlength="500" type="textarea" :rows="5" v-model="fromAddAndEditDataParam.remark"  auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addAndEdit.showFromAddAndEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleSavefromData">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog :title="pageCommonkey.pageTitle+'详细'" :visible.sync="showFromDataDetail" size="tiny">
        <el-form :model="fromDataDetail" ref="fromDataDetail"  label-suffix=":">
            <el-form-item label="编码" :label-width="formLabelWidth">
                <span>{{fromDataDetail.dicCode}}</span>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth">
                <span>{{fromDataDetail.dicName}}</span>
            </el-form-item>
            <el-form-item label="值" :label-width="formLabelWidth">
                <span>{{fromDataDetail.dicValue}}</span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <span class="text-break">{{fromDataDetail.remark}}</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showFromDataDetail = false">关闭</el-button>
        </div>
    </el-dialog>
    <!--页面额外部分end-->


    </div>
</template>
<script>
    export default {
        data() {
            return {
                //页面配置start
                page: [],
                name: "",
                pageSize: 10,
                current: 1,
                total: 0,
                loading:false,
                formLabelWidth: '120px',
                maxlength:50,
                pageUrl:{
                    add:new requestApi.dictionary.dictionary_add(),
                    delete: new requestApi.dictionary.dictionary_delete(),
                    update:new requestApi.dictionary.dictionary_update(),
                    detail: new requestApi.dictionary.dictionary_detail(),
                    pageAjax: new requestApi.dictionary.dictionary_page(),
                },
                pageCommonkey:{
                    primaryKey:"id",//主键
                    searchKey:"name",//搜索键
                    pageTitle:"字典",
                },
                //页面配置end

                //编辑和新增start
                addAndEdit:{
                    formAddTitle:"添加字典" ,
                    formEditTitle:"编辑字典",
                    formAddAndEditStatus:"",//add ,edit
                    showFromAddAndEdit:false,
                },

                fromAddAndEditDataParam:{
                    "id":"",
                    'dicName': "",
                    'dicCode':"",
                    "dicValue": "",
                    "remark":"",
                },
                rules: {
                    dicCode: [
                        { required: true,whitespace:true, message: '请输入编码'},
                    ],
                    dicName: [
                        { required: true,whitespace:true, message: '请输入名称'},
                    ],
                },
                //编辑和新增end

                //查看 start
                showFromDataDetail:false,
                fromDataDetail:{
                    "id":"",
                    'dicName': "",
                    'dicCode':"",
                    "dicValue": "",
                    "remark":"",
                },
                //查看 end
            }
        },
        mounted(){
            this.getPageAjax();
        },
        watch: {
            ...pageCommon.pageCommonWatch.commonWatch
        },
        methods : {
            ...pageCommon.pageCommonMethod.opeMethod,//增删改查方法
            ...pageCommon.pageCommonMethod.otherMethod, //页面其他方法
        },
    }
</script>
<style scoped>

</style>
