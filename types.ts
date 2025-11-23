export interface KpiData {
  label: string;
  value: number;
  unit?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  note?: string;
}

export interface NetworkData {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

export interface HardwareData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ProjectData {
  name: string;
  manager: string;
  status: string;
  kpis: {
    excavation: KpiData;
    reinstatement: KpiData;
    openTrenches: KpiData;
    hdpe: KpiData;
    poles: KpiData;
  };
  network: NetworkData[];
  hardware: HardwareData[];
}