//页面通用

var pageCommon={
    add:function () {
        var that=this;
        that.$refs["fromAddAndEditDataParam"].validate((valid) => {
            if (valid) {
                var load = that.pageUrl.add;
                load.type="post";
                delete this.fromAddAndEditDataParam[that.pageCommonkey.primaryKey];
                load.param =this.fromAddAndEditDataParam;
                load.exec(function( data ){
                    that.addAndEdit.showFromAddAndEdit=false;
                    vm.$notify({
                        type: 'success',
                        message: "操作成功"
                    });
                    that.pageNum=1;
                    that.getPageAjax();
                })
            }
        });
    },
    delete:function (id,customParam) {
        var that=this;
        that.$confirm('确定要执行?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            var load = that.pageUrl.delete;
            load.type="post";
            // sourcesCode
            // sourcesName
            load.param = customParam||{ [that.pageCommonkey.primaryKey]:id };
            load.exec(function( data ){
                vm.$notify({
                    type: 'success',
                    message: "操作成功"
                });
                that.getPageAjax();
            })
        })
    },
    update:function () {
        var that=this;
        that.$refs["fromAddAndEditDataParam"].validate((valid) => {
            if (valid) {
                var load = that.pageUrl.update;
                load.type="post";
                load.param =that.fromAddAndEditDataParam;
                load.exec(function( data ){
                    that.addAndEdit.showFromAddAndEdit=false;
                    vm.$notify({
                        type: 'success',
                        message: "操作成功"
                    });
                    that.getPageAjax();
                })
            }
        });
    },
    detail:function(id,eType,customParam){
        var that=this;
        var load =that.pageUrl.detail;
        load.type="post";
        load.param =customParam||{ [that.pageCommonkey.primaryKey]:id };
        load.exec(function( data ){
            if(eType=="edit"){
                that.addAndEdit.formAddAndEditStatus='edit';
                that.addAndEdit.showFromAddAndEdit=true;
                if(!that.showEdit){
                    that.showEdit=true;//解决编辑和新增初始化冲突
                    that.copyFromAddAndEditDataParam=JSON.parse(JSON.stringify(that.fromAddAndEditDataParam));
                }
                that.fromAddAndEditDataParam={...that.fromAddAndEditDataParam,...data.data};
                //that.fromAddAndEditDataParam=data.data;
            }
            else{
                that.fromDataDetail=data.data;
                that.showFromDataDetail=true;
            }
        })
    },
    pageAjax:function (customParam) {
        var that=this;
        var load =that.pageUrl.pageAjax;
        load.type="post";
        var param={
            current:  this.current,
            pageSize:this.pageSize
        };
        if(that.pageCommonkey.searchKey){
            param[that.pageCommonkey.searchKey]=that[that.pageCommonkey.searchKey];
        }
        load.param =customParam||param;
        that.loading=true;
        load.exec(function( data ){
            that.page=data.data.page;
            that.total=data.data.total;
            that.loading=false;
        })
    },
    pageCommonWatch:{
        commonWatch:{
            "addAndEdit.showFromAddAndEdit": function (val, oldVal) {
                if(!val){
                    if(this.$refs["fromAddAndEditDataParam"]){
                        this.$refs["fromAddAndEditDataParam"].resetFields();
                    }
                    if(this.copyFromAddAndEditDataParam){
                        this.fromAddAndEditDataParam=JSON.parse(JSON.stringify(this.copyFromAddAndEditDataParam));
                    }
                }
            },
        }
    },
    pageCommonMethod:{
        opeMethod:{
            handleSavefromData:function(){//添加/编辑
                if(this.addAndEdit.formAddAndEditStatus=="add"){
                    pageCommon.add.apply(this,arguments);
                }
                else{
                    pageCommon.update.apply(this,arguments);
                }
            },
            handleDelete:function(id){//删除
                pageCommon.delete.apply(this,arguments);
            },
            handleShowFromDataDetail(id,eType){ //详细
                pageCommon.detail.apply(this,arguments);
            },
            getPageAjax (){//征信源产品列表
                pageCommon.pageAjax.apply(this,arguments);
            },
        },
        otherMethod:{
            handleSearchClick(){//搜索
                this.current=1;
                this.getPageAjax();
            },
            handleSearchEnterClick(e){//搜索
                var  keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
                if (keyCode == 13) {
                    this.current=1;
                    this.getPageAjax();
                }
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.getPageAjax();
            },
            handleCurrentChange(val) {
                this.current=val;
                this.getPageAjax();
            },
            handleFormatDateTime(mill){
                // var formatDateTime= require("format-datetime");
                // return  formatDateTime(new Date(mill),"yyyy-MM-dd HH:mm:ss");
            },
        },
    }
}
export {
    pageCommon
}
