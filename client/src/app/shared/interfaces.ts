export interface User {
  email: string,
  password: string
}

export interface Message {
  [x: string]: string;

}

export interface Category{
  [x: string]: any;
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}
