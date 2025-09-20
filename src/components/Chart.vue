<template>
  <v-chart class="h-72 w-full" :option="chartOptions" autoresize />
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

// Register needed modules
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

// Props
const props = defineProps({
  type: { type: String, default: 'bar' }, // bar, line, pie
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  title: { type: String, default: '' },
})

// Computed chart options
const chartOptions = computed(() => {
  if (['bar', 'line'].includes(props.type)) {
    return {
      title: { text: props.title },
      tooltip: { trigger: 'axis' },
      legend: { data: [props.title] },
      xAxis: { data: props.labels },
      yAxis: {},
      series: [
        {
          name: props.title,
          type: props.type,
          data: props.data,
          smooth: props.type === 'line',
        },
      ],
    }
  }

  if (props.type === 'pie') {
    return {
      title: { text: props.title, left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: props.title,
          type: 'pie',
          radius: '50%',
          data: props.labels.map((label, i) => ({ name: label, value: props.data[i] })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  }
})
</script>
