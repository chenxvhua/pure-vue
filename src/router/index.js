/**
 * Created by chenxuhua on 2017/9/6.
 */
import Vue from 'vue'
import Router from 'vue-router'
import PageCommon from '@/components/common/PageCommon'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: function (resolve) {
                require(['@/components/login'], resolve);
            }
        },
        {
            path: '/login',
            component: function (resolve) {
                require(['@/components/login'], resolve);
            }
        },
        {
            path: '/',
            name:"首页",
            component : PageCommon,
            children: [
                {
                    path: '/index',
                    component: function (resolve) {
                        require(['@/components/index'], resolve);
                    }
                },//首页
                {
                    path: '/categories',
                    name:"商品分类",
                    component: function (resolve) {
                        require(['@/components/basic/categories'], resolve);
                    },
                    children:[
                        {
                            path: '/subCategories',
                            name:"二级分类",
                            meta: { urlParam: ["parentCategoriesCode"] },
                            component: function (resolve) {
                                require(['@/components/basic/subCategories'], resolve);
                            },
                            children:[
                                {
                                    path: '/productPage',
                                    name:"产品",
                                    component:  function (resolve) {
                                        require(['@/components/basic/productPage'], resolve);
                                    },
                                }
                            ]
                        },//二级分类
                    ]
                },//商品分类
                {
                    path: '/dictionaryPage',
                    name:"字典管理",
                    component: function (resolve) {
                        require(['@/components/basic/dictionaryPage'], resolve);
                    },
                },//商品分类

            ]
        },

    ]
})



