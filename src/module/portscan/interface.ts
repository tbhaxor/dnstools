export interface PortScanData {
  port: number;
  service: string;
  isOpen: boolean;
}

export type PortScanCallBack = (err?: Error, data?: PortScanData[]) => void;
