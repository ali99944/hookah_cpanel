import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface OrderStatusChartProps {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  paid: number;
}

export const OrderStatusChart: React.FC<OrderStatusChartProps> = ({
  pending,
  processing,
  shipped,
  delivered,
  cancelled,
  paid,
}) => {
  const labels = ['قيد الانتظار', 'قيد التجهيز', 'تم الشحن', 'تم التوصيل', 'ملغي'];
  const series = [pending, processing, shipped, delivered, cancelled].map((value) => Number(value || 0));
  const total = series.reduce((sum, value) => sum + value, 0);
  const hasData = total > 0;

  const chartSeries = hasData ? series : [1, 1, 1, 1, 1];
  const chartColors = hasData
    ? ['#f59e0b', '#4f39f6', '#7c3aed', '#006045', '#bc4749']
    : ['#e5e7eb', '#e5e7eb', '#e5e7eb', '#e5e7eb', '#e5e7eb'];

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: 'donut',
      fontFamily: 'jazeera, sans-serif',
      toolbar: { show: false },
    },
    labels,
    colors: chartColors,
    dataLabels: {
      enabled: true,
      formatter: (_value, opts) => {
        if (!hasData) return '0';
        return String(series[opts.seriesIndex]);
      },
      style: {
        fontFamily: 'jazeera, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
      },
    },
    stroke: {
      width: 2,
      colors: ['#ffffff'],
    },
    legend: {
      position: 'bottom',
      fontFamily: 'jazeera, sans-serif',
      fontSize: '12px',
      labels: {
        colors: '#6b7280',
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 16,
              color: '#6b7280',
              fontSize: '12px',
              fontFamily: 'jazeera, sans-serif',
            },
            value: {
              show: true,
              offsetY: -10,
              color: '#111827',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'jazeera, sans-serif',
              formatter: () => String(total),
            },
            total: {
              show: true,
              showAlways: true,
              label: 'إجمالي الطلبات',
              color: '#6b7280',
              fontFamily: 'jazeera, sans-serif',
              formatter: () => String(total),
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (_value, opts) => `${hasData ? series[opts.seriesIndex] : 0} طلب`,
      },
      style: {
        fontFamily: 'jazeera, sans-serif',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.05,
        },
      },
    },
  }), [chartColors, hasData, labels, series, total]);

  return (
    <div className="bg-white border border-border p-6 h-full flex flex-col text-right">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-text-primary">أداء الطلبات</h3>
        <p className="text-xs text-text-muted">توزيع الطلبات حسب جميع الحالات</p>
      </div>

      <div className="h-[320px]" dir="ltr">
        <Chart options={options} series={chartSeries} type="donut" height="100%" />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-text-muted">حالة الدفع</span>
        <span className="px-2 py-1 bg-[#dbeafe] text-[#1e40af] font-bold">مدفوع: {paid}</span>
      </div>
    </div>
  );
};
