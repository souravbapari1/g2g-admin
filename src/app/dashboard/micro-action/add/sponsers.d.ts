export interface SponsorsData {
  homePages: HomePage[];
}

export interface HomePage {
  sponsors: Sponsor[];
}

export interface Sponsor {
  name: string;
  id: string;
}
