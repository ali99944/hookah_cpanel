// src/features/dashboard/components/revenue_chart.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface RevenueChartProps {
  data: number[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: 'jazeera, sans-serif', // Arabic Font
      toolbar: { show: false },
      // RTL Support in ApexCharts isn't automatic, but we align text manually
    },
    colors: ['var(--primary)'], // Primary Brand Color
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false, style: {
      fontFamily: 'jazeera, sans-serif'
    } },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      labels: { style: { fontFamily: 'jazeera, sans-serif', fontSize: '12px' } }
    },
    yaxis: {
      labels: {
        style: { fontFamily: 'jazeera, sans-serif', fontSize: '12px' },
        formatter: (value) => `${value} ج.م`
      },
      opposite: true, // Moves Y-axis to the right for RTL feel
    },
    grid: { show: true, borderColor: 'var(--border)' },
    tooltip: {
      theme: 'light',
      style: { fontFamily: 'jazeera, sans-serif' },
      marker: { show: false },
    }
  };

  const series = [{ name: 'المبيعات', data: data }];

  return (
    <div className="bg-white border border-border p-6 h-full text-right">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary">تحليل الإيرادات</h3>
        <p className="text-xs text-text-muted">إجمالي الدخل للأيام الـ 7 الماضية</p>
      </div>
      <div className="h-[300px] w-full" dir="ltr"> 
        {/* We keep chart container LTR to avoid SVG rendering issues, but labels are Arabic */}
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
};