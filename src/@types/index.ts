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

export type ticketUpdate = {
  ticketId: string;
  ticketStatus: string;
};

export type Agent = {
  _id: string;
  type: string;
  email: string;
  name: string;
  mobileNumber: number;
  properties: Propery[];
  profilePhoto: string;
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
  createdAt:string;
  featured:boolean;
  toggle:string;
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
