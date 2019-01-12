<template>
  <div class="problem-1006">
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
        <Col :xs="12" class="mt20">
            <div ref="echartDemo5" class="echart"></div>
        </Col>
        <Col :xs="12" class="mt20">
            <div ref="echartDemo6" class="echart"></div>
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
    name: 'problem-1006',
    data () {
        return {
            loading: false,
            params:{
                datetime:'',
                dish_type:'',
                store_ids:[]
            },
            tags_rank_1:{
                title:{
                        text:'满意标签排行'
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
            tags_pie_1:{
                title : {
                    text: '满意标签占比',
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
                        name: '标签',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（次） {d}%',
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
            tags_rank_2:{
                title:{
                        text:'差评标签排行'
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
            tags_pie_2:{
                title : {
                    text: '差评标签占比',
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
                        name: '标签',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（次） {d}%',
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
            solution_rank:{
                title:{
                        text:'解决方案排行'
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
            solution_pie:{
                title : {
                    text: '解决方案占比',
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
                        name: '解决方案',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（次） {d}%',
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
            this.$api.yye.p1006(params).then(res=>{
                if(res.code == 200)
                {
                    // 满意标签排行
                    this.tags_rank_1.yAxis.data = res.data.my_titles
                    this.tags_rank_1.series[0].data = res.data.my_series
                    var main = this.$refs.echartDemo;
                    let myChart = this.$echarts.init(main);
                    myChart.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart.setOption(this.tags_rank_1);
                    // 满意标签占比
                    this.tags_pie_1.series[0].data = res.data.my_series
                    var main2 = this.$refs.echartDemo2;
                    let myChart2 = this.$echarts.init(main2);
                    myChart2.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart2.setOption(this.tags_pie_1);
                    // 差评标签排行
                    this.tags_rank_2.yAxis.data = res.data.bmy_titles
                    this.tags_rank_2.series[0].data = res.data.bmy_series
                    var main3 = this.$refs.echartDemo3;
                    let myChart3 = this.$echarts.init(main3);
                    myChart3.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart3.setOption(this.tags_rank_2);
                    // 差评标签占比
                    this.tags_pie_2.series[0].data = res.data.bmy_series
                    var main4 = this.$refs.echartDemo4;
                    let myChart4 = this.$echarts.init(main4);
                    myChart4.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart4.setOption(this.tags_pie_2);
                    // 解决方案排行
                    this.solution_rank.yAxis.data = res.data.solution_titles
                    this.solution_rank.series[0].data = res.data.solution_series
                    var main5 = this.$refs.echartDemo5;
                    let myChart5 = this.$echarts.init(main5);
                    myChart5.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart5.setOption(this.solution_rank);
                    // 解决方案占比
                    this.solution_pie.series[0].data = res.data.solution_series
                    var main6 = this.$refs.echartDemo6;
                    let myChart6 = this.$echarts.init(main6);
                    myChart6.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart6.setOption(this.solution_pie);
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
