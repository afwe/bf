<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/dashboard'}">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/content/article'}">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-input
        v-model="article.articleTitle"
        style="margin: 10px 0px;font-size: 18px;"
        placeholder="请输入标题"></el-input>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <mavon-editor
        v-model="article.articleContentMd"
        style="height: 100%;"
        ref=md
        @save="saveArticles"
        fontSize="16px">
        <button type="button" class="op-icon el-icon-document" :title="'摘要/封面'" slot="left-toolbar-after"
                @click="dialogVisible = true"></button>
      </mavon-editor>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%">
        <el-divider content-position="left">摘要</el-divider>
        <el-input
          type="textarea"
          v-model="article.articleAbstract"
          rows="2"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">心情状态</el-divider>
        <el-input
        type="textarea"
        v-model="article.mode"
        rows="2"
        maxlength="255"
        show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="article.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import ImgUpload from './ImgUpload'

  export default {  
    name: 'Editor',
    components: {ImgUpload},
    data () {
      return {
        article: {},
        dialogVisible: false
      }
    },
    created () {
      if(localStorage.pilote != "afwe"){
        this.$router.push({ path: '/mainpage' })
      }
    },
    mounted () {
      if (this.$route.params.article) {
        this.article = this.$route.params.article
      }
    },
    methods: {
      saveArticles (value, render) {
        // value 是 md，render 是 html
        this.$confirm('是否保存并发布文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let ajax=new XMLHttpRequest
            let number=0;
            let self=this
            ajax.open("get","http://119.29.199.131:80/afweshuaige/api/articles",true)
            ajax.setRequestHeader("Content-type", "application/json; charset=utf-8")
            ajax.send()
            ajax.onreadystatechange=function(){
                if( ajax.readyState == 4&&ajax.status == 200 ) {
                    let response=JSON.parse(ajax.responseText).result
                    self.number=response.length

                    console.log(self.number)
                    let ajaxx=new XMLHttpRequest
                    let Url='http://119.29.199.131:80/afweshuaige/api/addarticle'
                    ajaxx.open("post",Url,true)
                    /**草你妈个逼 */
                    /**添加请求头 */
                    /**send 接受 DOM对象，输入流（？）或字符串（日你妈） */
              let object=JSON.stringify({
                    id: self.number+1,
                    title: self.article.articleTitle,
                    contentMd: value,
                    contentHtml: render,
                    abstract: self.article.articleAbstract,
                    cover: self.article.articleCover,
                    date: new Date(),
                    mode:self.article.mode})
              ajaxx.setRequestHeader("Content-type", "application/json; charset=utf-8")
              console.log(object)
              ajaxx.send(object)
              ajaxx.onreadystatechange=function(){
                if( ajaxx.readyState == 4&& ajaxx.status == 200) {
                  self.$message({
                  type: 'info',
                  message: '已保存成功'
                })
              }
            }
          }
        }  
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
      })
    },
    uploadImg(){
        this.article.articleCover = this.$refs.imgUpload.url
    }
  }
}
</script>
