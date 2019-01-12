<template>
  <div class="dish-1008">
    <Row>
        <Col :xs="24" :sm="24">
            <Form :model="params" ref="params" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <store-list v-model="params.store_ids" ref="storelist"></store-list>
                </FormItem>
                <FormItem>
                    <Select v-model="params.dish_type" :style="{'width':'180px'}">
                        <Option :value="item.cBigClasID" :key="item.cBigClasID" v-for="item in dishClass">{{ item.cBigClasName }}</Option>
                    </Select>
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
        <Col :xs="12">
            <div ref="echartDemo" class="echart"></div>
        </Col>
        <Col :xs="12">
            <div ref="echartDemo2" class="echart"></div>
        </Col>

        <Col :xs="12" class="mt20">
            <div ref="echartDemo3" class="echart"></div>
        </Col>
        <Col :xs="12" class="mt20">
            <div ref="echartDemo4" class="echart"></div>
        </Col>
    </Row>
  </div>
</template>

<style>
    .echart {
        width: 100%; min-height: 650px;
    }
</style>

<script>
import StoreList from './StoreList'
export default {
    name: 'dish-1008',
    data () {
        return {
            loading: false,
            params:{
                datetime:'',
                dish_type:'',
                store_ids:[]
            },
            dish_good_rank:{
                title:{
                        text:'菜品好评排行'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            dish_good_pie:{
                title : {
                    text: '菜品好评占比',
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false
                },
                series : [
                    {
                        name: '菜品',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（份） {d}%',
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            dish_bad_rank:{
                title:{
                        text:'菜品差评排行'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            dish_bad_pie:{
                title : {
                    text: '菜品差评占比',
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false
                },
                series : [
                    {
                        name: '菜品',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（份） {d}%',
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            dishClass:[],
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
        this.$api.dish.bigclass().then(res=>{
            if(res.code == 200)
            {
                this.dishClass = res.data;
            }
        });
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
            if (this.params.dish_type == '') {
                this.$Message.error('请先分类...');
                this.loading = false;
                return;
            }
            this.params.store_ids = this.$refs.storelist.store_ids;
            if (this.params.store_ids.length <= 0) {
                this.$Message.error('请先选择门店...');
                this.loading = false;
                return;
            }
            var params = {start_date:start_date,end_date:end_date,dish_type:this.params.dish_type,store_ids:this.params.store_ids};
            this.$api.yye.d1008(params).then(res=>{
                if(res.code == 200)
                {
                    // 满意标签排行
                    this.dish_good_rank.yAxis.data = res.data.good_titles
                    this.dish_good_rank.series[0].data = res.data.good_series
                    var main = this.$refs.echartDemo;
                    let myChart = this.$echarts.init(main);
                    myChart.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart.setOption(this.dish_good_rank);
                    // 满意标签占比
                    this.dish_good_pie.series[0].data = res.data.good_series
                    var main2 = this.$refs.echartDemo2;
                    let myChart2 = this.$echarts.init(main2);
                    myChart2.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart2.setOption(this.dish_good_pie);
                    // 不满意标签排行
                    this.dish_bad_rank.yAxis.data = res.data.bad_titles
                    this.dish_bad_rank.series[0].data = res.data.bad_series
                    var main3 = this.$refs.echartDemo3;
                    let myChart3 = this.$echarts.init(main3);
                    myChart3.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart3.setOption(this.dish_bad_rank);
                    // 不满意标签占比
                    this.dish_bad_pie.series[0].data = res.data.bad_series
                    var main4 = this.$refs.echartDemo4;
                    let myChart4 = this.$echarts.init(main4);
                    myChart4.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart4.setOption(this.dish_bad_pie);
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
