export interface FSLPItem {
  application: Application;
  collectionId: string;
  collectionName: string;
  created: string;
  cv: string;
  id: string;
  pic: string;
  status: string;
  updateBy: string;
  updated: string;
  user: string;
}

export interface Application {
  address: string;
  city: string;
  country: string;
  dob: string;
  eduState: string;
  emailID: string;
  firstName: string;
  gender: string;
  lastName: string;
  mobileNo: string;
  nationality: string;
  postCode: string;
  sortBreif: string;
  universityName: string;
}
