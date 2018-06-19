// @flow
export type Lists = { [string]:  List };
export type Tasks = { [string]:  Task };
export type ListItems = { [string]:  ListItem };
export type Participants = { [string]:  Participant };
export type Geolocs = { [string]: Geoloc };
export type Assets = { [string]: Asset };
export type EmergencyCalls = { [string]: EmergencyCall };
export type Contacts = { [string]: User};

export interface Geoloc {
  lat: string,
  lng: string,
  time: string
}

export interface Contract {
  endDate : number,
  increase : number,
  nbHours : number,
  normalHourlyRate : number,
  startDate : number,
  type : string
}

export interface Company {
  name: string,
  identification: string,
  address: string,
  zipcode: string,
  geoloc: Geoloc,
  city: string,
  phoneNumber: string,
  Contacts: Contacts,
}

export interface Contact {
  lastName: string,
  firstName: string,
  email: string,
  phoneNumber: string,
}

export interface User {
  _geo: Geolocs,
  profile: Profile,
  tasks: Tasks,
  contracts : Contract,
  extern : boolean,
  isAdmin : boolean,
  status : string,
  sector : string,
  role : string,
}

export interface Profile {
  lastName: string,
  firstName: string,
  birthday: number,
  phoneNumber: string,
  emailNotifications: boolean,
  phoneNotifications: boolean,
  matricule: string,
  name: string
}

export interface List {
  name: string,
  description: string,
  items: ListItems,
  assets : Assets,
  emergencyCalls : EmergencyCalls
}

export interface EmergencyCall {
  timeCall :number,
  userCall :string
}

export interface Asset {
  nameFile : string,
  typeFile : string
}

export interface ListItem {
  title: string,
  done: boolean
}

export interface Task {
  title: string,
  time: number,
  dateStartTask: number,
  dateEndTask : number,
  dateStartNavigation: number,
  dateEndNavigation: number,
  duration : number,
  imageURL: string,
  done: boolean,
  lists: Lists,
  company : string,
  service : string
}

export interface Participant {
  uid: string,
}
