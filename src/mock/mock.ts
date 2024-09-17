import { AdsType } from "@/types/AdsTypes";
import { CategoryListType } from "@/types/Category";
import { StateType } from "@/types/States";

export const mockStates: StateType[] = [
  {
    value: "SP",
    text: "Sao Paulo",
  },
  {
    value: "RJ",
    text: "Rio de Janeiro",
  },
  {
    value: "DF",
    text: "Distrito Federal",
  },
];

export const mockCategories: CategoryListType = [
  {
    id: "1",
    img: "https://www.svgrepo.com/show/387188/clothes-suit.svg",
    name: "Roupas",
    bg: "bg-blue-200",
  },
  {
    id: "2",
    img: "https://www.svgrepo.com/show/533551/car.svg",
    name: "Carros",
    bg: "bg-orange-200",
  },
  {
    id: "3",
    img: "https://www.svgrepo.com/show/456199/computer-monitor.svg",
    name: "Eletronicos",
    bg: "bg-red-200",
  },
  {
    id: "4",
    img: "https://www.svgrepo.com/show/119665/soccer-ball.svg",
    name: "Esportes",
    bg: "bg-green-200",
  },
];

const today = new Date();

export const mockAdsList: AdsType[] = [
  {
    id: "1",
    title: "Pickles delicioso",
    price: 58,
    priceNegotiable: false,
    state: "SP",
    text: "Pickles",
    src: "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    images: [
      "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
      "https://www.mrswages.com/wp-content/uploads/2022/11/iStock-1159797826-whole-pickles-scaled.jpg",
    ],
    dateCreated: today,
    views: 1,
  },
  {
    id: "2",
    title: "Item interessante",
    price: 58,
    priceNegotiable: true,
    state: "RJ",
    text: "Outro item interessante",
    src: "https://www.mrswages.com/wp-content/uploads/2022/11/iStock-1159797826-whole-pickles-scaled.jpg",
    images: [
      "https://www.mrswages.com/wp-content/uploads/2022/11/iStock-1159797826-whole-pickles-scaled.jpg",
      "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    ],
    dateCreated: today,
    views: 10,
  },
  {
    id: "3",
    title: "Olha a Fralda",
    price: 99,
    priceNegotiable: false,
    state: "DF",
    text: "Fralda",
    src: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2023-12/pickles-mc-231211-49393d.jpg",
    dateCreated: today,
    views: 21,
  },
  {
    id: "4",
    title: "Titulo do Anuncio",
    price: 199.99,
    priceNegotiable: false,
    state: "DF",
    text: "Carro Velho",
    src: "https://carrefourbrfood.vtexassets.com/arquivos/ids/162330181/pickles-carrefour-classic-200-g-1.jpg?v=638545965507770000",
    dateCreated: today,
    views: 41,
  },
  {
    id: "5",
    title: "Titulo do Anuncio",
    price: 15,
    priceNegotiable: true,
    state: "DF",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, deleniti. Veritatis placeat et laborum natus eum officiis porro dolorem cupiditate esse, perspiciatis nulla rem cum ad? Non quam sint molestiae.",
    src: "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    dateCreated: today,
    views: 31,
  },
  {
    id: "6",
    title: "Titulo do Anuncio",
    price: 32,
    priceNegotiable: false,
    state: "DF",
    text: "Celular Novo",
    src: "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    dateCreated: today,
    views: 11,
  },
  {
    id: "7",
    title: "Titulo do Anuncio",
    price: 95.7,
    priceNegotiable: false,
    state: "DF",
    text: "Mouse ultima geraçao",
    src: "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    dateCreated: today,
    views: 1,
  },
  {
    id: "8",
    title: "Titulo do Anuncio",
    price: 77.99,
    priceNegotiable: false,
    state: "DF",
    text: "Bola",
    src: "https://platform.relish.com/wp-content/uploads/2023/05/Pickles.png",
    dateCreated: today,
    views: 1,
  },
];
