import { create } from 'zustand'

const useSidebarStore = create(set => ({
  showSidebar: false,
  setShowSidebar: status => set({ showSidebar: status }),
  closeSidebar: () => set({ showSidebar: false }),
}))

export default useSidebarStore
