import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface RevenueChartProps {
  data: number[];
  labels?: string[];
}

const defaultLabels = ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'];
const defaultData = [0, 0, 0, 0, 0, 0, 0];

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, labels }) => {
  const safeLabels = labels && labels.length > 0 ? labels : defaultLabels;
  const safeData = data && data.length > 0 ? data : defaultData;
  const allZero = safeData.every((value) => Number(value) === 0);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: 'area',
      fontFamily: 'jazeera, sans-serif',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['var(--primary)'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: allZero ? 0.08 : 0.25,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2, dashArray: allZero ? 4 : 0 },
    xaxis: {
      categories: safeLabels,
      labels: { style: { fontFamily: 'jazeera, sans-serif', fontSize: '12px' } },
    },
    yaxis: {
      min: 0,
      labels: {
        style: { fontFamily: 'jazeera, sans-serif', fontSize: '12px' },
        formatter: (value) => `${value.toFixed(0)} ج.م`,
      },
      opposite: true,
    },
    grid: { show: true, borderColor: 'var(--border)' },
    tooltip: {
      theme: 'light',
      style: { fontFamily: 'jazeera, sans-serif' },
      marker: { show: false },
      y: {
        formatter: (value) => `${Number(value).toFixed(2)} ج.م`,
      },
    },
  }), [allZero, safeLabels]);

  const series = [{ name: 'المبيعات', data: safeData.map((value) => Number(value || 0)) }];

  return (
    <div className="bg-white border border-border p-6 h-full text-right">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-text-primary">تحليل الإيرادات</h3>
        <p className="text-xs text-text-muted">إجمالي الدخل خلال آخر 7 أيام</p>
      </div>
      <div className="h-[300px] w-full relative" dir="ltr">
        <Chart options={options} series={series} type="area" height="100%" />
        {allZero && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="bg-white/90 border border-border px-4 py-2 text-xs text-text-muted">
              لا توجد بيانات مبيعات كافية بعد
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
