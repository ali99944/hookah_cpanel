import { create } from 'zustand';
import { useEffect } from 'react';

interface LayoutState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));

// Custom hook to handle mobile sidebar behavior
export const useMobileSidebar = () => {
  const setSidebarOpen = useLayoutStore((state) => state.setSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // 768px is typical mobile breakpoint (md in Tailwind)
      
      if (isMobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);
};

// Usage in your root layout or main app component:
// import { useMobileSidebar } from '@/store/layout-store';
//
// function App() {
//   useMobileSidebar();
//   return <YourApp />;
// }