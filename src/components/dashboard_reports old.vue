<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto" id="pdf-content">
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
        <button
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
        >
          <font-awesome-icon icon="file-excel" class="mr-1" />Download as Excel
        </button>
      </div>
    </div>
    <!-- Stats Cards -->
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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

    <!-- Charts Cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow">
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

      <div class="bg-white p-6 rounded shadow">
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

      <div class="bg-white p-6 rounded shadow">
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

      <div class="bg-white p-6 rounded shadow">
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
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

// const downloadPDF = () => {
//   const element = document.getElementById('pdf-content')
//   const options = {
//     margin: 0.5,
//     filename: 'System_Report.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
//   }
//   window.html2pdf().set(options).from(element).save()
// }

// const downloadPDF = async () => {
//   try {
//     // Ensure html2pdf is loaded
//     if (typeof window.html2pdf === 'undefined') {
//       console.error('html2pdf not loaded')
//       return
//     }

//     const element = document.getElementById('pdf-content')

//     if (!element) {
//       console.error('PDF content element not found')
//       return
//     }

//     // Add a small delay to ensure charts are rendered
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     const options = {
//       margin: [0.5, 0.5, 0.5, 0.5],
//       filename: `System_Report_${new Date().toISOString().split('T')[0]}.pdf`,
//       image: {
//         type: 'jpeg',
//         quality: 0.98,
//       },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         logging: true,
//         backgroundColor: '#ffffff',
//         scrollY: 0,
//         windowWidth: document.documentElement.offsetWidth,
//         windowHeight: document.documentElement.offsetHeight,
//       },
//       jsPDF: {
//         unit: 'in',
//         format: 'a4',
//         orientation: 'portrait',
//       },
//       pagebreak: { mode: 'avoid-all' },
//     }

//     // Create and download PDF
//     window
//       .html2pdf()
//       .set(options)
//       .from(element)
//       .toPdf()
//       .get('pdf')
//       .then((pdf) => {
//         const totalPages = pdf.internal.getNumberOfPages()
//         // Add page numbers
//         for (let i = 1; i <= totalPages; i++) {
//           pdf.setPage(i)
//           pdf.setFontSize(10)
//           pdf.setTextColor(150)
//           pdf.text(
//             `Page ${i} of ${totalPages}`,
//             pdf.internal.pageSize.getWidth() / 2,
//             pdf.internal.pageSize.getHeight() - 0.3,
//             { align: 'center' },
//           )
//         }
//       })
//       .save()
//   } catch (error) {
//     console.error('Error generating PDF:', error)
//     alert('Error generating PDF. Please check console for details.')
//   }
// }

const downloadPDF = async () => {
  try {
    const element = document.getElementById('pdf-content')

    // Force charts to render completely
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const options = {
      margin: [0.5, 0.5, 0.7, 0.5],
      filename: `System_Report_${new Date().toISOString().split('T')[0]}.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98,
      },
      html2canvas: {
        scale: 3, // Increased scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: function (clonedDoc) {
          // Add styles to ensure charts are visible
          const style = clonedDoc.createElement('style')
          style.textContent = `
            canvas {
              max-width: 100% !important;
              height: auto !important;
              background: white !important;
            }
            .chart-container {
              page-break-inside: avoid !important;
            }
          `
          clonedDoc.head.appendChild(style)
        },
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: 'avoid-all' },
    }

    window
      .html2pdf()
      .set(options)
      .from(element)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages()
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          pdf.setFontSize(10)
          pdf.setTextColor(150)
          pdf.text(
            `Page ${i} of ${totalPages}`,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 0.3,
            { align: 'center' },
          )
        }
      })
      .save()
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}

// Ensure html2pdf is available
onMounted(() => {
  // Add CSS to ensure proper printing
  const style = document.createElement('style')
  style.textContent = `
    @media print {
      button {
        display: none !important;
      }
    }
    canvas {
      max-width: 100% !important;
      height: auto !important;
    }
  `
  document.head.appendChild(style)
})
</script>

<style>
/* Optional: Use CSS to hide the button when printing */
@media print {
  button {
    display: none !important;
  }
}
</style>
