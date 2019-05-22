<template>
  <div id="member" class="header-padding">
    <!-- 头部导航 -->
    <header class="topnav">
        <router-link to="/" class="backhome"></router-link>
    </header>
    <!-- 关闭 -->
    <div class="close-login" @click="startMenus()"></div>
    <!-- 输入登录 -->
    <div class="loginform">
    	<input type="text" placeholder="请输入手机号" class="login-text">
    	<span class="btn-m btn-login" @click="loginMember()">登录</span>
    </div>
    <img src="img/qrcode.jpg" alt="" class="ewmreg">
  </div>
</template>


<script>
import router from '.././router'
export default {
	name: 'Member',
    data() {
        return {
            
        }
    },
    components: {
    },
    computed: {
    },
    mounted() {
    	
    },
    methods: {
        startMenus(){
            router.push('/menus');
        },
        loginMember(){
            router.push('/welcome');
        }
    }
}
</script>