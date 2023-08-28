export type location = {
  name: string;
  _id?: string;
  locationId: string;
  locationImages: string[];
};

export type area = {
  name: string;
  areaId: string;
  _id?: string;
};
export type availableAmenities = {
  name: string;
  icon: any;
};

export type ticketUpdate = {
  ticketId: string;
  ticketStatus: string;
};
export type serviceUpdate = {
  propertyId: string;
  status: string;
};
export type propertyStatus = {
  propertyId: string;
  status: string;
};

export type Agent = {
  _id: string;
  type: string;
  email: string;
  name: string;
  mobileNumber: number;
  properties: Propery[];
  profilePhoto: string;
  agentId: string; 
};

export type Propery = {
  _id: string;
  agentId: Agent;
  name: string;
  cost: number;
  size: number;
  BHKconfig: number;
  address: string;
  availableFor: string;
  description: string;
  propertyImages: string[];
  primaryImage: string;
  purchaseRequests: any[];
  location: location;
  area: area;
  propertyType: string;
  toggle: string;
  amenities: string[];
  propertyTags: string[];
  createdAt: string;
  featured: boolean;
  buildingType:string;
  areaValue:string;
  areaType:string;
  floorNo:number;
  floorCount:number;
  unitNo:number;
  status:string;
  slug:string;
  userType:string;
  // additionalRooms:string[];
  // furnishingStatus:string[];
  // possessionStatus:string[];
  // ageOfProerty:string[];
  // numOfBathroom:string[];
  // numOfParking:string[];
  // view:string[];
  // city:string;
  // userType:string;
  // liftFacility:string;
  // authority:string[];




};
export type ProperyFilter = {
  size: string;
  BHKconfig: string;
  area: string;
  propertyType: string;
  amenities: string[];
  minPrice: string;
  maxPrice: string;
  availableFor: string;
};

export interface ProperyResArr {
  message: string;
  result: Propery[];
}
export interface ProperyRes {
  message: string;
  result: Propery;
}

export interface response<T> {
  message: string;
  result: T;
}
export interface newResponse<T> {
  message: string;
  data: T;
}

export type User = {
  _id: string;
  name: string;
  email: string;
  mobileNumber: number;
};
export type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalUsers: number;
};

export type Buyer = {
  _id: string;
  agent: string;
  message: string;
  property: Propery;
  user: User;
  userId:string;
  userName:string;
  userEmail:string;
  propertyName:string;
};

export type Tickets = {
  _id: string;
  agent: string;
  message: string;
  property: Propery;
  user: User;
  userId:string;
  userName:string;
  userEmail:string;
  propertyName:string;
  tittle:string;
  ticketStatus:string;
};



export interface AvailableFor {
  name: string;
}

export type amenity = {
  _id: string;
  name: string;
};

export type CustomerValuesProps = {
  name: string;
  password: string;
  mobileNumber: string;
  email: string;
};
export type leadsProps = {
  lead: number;
};
export type leadsChangeProps = {
  leadId: string;
  newAgentId: string;
  agentId: string;
};
export type plansProps = {
  numOfLeads: string;
  name: string;
  text: string;
  price: string;
  tags: string[];
};
