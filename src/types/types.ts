export interface CableData {
  [key: string]: {
    [key: string]: CableInfo[]; 
  };
}

interface CableInfo {
  name: string;
  value: number;
  unit: string;
}