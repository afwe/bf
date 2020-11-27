<template>
    <div class="body">
    <el-main class="left">
        <el-main class="left-top">
            {{article.date}}<br><br><br><br>
            {{article.mode}}
        </el-main>
        <el-card class="left-bottom">
            
        </el-card>
    </el-main>

    <el-main class="right">
        <div style="text-align: left;width: 990px;margin: 35px auto 0 auto" class="textarea">
            <div>
                <span style="font-size: 20px"><strong>{{article.title}}</strong></span>
                <el-divider content-position="left"></el-divider>
                    <div v-html="article.contentHtml"></div>
            </div>
        </div>
    </el-main>
    </div>
</template>

<script>
import router from '@/router';
export default {
    data () {
      return {
        article: []
      }
    },
    created(){
        document.body.style.overflow='hidden';
    },
    mounted () {
      this.loadArticle()
    },
    methods: {
      loadArticle () {
        let self = this
        /*搭配注意*/
        let id=this.$route.query.id
        let Url="http://119.29.199.131:80/afweshuaige/api/article/"+id
        let ajax=new XMLHttpRequest
        ajax.open("get",Url,true)
        ajax.send()
        ajax.onreadystatechange=function(){
            if( ajax.readyState == 4&&ajax.status == 200 ){
                let response=JSON.parse(ajax.responseText).result
                    /*items=response*/
                    self.article=response
            }
        }
        }
    }
}
</script>
    
<style>
    .body{
        position: absolute;
        height:100%;
        width:100%;
        display:flex;
        flex-flow: row;
        background-color: black;
    }
    .left{
        margin-top:1%;
        width:20%;
        display:flex;
        flex-flow:column;
        box-shadow: 0 0 25px aquamarine;
    }
    .left-top{
        color:azure;
        height:40%;
    }
    .left-bottom{
        height:50%;
        background:#fff url("../../static/img/timg.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .right{
        width:60%;
        display:flex;
        flex-flow:column;
    }
    .textarea{
        /*超出文字换行*/
        background-color: antiquewhite;
        padding-left:1%;
        padding-right:1%;
        overflow:scroll;
        overflow-x:hidden;
        text-align: center;
        width:100%;
        height:100%;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>