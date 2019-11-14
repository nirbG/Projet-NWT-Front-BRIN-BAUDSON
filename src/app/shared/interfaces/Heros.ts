import {HeroSimple} from "./HeroSimple";

export interface Hero {
  id: string;
  photo?: string;
  name: string;
  pouvoir: string;
  ennemi: HeroSimple[];
  allie: HeroSimple[];
  isHumain: boolean;
}


export const HEROS = [
  {
    id: '1',
    photo: 'deadpool.jpg',
    name: 'Deadpool',
    pouvoir: 'none',
    ennemi: [
      {
        id: '7',
        photo: 'cable.jpg',
        name: 'Cable',
      },
      {
        id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
    ],
    allie: [
      {
        id: '7',
        photo: 'cable.jpg',
        name: 'Cable',
      },
    ],
    isHumain: true,
  },
  {
    id: '2',
    photo: 'antman.jpg',
    name: 'Ant-Man',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '3',
    photo: 'batman.jpg',
    name: 'Batman',
    pouvoir: 'none',
    ennemi: [
      {
        id: '5',
        photo: 'joker.jpg',
        name: 'Joker',
      },
      {
        id: '19',
        photo: 'deadsthroke.jpg',
        name: 'Deadsthroke',
      },
      {
        id: '19',
        photo: 'doubleface.jpg',
        name: 'Double-Faces',
      },
    ],
    allie: [
      {
        id: '12',
        photo: 'robin.jpg',
        name: 'Robin',
      },
      {
        id: '11',
        photo: 'aquaman.jpg',
        name: 'Aquaman',
      },
      {
        id: '18',
        photo: 'superman.jpg',
        name: 'Superman',
      },
    ],
    isHumain: true
  },
  {
    id: '4',
    photo: 'dardevile.jpg',
    name: 'Dardevile',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '5',
    photo: 'joker.jpg',
    name: 'Joker',
    pouvoir: 'none',
    ennemi: [
      {
        id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
      {
        id: '12',
        photo: 'robin.jpg',
        name: 'Robin',
      },
      {
        id: '9',
        photo: 'catwoman.jpg',
        name: 'Catwoman',
      },

    ],
    allie: [
      {
        id: '20',
        photo: 'doubleface.jpg',
        name: 'Double-Faces',
      },
      {
        id: '19',
        photo: 'deadsthroke.jpg',
        name: 'Deadsthroke',
      }
    ],
    isHumain: true
  },
  {
    id: '6',
    photo: 'ironman.jpg',
    name: 'Iron Man',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    id: '7',
    photo: 'cable.jpg',
    name: 'Cable',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '8',
    photo: 'spawn.jpg',
    name: 'Spawn',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '9',
    photo: 'catwoman.jpg',
    name: 'Catwoman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '10',
    photo: 'hellboy.png',
    name: 'Hellboy',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '11',
    photo: 'aquaman.jpg',
    name: 'Aquaman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
      {
        id: '18',
        photo: 'superman.jpg',
        name: 'Superman',
      },
    ],
    isHumain: true
  },
  {
    id: '12',
    photo: 'robin.jpg',
    name: 'Robin',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '9',
        photo: 'catwoman.jpg',
        name: 'Catwoman',
      },
      {
        id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
    ],
    isHumain: true
  },
  {
    id: '13',
    photo: 'wolverine.jpg',
    name: 'Wolverine',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '14',
    photo: 'hulk.jpg',
    name: 'Hulk',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    id: '15',
    photo: 'thor.jpg',
    name: 'Thor',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    id: '16',
    photo: 'Captain_America.png',
    name: 'Captain America',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      }
    ],
    isHumain: true
  },
  {
    id: '17',
    photo: '4Fan.jpg',
    name: 'Les 4 Fantastique',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '18',
    photo: 'superman.jpg',
    name: 'Superman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        id: '11',
        photo: 'aquaman.jpg',
        name: 'Aquaman',
      },
      {
        id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
    ],
    isHumain: true
  },
  {
    id: '19',
    photo: 'deadsthroke.jpg',
    name: 'Deadsthroke',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '20',
    photo: 'doubleface.jpg',
    name: 'Double-Faces',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '21',
    photo: 'avengers.jpg',
    name: 'Avengers',
    pouvoir: 'none',
    ennemi: [
      {
        id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    allie: [] as HeroSimple[],
    isHumain: true
  }
];
