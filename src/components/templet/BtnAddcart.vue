<template>
  <div id="btnaddcart">
    <div :class="'btn-addcart b-a-' + dishindex" @click="addcart()"></div>
  </div>
</template>

<script>
export default {
	name: 'BtnAddcart',
    data() {
        return {
            // 进来的数据
            dishitem: [],
            dishindex:0
        }
    },
    props: {
        dishitem:{
            type: Object,
            default: function () {
                return [];
            }
        },
        dishindex:Number,
    },
    mounted() {
    },
    watch:{
    },
    methods: {
        addcart: function(){
            alert(this.dishitem.name);
            // var that = this;
            // var dishItem = that.dishitem;
            // console.log(dishItem)
        }
    }
}
</script>