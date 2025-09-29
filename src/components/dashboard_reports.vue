<template>
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Reports And Statistics</h1>
        <h3 class="text-gray-600">Monitor and export reports</h3>
      </div>
      <div class="flex gap-5">
        <button
          @click="downloadPDF"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
        >
          <font-awesome-icon icon="file-pdf" class="mr-1" />Download as PDF
        </button>
      </div>
    </div>

    <!-- Content for both screen and PDF -->
    <div id="pdf-content" class="content-container">
      <!-- Stats Cards - Will be 4 columns on screen, 3 columns in PDF -->
      <div class="stats-grid">
        <Card
          :title="`Total Ambulances`"
          :count="stats.ambulances"
          :icon="`ambulance`"
          :bg_color="`blue`"
          :icon_color="`green`"
        />
        <Card
          :title="`Total Emergencies`"
          :count="stats.emergencies"
          :icon="`exclamation-triangle`"
          :bg_color="`blue`"
          :icon_color="`red`"
        />
        <Card
          :title="`Total Users`"
          :count="stats.users"
          :icon="`user`"
          :bg_color="`blue`"
          :icon_color="`blue`"
        />
        <Card
          :title="`Total Crews`"
          :count="stats.crews"
          :icon="`people-group`"
          :bg_color="`blue`"
          :icon_color="`green`"
        />
        <Card
          :title="`Total Stations`"
          :count="stats.stations"
          :icon="`map-location`"
          :bg_color="`blue`"
          :icon_color="`yellow`"
        />
        <Card
          :title="`Total Dispatchers`"
          :count="stats.dispatchers"
          :icon="`headset`"
          :bg_color="`blue`"
          :icon_color="`green`"
        />
        <Card
          :title="`Total Drivers`"
          :count="stats.drivers"
          :icon="`drivers-license`"
          :bg_color="`blue`"
          :icon_color="`blue`"
        />
        <Card
          :title="`Total Medics`"
          :count="stats.medics"
          :icon="`medkit`"
          :bg_color="`blue`"
          :icon_color="`green`"
        />
      </div>

      <!-- Charts - Will be 2 columns on screen, 1 column in PDF -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Users Pie Chart</h3>
          </div>
          <ChartComponent
            type="pie"
            title="Platform"
            :labels="['Mobile Application', 'Traditional Way']"
            :data="[1500, 3000]"
          />
        </div>

        <div class="chart-card">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Emergencies Pie Chart</h3>
          </div>
          <ChartComponent
            type="pie"
            title="Incident Types"
            :labels="['Bombing', 'Heart Attack', 'Fire', 'Breaks']"
            :data="[1500, 90, 158, 387]"
          />
        </div>

        <div class="chart-card">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Emergencies-Time Line Chart</h3>
          </div>
          <ChartComponent
            type="line"
            title="Emergencies"
            :labels="[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'June',
              'July',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]"
            :data="[1586, 150, 496, 700, 654, 1235, 1111, 2036, 5398, 0, 0, 0]"
          />
        </div>

        <div class="chart-card">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Response Time-Time Line Chart</h3>
          </div>
          <ChartComponent
            type="line"
            title="Response Times"
            :labels="[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'June',
              'July',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]"
            :data="[30.2, 28.8, 27.1, 23.0, 20.5, 20.1, 15.7, 14.0, 12.8, 0, 0, 0]"
          />
        </div>

        <div class="bg-white p-6 rounded shadow">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Users_Time Bar Chart</h3>
          </div>
          <ChartComponent
            type="bar"
            title="Users"
            :labels="['Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep']"
            :data="[120, 325, 482, 705, 1048, 1387, 1583]"
          />
        </div>

        <div class="bg-white p-6 rounded shadow">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Top Crews Bar Chart</h3>
          </div>
          <ChartComponent
            type="bar"
            title="Top Crews"
            :labels="['#C1', '#C2', '#C3', '#C4', '#C5']"
            :data="[120, 230, 80, 145, 99]"
          />
        </div>

        <div class="bg-white p-6 rounded shadow">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Platform Pie Chart</h3>
          </div>
          <ChartComponent
            type="pie"
            title="Platform"
            :labels="['101', 'App', 'SMS']"
            :data="[2537, 932, 583]"
          />
        </div>

        <div class="bg-white p-6 rounded shadow">
          <div class="mb-5">
            <h3 class="text-lg text-black-500 font-bold">Dispatcher-Emergencies Bar Chart</h3>
          </div>
          <ChartComponent
            type="bar"
            title="Requests per Day"
            :labels="['#D1', '#D2', '#D3', '#D4', '#D5']"
            :data="[155, 162, 143, 120, 235]"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import ChartComponent from '@/components/Chart.vue'
import Card from '@/components/Card.vue'

const stats = ref({
  ambulances: 35,
  emergencies: 7589,
  users: 2568,
  crews: 40,
  stations: 15,
  dispatchers: 45,
  drivers: 40,
  medics: 90,
})

const downloadPDF = () => {
  // Generate dynamic filename with date and time
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0] // YYYY-MM-DD
  const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-') // HH-MM-SS
  const filename = `System_Report_${dateStr}_${timeStr}.pdf`

  const element = document.getElementById('pdf-content')
  const options = {
    margin: [0.5, 0.5, 0.7, 0.5],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      onclone: function (clonedDoc) {
        // Add PDF-specific CSS to the cloned document
        const style = clonedDoc.createElement('style')
        style.textContent = `
          /* PDF-specific styles */
          .content-container {
            font-family: 'Arial', sans-serif !important;
          }
          
          /* Stats grid: 3 columns in PDF */
          .stats-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
            margin-bottom: 30px !important;
          }
          
          /* Charts grid: 1 column in PDF */
          .charts-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          /* Chart cards styling for PDF */
          .chart-card {
            background: white !important;
            padding: 20px !important;
            border: 1px solid #e5e7eb !important;
            border-radius: 8px !important;
            page-break-inside: avoid !important;
            margin-bottom: 20px !important;
          }
          
          .chart-card h3 {
            font-size: 18px !important;
            font-weight: bold !important;
            color: #1f2937 !important;
            margin-bottom: 15px !important;
            border-bottom: 2px solid #3b82f6 !important;
            padding-bottom: 8px !important;
          }
          
          /* Ensure charts are properly sized for PDF */
          canvas {
            max-width: 100% !important;
            height: 300px !important;
          }
          
          /* Hide download buttons in PDF */
          button {
            display: none !important;
          }
          
          /* Add some spacing for better PDF layout */
          .content-container > * {
            margin-bottom: 25px !important;
          }
        `
        clonedDoc.head.appendChild(style)
      },
    },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }
  window.html2pdf().set(options).from(element).save()
}
</script>

<style scoped>
/* Screen styles (normal layout) */
.content-container {
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.chart-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
