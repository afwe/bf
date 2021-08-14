<template>
    <div class="body">
        <el-card class="top-t">
        </el-card>
        <div class="mid">
            <div v-for="item in items.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
            v-bind:key="id" class="container">
                <router-link :to="{path:'article',query:{id:item.id}}" @click="refresh()" class="routerlink">
                    <el-card class="router">
                        {{item.title}}<span>|</span>
                        {{item.abstract}}<span>|</span>
                        ShuaiGeAfwe
                    </el-card>
                </router-link>
            </div>
        </div>

        <div class="footer">
            <el-pagination background layout="prev, pager, next"
                small
                :page-size="pagesize"
                @current-change="current_change"
                :current-page.sync="currentPage"
                :pager-count="5"  
                :total="items.length">
            </el-pagination>
        </div>
        <span style="color:white;">备案号 鄂ICP备2020021534号-1</span>
        <a href="https://beian.miit.gov.cn/">工信部链接</a>
    </div>
</template>
<script>
import router from '@/router';
export default {
    name:"mainpage",
    components:{},
    data(){
        return{
            items:[
            ],
            pagesize:4,
            currentPage:1
        }
        
    },
    created(){
        document.body.style.overflow='hidden';
        this.getarticles()
    },
    methods:{
        getarticles(){
            let self=this
            let ajax=new XMLHttpRequest
            ajax.open("get","http://119.29.199.131:80/afweshuaige/api/articles",true)
            ajax.send()
            ajax.onreadystatechange=function(){
                if( ajax.readyState == 4&&ajax.status == 200 ) {
                    let response=JSON.parse(ajax.responseText).result
                    /*items=response*/
                    self.items=response
                    self.items.reverse()
                }
            }
        },
        refresh(){
            /*这里解决问题*/
            this.$router.go(0)
        }
    }
}
</script>
<style scoped>
    *{
        margin:0;
        padding:0;
    }
    .body{ 
        position:absolute;
        height:100%;
        width:100%;
        display:flex;
        background-color: black;
        flex-flow:column;
    }
    .top-t{
        height:20%;
        width:100%;
        background:#fff url('../../static/img/turna.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        box-shadow: 0 0 25px aquamarine;
    }
    .mid{
        display:flex;
        flex-flow:column;
        justify-content: center;
        align-items: center;
        height:70%;
        width:100%;
    }
    .container{
        margin-top:1%;
        height:20%;
        width:26%;
    }
    .router{
        margin-left:-100%;
        height:100%;
        width:300%;
    }
    .card{
        height:100%;
        width:100%;
    }
    .footer{
        height:10%;
    }
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>