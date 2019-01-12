<template>
  <div class="yye-1001">
    <Row>
        <Col :xs="24" :sm="24">
            <Form :model="params" ref="params" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <store-list v-model="params.store_ids" ref="storelist"></store-list>
                </FormItem>
                <FormItem>
                    <DatePicker type="datetimerange" format="yyyy-MM-dd" @on-change="changeDate" style="width: 260px" placeholder="开始时间 - 结束时间"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="getData()" :loading="loading">数据</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
    <Row>
        <Col :xs="24">
            <div ref="echartDemo" class="echart"></div>
        </Col>
    </Row>
  </div>
</template>

<style>
    .echart {
        width: 100%; min-height: 450px;
    }
</style>

<script>
import StoreList from './StoreList'
export default {
    name: 'yye-1001',
    data () {
        return {
            loading: false,
            params:{
                datetime:'',
                store_ids:[]
            },
            option:{
                title:{
                        text:''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['堂食营业额', '外卖营业额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis:  {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '堂食营业额',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    },
                    {
                        name: '外卖营业额',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    },
                ]
            }
        }
    },
    // 组件
    components: {
        StoreList,
    },
    // 挂载完成以后执行
    mounted:function(){
    },
    created: function () {
    },
    methods:{
        getData:function(){
            this.loading = true;
            // 取数据
            var start_date = this.params.datetime[0] != undefined ? this.params.datetime[0] : '';
            var end_date = this.params.datetime[1] != undefined ? this.params.datetime[1] : '';
            if (start_date == '' || end_date== '') {
                this.$Message.error('请先选择时间范围...');
                this.loading = false;
                return;
            }
            this.params.store_ids = this.$refs.storelist.store_ids;
            if (this.params.store_ids.length <= 0) {
                this.$Message.error('请先选择门店...');
                this.loading = false;
                return;
            }
            var params = {start_date:start_date,end_date:end_date,store_ids:this.params.store_ids};
            this.$api.yye.a1001(params).then(res=>{
                if(res.code == 200)
                {
                    this.option.xAxis.data = res.data.store;
                    this.option.series[0].data = res.data.ts;
                    this.option.series[1].data = res.data.wm;
                    var main = this.$refs.echartDemo;
                    let myChart = this.$echarts.init(main);
                    myChart.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart.setOption(this.option);
                }
                this.loading = false;
            });
        },
        changeDate(val){
            this.params.datetime = val;
        },
    },
}
</script>
