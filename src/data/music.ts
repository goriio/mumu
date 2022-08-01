import { IMusic } from '../types';

export const musicList: IMusic[] = [
  {
    id: 1,
    title: 'Canon in D',
    artist: 'Johann Pachelbel',
    url: {
      image: 'https://images.genius.com/6ba6062b8654240bbe74e803000be608.900x900x1.jpg',
      audio:
        'https://ia902801.us.archive.org/19/items/lp_canon-in-d-major_johann-pachelbel-orchestre-de-chambre-jean/disc1/01.01.%20Canon%20In%20D%20Major%20For%20Strings%20And%20Continuo.mp3',
    },
  },
  {
    id: 2,
    title: 'The Four Seasons (Spring)',
    artist: 'Antonio Vivaldi',
    url: {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/1200px-Vivaldi.jpg',
      audio:
        'https://ia803205.us.archive.org/35/items/TheFourSeasonsSpring/The%20Four%20Seasons%20%28Spring%29.ogg',
    },
  },
  {
    id: 3,
    title: 'Clair De Lune',
    artist: 'Claude Debussy',
    url: {
      image:
        'https://lh6.googleusercontent.com/proxy/VENXwH3FqGwfAgSKNP7U2ElVsMcUv0A-ySs_gIQAilOBbUXwVyeOZyKzPeNEVCrZVMntXZizPKLPsiy_-mj5hYxW5DYNfJ9JAgsI83pXiCO5fe55JtZksFCoy5VKTsP_=w1200-h630-p-k-no-nu',
      audio:
        'https://ia800905.us.archive.org/24/items/ClaudeDebussyClairDeLuneFromTwilight/Claude%20Debussy%20-%20Clair%20de%20lune%20%28From%20Twilight%29.ogg',
    },
  },
  {
    id: 4,
    title: 'Nocturne No. 2 in E Flat Major Op. 9 No. 2',
    artist: 'Frederic Chopin',
    url: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Chopin%2C_by_Wodzinska.JPG',
      audio:
        'https://ia600902.us.archive.org/5/items/FredericChopinNocturneNo.2InEFlatMajorOp.9No.2FromBlueLagoon/Frederic%20Chopin%20-%20Nocturne%20No.%202%20In%20E%20Flat%20Major%20Op.9%20No.2%20%28From%20Blue%20Lagoon%29.ogg',
    },
  },
  {
    id: 5,
    title: 'Gymnopedie No. 1',
    artist: 'Erik Satie',
    url: {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Erik_Leslie_Satie_(1866._-_1925.).jpeg/330px-Erik_Leslie_Satie_(1866._-_1925.).jpeg',
      audio:
        'https://archive.org/download/gymnopedie-no-1-by-kevin-macleod/gymnopedie-no-1-by-kevin-macleod.ogg',
    },
  },
  {
    id: 6,
    title: 'Always With Me (いつも何度でも)',
    artist: 'Wakako Kaku',
    url: {
      image: 'https://mindtrail.okuyamato.jp/2020/images/artists/ob_kaku/portrait.jpg',
      audio:
        'https://ia600908.us.archive.org/24/items/ItsumoNandoDemoSenToChihiroNoKamikakushi/Itsumo%20Nando%20Demo%20%28Sen%20to%20Chihiro%20no%20Kamikakushi%29.ogg',
    },
  },
];
