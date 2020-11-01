export interface User {
  email: string,
  password: string
}

export interface Message {
  [x: string]: string;

}

export interface Category {
  [x: string]: any;
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}

export interface Position {
   name: string,
   cost: number,
   user?:string,
   category: string,
   _id?: string
}
