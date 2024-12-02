export interface RequestState {
  amount: string;
  cityCount: number;
  cityData: CityDaum[];
  requestStatus: RequestStatu[];
  totalOrders: number;
}

export interface CityDaum {
  id: string;
  payment_id: string;
  city: string;
  total_payments: number;
}

export interface RequestStatu {
  status: string;
  total: number;
}
