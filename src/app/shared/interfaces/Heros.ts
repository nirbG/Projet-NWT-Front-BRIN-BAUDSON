import {HeroSimple} from "./HeroSimple";

export interface Hero {
  _id: string;
  photo?: string;
  name: string;
  pouvoir: string;
  ennemi: HeroSimple[];
  allie: HeroSimple[];
  isHumain: boolean;
}


export const HEROS = [
  {
    _id: '1',
    photo: 'deadpool.jpg',
    name: 'Deadpool',
    pouvoir: 'none',
    ennemi: [
      {
        _id: '7',
        photo: 'cable.jpg',
        name: 'Cable',
      },
      {
        _id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
    ],
    allie: [
      {
        _id: '7',
        photo: 'cable.jpg',
        name: 'Cable',
      },
    ],
    isHumain: true,
  },
  {
    _id: '2',
    photo: 'antman.jpg',
    name: 'Ant-Man',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '3',
    photo: 'batman.jpg',
    name: 'Batman',
    pouvoir: 'none',
    ennemi: [
      {
        _id: '5',
        photo: 'joker.jpg',
        name: 'Joker',
      },
      {
        _id: '19',
        photo: 'deathstroke.jpg',
        name: 'deathstroke',
      },
      {
        _id: '20',
        photo: 'doubleface.jpg',
        name: 'Double-Faces',
      },
    ],
    allie: [
      {
        _id: '12',
        photo: 'robin.jpg',
        name: 'Robin',
      },
      {
        _id: '11',
        photo: 'aquaman.jpg',
        name: 'Aquaman',
      },
      {
        _id: '18',
        photo: 'superman.jpg',
        name: 'Superman',
      },
    ],
    isHumain: true
  },
  {
    _id: '4',
    photo: 'dardevile.jpg',
    name: 'Dardevile',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '5',
    photo: 'joker.jpg',
    name: 'Joker',
    pouvoir: 'none',
    ennemi: [
      {
        _id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
      {
        _id: '12',
        photo: 'robin.jpg',
        name: 'Robin',
      },
      {
        _id: '9',
        photo: 'catwoman.jpg',
        name: 'Catwoman',
      },

    ],
    allie: [
      {
        _id: '20',
        photo: 'doubleface.jpg',
        name: 'Double-Faces',
      },
      {
        _id: '19',
        photo: 'deathstroke.jpg',
        name: 'deathstroke',
      }
    ],
    isHumain: true
  },
  {
    _id: '6',
    photo: 'ironman.jpg',
    name: 'Iron Man',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        _id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        _id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    _id: '7',
    photo: 'cable.jpg',
    name: 'Cable',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '8',
    photo: 'spawn.jpg',
    name: 'Spawn',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '9',
    photo: 'catwoman.jpg',
    name: 'Catwoman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '10',
    photo: 'hellboy.png',
    name: 'Hellboy',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '11',
    photo: 'aquaman.jpg',
    name: 'Aquaman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
      {
        _id: '18',
        photo: 'superman.jpg',
        name: 'Superman',
      },
    ],
    isHumain: true
  },
  {
    _id: '12',
    photo: 'robin.jpg',
    name: 'Robin',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '9',
        photo: 'catwoman.jpg',
        name: 'Catwoman',
      },
      {
        _id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
    ],
    isHumain: true
  },
  {
    _id: '13',
    photo: 'wolverine.jpg',
    name: 'Wolverine',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '14',
    photo: 'hulk.jpg',
    name: 'Hulk',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        _id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        _id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    _id: '15',
    photo: 'thor.jpg',
    name: 'Thor',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        _id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        _id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    isHumain: true
  },
  {
    _id: '16',
    photo: 'Captain_America.png',
    name: 'Captain America',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        _id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        _id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      }
    ],
    isHumain: true
  },
  {
    _id: '17',
    photo: '4fan.jpg',
    name: 'Les 4 Fantastique',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '18',
    photo: 'superman.jpg',
    name: 'Superman',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [
      {
        _id: '11',
        photo: 'aquaman.jpg',
        name: 'Aquaman',
      },
      {
        _id: '3',
        photo: 'batman.jpg',
        name: 'Batman',
      },
    ],
    isHumain: true
  },
  {
    _id: '19',
    photo: 'deathstroke.jpg',
    name: 'Deathstroke',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '20',
    photo: 'doubleface.jpg',
    name: 'Double-Faces',
    pouvoir: 'none',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    _id: '21',
    photo: 'avengers.jpg',
    name: 'Avengers',
    pouvoir: 'none',
    ennemi: [
      {
        _id: '6',
        photo: 'ironman.jpg',
        name: 'Iron Man',
      },
      {
        _id: '15',
        photo: 'thor.jpg',
        name: 'Thor',
      },
      {
        _id: '14',
        photo: 'hulk.jpg',
        name: 'Hulk',
      },
      {
        _id: '16',
        photo: 'Captain_America.png',
        name: 'Captain America',
      }
    ],
    allie: [] as HeroSimple[],
    isHumain: true
  }
];
