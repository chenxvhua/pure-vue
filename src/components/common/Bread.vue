<template>
    <el-breadcrumb separator="/"  class="el-breadcrumb">
        <el-breadcrumb-item v-for="item in currentRouter.matched" :to="navHandle(item,currentRouter)" :key="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    export default {
        props: {
            currentRouter:Object
        },
        data () {
            return {

            }
        },
        mounted (){

        },
        methods : {
            navHandle: function (itemMatched,currentRouter) {//设置参数
                var queryObj={};
                if(itemMatched.meta.urlParam){
                    Object.keys(currentRouter.query).forEach(function (key) {
                        if(itemMatched.meta.urlParam.indexOf(key)>-1){
                            queryObj[key]=currentRouter.query[key];
                        }
                    })
                }
                return { path: itemMatched.path||"/index",query: queryObj };
            }
        }
    }
</script>
<style scoped>


</style>




