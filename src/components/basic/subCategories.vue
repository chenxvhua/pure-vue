<template>
    <router-view class="child-view"  v-if="$route.matched.length > 3">
    </router-view>
    <div class="inner-container" v-else>
        <breadcrumb :current-router="$route"></breadcrumb>
        <el-row type="flex" class="top-bar">
            <el-col :span="16">
            </el-col>
            <el-col :span="3">
                <el-button type="primary"  @click="addAndEdit.showFromAddAndEdit = true;addAndEdit.formAddAndEditStatus='add'">添加{{pageCommonkey.pageTitle}}</el-button>
            </el-col>
            <el-col :span="3">
                <div class="search-container">
                    <el-input
                            :placeholder="'请输入'+pageCommonkey.pageTitle+'名称'"
                            icon="search"
                            v-model="categoriesName"
                            :on-icon-click="handleSearchClick" @keyup.native="handleSearchEnterClick">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-table
                v-loading="loading"
                element-loading-text="数据加载中"
                :data="page"
                stripe
                header-row-class-name="table-header"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="categoriesCode"
                    label="商品子分类编码">
            </el-table-column>
            <el-table-column
                    prop="categoriesName"
                    label="商品子分类名称">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template scope="scope">
                    <el-button type="text" icon="edit"  @click="handleShowFromDataDetail(scope.row.id,'edit')">编辑</el-button>
                    <el-button type="text" icon="delete"  @click="handleDelete(scope.row.id,scope.row.code,scope.row.name)">删除</el-button>
                    <el-button type="text"  @click="handleShowFromDataDetail(scope.row.id,'detail')">  <i class="iconfont icon-browse"></i>查看</el-button>
                    <span class="list-a el-button el-button--text"> <i class="iconfont icon-set"></i>
                        <router-link :to="{ path: '/productPage', query: { parentCategoriesCode:$route.query.parentCategoriesCode,subCategoriesCode:scope.row.categoriesCode}}"><span class="el-button--text">产品</span></router-link>
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>


        <!--页面额外部分start-->
        <!-- 添加/编辑 -->
        <el-dialog :title="addAndEdit.formAddAndEditStatus=='add'?addAndEdit.formAddTitle:addAndEdit.formEditTitle" :close-on-click-modal="false" :visible.sync="addAndEdit.showFromAddAndEdit" size="tiny">
            <el-form :model="fromAddAndEditDataParam" ref="fromAddAndEditDataParam" :rules="rules">
                <el-form-item label="商品子分类编码	" :label-width="formLabelWidth" prop="categoriesCode">
                    <el-input :maxlength="maxlength" v-model="fromAddAndEditDataParam.categoriesCode"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品子分类名称" :label-width="formLabelWidth" prop="categoriesName">
                    <el-input :maxlength="maxlength" v-model="fromAddAndEditDataParam.categoriesName"  auto-complete="off"></el-input>
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
                <el-form-item label="商品子分类编码" :label-width="formLabelWidth">
                    <span>{{fromDataDetail.categoriesCode}}</span>
                </el-form-item>
                <el-form-item label="商品子分类名称" :label-width="formLabelWidth">
                    <span>{{fromDataDetail.categoriesName}}</span>
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
                categoriesName: "",
                pageSize: 10,
                current: 1,
                total: 0,
                loading:false,
                formLabelWidth: '120px',
                maxlength:50,
                pageUrl:{
                    add:new requestApi.commodity.categories_add(),
                    delete: new requestApi.commodity.categories_delete(),
                    update: new requestApi.commodity.categories_update(),
                    detail: new requestApi.commodity.categories_detail(),
                    pageAjax: new requestApi.commodity.categories_page(),
                },
                pageCommonkey:{
                    primaryKey:"id",//主键
                    searchKey:"categoriesName",//搜索键
                    pageTitle:"商品子分类",
                },
                //页面配置end

                //编辑和新增start
                addAndEdit:{
                    formAddTitle:"添加商品子分类" ,
                    formEditTitle:"编辑商品子分类",
                    formAddAndEditStatus:"",//add ,edit
                    showFromAddAndEdit:false,
                },

                fromAddAndEditDataParam:{
                    "id":"",
                    "categoriesCode":"",
                    "categoriesName":"",
                },
                rules: {
                    categoriesCode: [
                        { required: true,whitespace:true, message: '请输入商品子分类编码'},
                    ],
                    categoriesName: [
                        { required: true,whitespace:true, message: '请输入商品子分类名称'},
                    ],
                },
                //编辑和新增end

                //查看 start
                showFromDataDetail:false,
                fromDataDetail:{
                    "id":"",
                    "categoriesCode":"",
                    "categoriesName":"",
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
