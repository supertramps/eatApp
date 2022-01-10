import { MenuItem } from "../context/CartContext";
export interface MenuItemType {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category: string[];
  img: string;
}

export interface IncomingUser {
  email: string;
  password: string;
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  ID?: string;
  backgroundImg?: string;
  themeColor?: string;
}

export interface UserDb {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}
export interface Order {
  id?: string;
  orderDate: string;
  cart: MenuItem[];
  session: UserDb;
  priceTotal: number;
  table: string;
  payment: any;
  paymentType: string;
}
export interface IncomingUser {
  email: string;
  password: string;
}
