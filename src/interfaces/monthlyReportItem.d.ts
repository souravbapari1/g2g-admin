export interface MonthlyReportItem {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  month: string;
  report_key: string;
  updated: string;
  user: string;
  week1: Week | null;
  week2: Week | null;
  week3: Week | null;
  week4: Week | null;
  year: string;
}

export interface Week {
  challenges: Challenge[];
  events: Event[];
  nextStep: string;
  summery: string;
}

export interface Challenge {
  file: File[];
  title: string;
  whatYouDid: string;
}

export interface File {
  file: File2;
  id: number;
  path: string;
  url: string;
  user: string;
}

export interface File2 {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface Event {
  activates: string;
  file: File3[];
  outcomes: string;
  title: string;
}

export interface File3 {
  file: File4;
  id: number;
  path: string;
  url: string;
  user: string;
}

export interface File4 {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}
