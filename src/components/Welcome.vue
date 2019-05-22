<template>
  <div id="welcome">
    <img src="img/1.gif" class="welcome-video">
    <div class="video-zz" @click="startMenus()"></div>
  </div>
</template>


<script>
import router from '.././router'
export default {
	name: 'Welcome',
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
        }
    }
}
</script>