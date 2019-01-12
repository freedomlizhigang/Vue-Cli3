<template>
    <CheckboxGroup v-model="store_ids" @on-change="storeCheck">
        <Checkbox v-for="item in store" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
        <Button size="small" type="success" @click="selectAll()">全选</Button>
        <Button size="small" type="default" @click="cancelAll()">取消</Button>
    </CheckboxGroup>
</template>

<script>
export default {
    name: 'StoreList',
    data () {
        return {
            store: [],
            store_ids: [],
        }
    },
    mounted() {
    },
    created: function () {
        this.$api.store.list({size:100000}).then(res=>{
            if(res.code == 200)
            {
                this.store = res.data.list;
            }
        });
    },
    methods:{
        cancelAll(){
            this.store_ids = [];
        },
        selectAll(){
            this.store_ids = [];
            this.store.forEach((item,index)=>{
                this.store_ids.push(item.id);
            });
        },
        storeCheck(data){
            this.store_ids = data;
        },
    },
}
</script>
