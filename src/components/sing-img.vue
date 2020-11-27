<template>
    <img :src="imgHref" class="theImg">
</template>
<script>
export default {
    name:'singe-img',
    props:{
        imgHref:String
    }
}
</script>
<style scoped>
    .theImg{
        
    }
</style>