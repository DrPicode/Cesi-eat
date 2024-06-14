import { CiDeliveryTruck } from 'react-icons/ci';
import { IoPricetagOutline } from 'react-icons/io5';

//RecommendRestaurant;
import menu1 from './assets/menu1.png';
import menu2 from './assets/menu2.png';
import menu3 from './assets/menu3.png';
import menu4 from './assets/menu4.png';
import menu5 from './assets/menu5.png';
//RecommendRestaurant;
import mcdo from './assets/mcdo.png';
import sushishop from './assets/Sushi_Shop.jpg';
import eatsalad from './assets/eatsalad.png';
import heiko from './assets/heiko.jpg';
//Food

import beefSandwichImage from './assets/boeuf.jpg';
import chickenSandwichImage from './assets/poulet.jpg';
import fishSandwichImage from './assets/poisson.jpg';
import friesImage from './assets/frites.jpg';
import potatoesImage from './assets/potatoes.jpg';
import saladImage from './assets/salade.jpg';
import cocaImage from './assets/cocacola.jpg';
import fantaImage from './assets/fanta.jpg';
import iceTeaImage from './assets/icetea.jpg';
import {round} from "lodash";

//RecommendRestaurant;
export const menu = [
  { img: `${menu1}`, title: 'Fast Food' },
  { img: `${menu2}`, title: 'Asiatique' },
  { img: `${menu3}`, title: 'Poké' },
  { img: `${menu4}`, title: 'Wrap' },
  { img: `${menu5}`, title: 'Salade' },
];

export const dataSandwich = [
    {
      img: `${beefSandwichImage}`,
      title: 'Sandwich Boeuf',
      price: 2.90,
        type: 'sandwich',
        value: 'boeuf',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${chickenSandwichImage}`,
        title: 'Sandwich Poulet',
        price: 2.90,
        type: 'sandwich',
        value: 'poulet',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${fishSandwichImage}`,
        title: 'Sandwich Poisson',
        price: 2.90,
        type: 'sandwich',
        value: 'poisson',
        restaurant: 'Mc Donalds',
    },
];

export const dataSideFood = [
    {
        img: `${friesImage}`,
        title: 'Frites',
        price: 2.00,
        type: 'SideFood',
        value: 'frites',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${potatoesImage}`,
        title: 'Potaotes',
        price: 2.00,
        type: 'SideFood',
        value: 'potatoes',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${saladImage}`,
        title: 'Salade',
        price: 2.00,
        type: 'SideFood',
        value: 'salade',
        restaurant: 'Mc Donalds',
    },
];

export const dataDrink = [
    {
        img: `${cocaImage}`,
        title: 'Coca Cola',
        price: 1.00,
        type: 'drink',
        value: 'coca',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${fantaImage}`,
        title: 'Fanta',
        price: 1.00,
        type: 'drink',
        value: 'fanta',
        restaurant: 'Mc Donalds',
    },
    {
        img: `${iceTeaImage}`,
        title: 'Ice Tea',
        price: 1.00,
        type: 'drink',
        value: 'icetea',
        restaurant: 'Mc Donalds',
    },
];

export const personalized = [
  {
    img: `${mcdo}`,
    title: 'Mc Donalds',
    place: 'Saint Médard en Jalles',
    category: 'Fast Food',
    delivered: true,
    distance: [
      {
        icon: CiDeliveryTruck,
        time: '20 Mins',
      },
    ],
    price: [
      {
        icon: IoPricetagOutline,
        cash: '€€',
      },
    ],
  },
  {
    img: `${sushishop}`,
    title: 'Sushi Shop',
    place: 'Mérignac',
    category: 'Asiatique',
    delivered: true,
    distance: [
      {
        icon: CiDeliveryTruck,
        time: '35 Mins',
      },
    ],
    price: [
      {
        icon: IoPricetagOutline,
        cash: '€€€€',
      },
    ],
  },
  {
    img: `${eatsalad}`,
    title: 'Eat Salad',
    place: 'Le Haillan',
    category: 'Salade',
    delivered: true,
    distance: [
      {
        icon: CiDeliveryTruck,
        time: '30 Mins',
      },
    ],
    price: [
      {
        icon: IoPricetagOutline,
        cash: '€€€',
      },
    ],
  },
  {
    img: `${heiko}`,
    title: 'Heiko',
    place: 'Bordeaux Lac',
    category: 'Poké',
    delivered: true,
    distance: [
      {
        icon: CiDeliveryTruck,
        time: '40 Mins',
      },
    ],
    price: [
      {
        icon: IoPricetagOutline,
        cash: '€€€',
      },
    ],
  },
];