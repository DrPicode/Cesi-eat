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

//RecommendRestaurant;
export const menu = [
  { img: `${menu1}`, title: 'Fast Food' },
  { img: `${menu2}`, title: 'Asiatique' },
  { img: `${menu3}`, title: 'Poké' },
  { img: `${menu4}`, title: 'Wrap' },
  { img: `${menu5}`, title: 'Salade' },
];

export const personalized = [
  {
    img: `${mcdo}`,
    title: 'Mc Donalds',
    place: 'Saint Médard en Jalles',
    category: 'Fast Food',
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