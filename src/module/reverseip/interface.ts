export interface ReverseIPData {
  domain: string;
  lastResolved: Date;
}

export type ReverseIPCallback = (err?: Error, data?: ReverseIPData[]) => void;
