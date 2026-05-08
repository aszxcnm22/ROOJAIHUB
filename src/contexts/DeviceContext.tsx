import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Device {
  id: string;
  name: string;
  status: 'Sync' | 'Connect' | 'Connecting' | 'Connected';
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Device) => void;
  updateDeviceStatus: (id: string, status: Device['status']) => void;
  removeDevice: (id: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'AppleWatch', status: 'Sync' }
  ]);

  const addDevice = (device: Device) => {
    setDevices((prev) => [...prev, device]);
  };

  const updateDeviceStatus = (id: string, status: Device['status']) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const removeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice, updateDeviceStatus, removeDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
}
