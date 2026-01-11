'use client';

import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  PackageOpen
} from "lucide-react";

// --- TYPES ---

export type ColumnDef<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode; 
  className?: string;
  align?: 'left' | 'center' | 'right';
};

interface PaginationState {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: PaginationState;
}

// --- REUSABLE COMPONENT: DATA TABLE ---

function DataTable<T extends { id: string | number }>({ 
  title, 
  description, 
  data, 
  columns, 
  isLoading = false,
  emptyMessage = "لا يوجد بيانات متاحة",
  pagination
}: DataTableProps<T>) {
  
  // Helper to generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const delta = 1; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let l;
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-none flex flex-col h-full min-h-100">
      
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex justify-between items-end shrink-0">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">{title}</h3>
          {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
        </div>



      </div>

      {/* Table Body Container */}
      <div className="overflow-x-auto flex-1 relative">
        <table className="w-full text-start text-sm text-neutral-600">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase font-semibold text-neutral-500 sticky top-0 z-10">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-start'} ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-200">
            {/* LOADING STATE */}
            {isLoading && (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse bg-white">
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="h-4 bg-neutral-100 w-3/4 mb-1" />
                    </td>
                  ))}
                </tr>
              ))
            )}

            {/* EMPTY STATE */}
            {!isLoading && data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 flex items-center justify-center text-secondary">
                       <PackageOpen size={64} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-neutral-900 font-medium text-base uppercase">{emptyMessage ?? 'No Results Found'}</p>
                      {/* <p className="text-neutral-500 text-sm"></p> */}
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {/* DATA ROWS */}
            {!isLoading && data.map((item) => (
              <tr 
                key={item.id} 
                className="bg-white hover:bg-secondary/5 transition-colors group"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`px-6 py-4 border-b border-neutral-100 ${col.align === 'right' ? 'text-right' : 'text-start'}`}>
                    {col.cell ? col.cell(item) : (col.accessorKey ? String(item[col.accessorKey]) : '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      {pagination && (
        <div className="px-6 py-4 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
           
           <div className="text-sm text-neutral-500 font-medium">
              Showing page <span className="text-neutral-900">{pagination.currentPage}</span> of <span className="text-neutral-900">{pagination.totalPages}</span>
           </div>
           
           <div className="flex items-center gap-1">
              {/* Prev Button */}
              <button 
                onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1 || isLoading}
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-none border border-neutral-200 text-black bg-accent hover:bg-accent/80 hover:text-neutral-900 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Numbered Buttons */}
              <div className="hidden sm:flex items-center gap-1">
                {getPageNumbers().map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-neutral-400 bg-gray-100">
                        <MoreHorizontal size={14} />
                      </span>
                    );
                  }
                  
                  const isCurrent = page === pagination.currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => pagination.onPageChange(Number(page))}
                      disabled={isLoading}
                      className={`
                        w-8 h-8 text-sm font-medium border transition-colors
                        ${isCurrent 
                          ? 'bg-primary border-primary text-white' 
                          : 'bg-gray-100 border-gray-100 text-neutral-600 hover:bg-gray-200 cursor-pointer'}
                      `}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button 
                onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                disabled={pagination.currentPage === pagination.totalPages || isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-none border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;