<template>
  <div class="customer-1004">
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
        <Col :xs="12">
            <div ref="echartDemo3" class="echart"></div>
        </Col>
        <Col :xs="12">
            <div ref="echartDemo4" class="echart"></div>
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
    name: 'customer-1004',
    data () {
        return {
            loading: false,
            params:{
                datetime:'',
                store_ids:[]
            },
            person_option:{
                title : {
                    text: '人群属性',
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
                        name: '属性',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（个） {d}%',
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
            yc_option:{
                title : {
                    text: '用餐性质',
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
                        name: '属性',
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
            new_option:{
                title : {
                    text: '新老客比例',
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
                        name: '属性',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（个） {d}%',
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
            member_option:{
                title : {
                    text: '会员比例',
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
                        name: '属性',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data: [],
                        label: {
                            normal: {
                                formatter: '{b}\n{c}（个） {d}%',
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
            this.$api.yye.c1004(params).then(res=>{
                if(res.code == 200)
                {
                    console.log(res.data)
                    // 顾客属性
                    this.person_option.series[0].data = res.data.person_series
                    var main = this.$refs.echartDemo;
                    let myChart = this.$echarts.init(main);
                    myChart.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart.setOption(this.person_option);
                    // 用餐性质
                    this.yc_option.series[0].data = res.data.yc_series
                    var main2 = this.$refs.echartDemo2;
                    let myChart2 = this.$echarts.init(main2);
                    myChart2.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart2.setOption(this.yc_option);
                    // 新老客
                    this.new_option.series[0].data = res.data.new_series
                    var main3 = this.$refs.echartDemo3;
                    let myChart3 = this.$echarts.init(main3);
                    myChart3.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart3.setOption(this.new_option);
                    // 会员
                    this.member_option.series[0].data = res.data.member_series
                    var main4 = this.$refs.echartDemo4;
                    let myChart4 = this.$echarts.init(main4);
                    myChart4.clear(); //如果图表有修改需求建议加上此方法先清后画
                    myChart4.setOption(this.member_option);
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
