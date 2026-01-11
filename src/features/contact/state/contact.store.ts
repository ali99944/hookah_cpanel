import { create } from 'zustand';
import type { ContactMessage } from '../types';

interface ContactState {
  selectedMessage: ContactMessage | null;
  setSelectedMessage: (message: ContactMessage | null) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  selectedMessage: null,
  setSelectedMessage: (message) => set({ selectedMessage: message }),
}));