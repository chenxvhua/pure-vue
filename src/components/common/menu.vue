<template>
        <el-menu
                :default-active="defaultActive"
                :default-openeds="['1']"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :collapse="false"
                style="width: 240px;">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>基础组件</span>
                </template>
                <el-menu-item index="/categories">
                    <router-link :to="{ path: '/categories'}"> <i class="el-icon-setting"></i>商品分类</router-link>
                </el-menu-item>
                <el-menu-item index="/dictionaryPage">
                    <router-link :to="{ path: '/dictionaryPage'}"> <i class="el-icon-setting"></i>字典管理</router-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>高级用法</span>
                </template>
                <el-menu-item index="2-1"> <i class="el-icon-setting"></i>选项1</el-menu-item>
                <el-menu-item index="2-2"> <i class="el-icon-setting"></i>选项2</el-menu-item>
            </el-submenu>
        </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                defaultActive:"",
            };
        },
        mounted () {
            var localName = location.href.split("#/");
            if( localName[1] ){ //#/foo
                localName = "/"+localName[1];
            }
            if(this.$route && this.$route.matched.length>1){//kenley add
                localName =this.$route.matched[1].path;
            }
            setTimeout(()=>{
                this.defaultActive=localName;
                console.log(this.name2);
            },3000)
        },

//        componentDidMount() {
//            var localName =this.props.routes[1]?this.props.routes[1].path.substr(1):"";
//            this.setState({
//                selectedKeys: localName ? [localName] : [],
//            });
//        }
//        componentWillReceiveProps(){
//            var localName =this.props.routes[1]?this.props.routes[1].path.substr(1):"";
//            this.setState({
//                selectedKeys: localName ? [localName] : [],
//            });
//        }


        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>


</style>




