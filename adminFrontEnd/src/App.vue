<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/

</style>
<!--<script>-->
    <!--export default {-->
        <!--mounted(){-->
            <!--window.addEventListener('hashchange',()=>{-->
                <!--var currentPath = window.location.hash.slice(1); // 获取输入的路由-->
                <!--if(this.$router.path !== currentPath){-->
                    <!--this.$router.push(currentPath); // 动态跳转-->
                <!--}-->
            <!--},false);-->
        <!--}-->
    <!--}-->
<!--</script>-->