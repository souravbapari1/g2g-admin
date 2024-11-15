export interface StatusData {
  city: City[];
  country: Country[];
  status: Status[];
  type: Type[];
  interventions: string[];
}

export interface City {
  id: string;
  city: string;
  total: number;
}

export interface Country {
  country: string;
  total: number;
  id: string;
}

export interface Status {
  id: string;
  status: string;
  total: number;
}

export interface Type {
  id: string;
  type: string;
  name: string;
  total: number;
}
