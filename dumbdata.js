const users = [
  {
    id: 1,
    username: "lucas98",
    email: "lucas98@mail.com",
    password: "Password1",
  },
  {
    id: 2,
    username: "niko96",
    email: "niko96@mail.com",
    password: "Password2",
  },
  {
    id: 3,
    username: "ailuwu12",
    email: "ailuwu12@mail.com",
    password: "Password3",
  },
  {
    id: 4,
    username: "serrsua",
    email: "serrsua@mail.com",
    password: "Password4",
  },
  {
    id: 5,
    username: "pumba",
    email: "pumba@mail.com",
    password: "Password5",
  },
];

const tags = [
  { name: "JavaScript" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "React" },
  { name: "Node.js" },
  { name: "MongoDB" },
];

const randomDates = [
  '2023-04-01',
  '2023-04-02',
  '2023-04-03',
  '2023-04-04',
  '2023-04-05',
  '2023-04-06',
  '2023-04-07',
  '2023-04-08',
  '2023-04-09',
  '2023-04-10',
]

const posts = [
  {
    userId: 1,
    title: "Introducción a Node.js",
    description:
      "Aprende cómo Node.js te permite escribir JavaScript en el lado del servidor.",
    file: "https://ejemplo.com/archivo1.pdf",
    tags: [{ name: "JavaScript" }, { name: "HTML" }, { name: "CSS" }],
  },
  {
    userId: 2,
    title: "10 Consejos para mejorar tu productividad",
    description:
      "Descubre algunos consejos simples para aumentar tu productividad en el trabajo.",
    file: "https://ejemplo.com/archivo2.pdf",
    tags: [{ name: "React" }, { name: "Node.js" }],
  },
  {
    userId: 3,
    title: "Cómo crear una aplicación web con React",
    description:
      "Sigue esta guía paso a paso para aprender cómo crear una aplicación web con React.",
    file: "https://ejemplo.com/archivo3.pdf",
    tags: [{ name: "MongoDB" }],
  },
  {
    userId: 1,
    title: "Introducción a la programación en Python",
    description:
      "Descubre cómo Python te permite escribir código de manera sencilla y eficiente.",
    file: "https://ejemplo.com/imagen1.jpg",
    tags: [{ name: "Python" }],
  },
  {
    userId: 2,
    title: "Programación orientada a objetos en Java",
    description:
      "Aprende cómo Java te permite crear programas complejos y estructurados utilizando POO.",
    file: "https://ejemplo.com/imagen2.jpg",
    tags: [{ name: "Java" }, { name: "POO" }],
  },
  {
    userId: 3,
    title: "Desarrollo web con HTML, CSS y JavaScript",
    description:
      "Descubre cómo crear páginas web atractivas y dinámicas utilizando HTML, CSS y JavaScript.",
    file: "https://ejemplo.com/imagen3.jpg",
    tags: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }],
  },
  {
    userId: 4,
    title: "Programación funcional en Haskell",
    description:
      "Aprende cómo la programación funcional puede ayudarte a crear programas más claros y mantenibles.",
    file: "https://ejemplo.com/imagen4.jpg",
    tags: [{ name: "Haskell" }, { name: "Programación funcional" }],
  },
  {
    userId: 5,
    title: "Desarrollo de aplicaciones móviles en Flutter",
    description:
      "Descubre cómo Flutter te permite crear aplicaciones móviles atractivas y de alto rendimiento.",
    file: "https://ejemplo.com/imagen5.jpg",
    tags: [{ name: "Flutter" }, { name: "Desarrollo móvil" }],
  },
  {
    userId: 1,
    title: "Introducción al lenguaje de programación C",
    description:
      "Descubre cómo programar en C y aprende sus conceptos fundamentales.",
    file: "https://ejemplo.com/imagen1.jpg",
    tags: [
      { name: "C++" },
      { name: "programación" },
      { name: "lenguaje de programación" },
    ],
  },
  {
    userId: 2,
    title: "Desarrollo de aplicaciones web con React",
    description:
      "Aprende cómo construir aplicaciones web modernas y escalables con React.",
    file: "https://ejemplo.com/imagen2.jpg",
    tags: [
      { name: "React" },
      { name: "desarrollo web" },
      { name: "aplicaciones web" },
    ],
  },
  {
    userId: 3,
    title: "Programación en Ruby on Rails",
    description:
      "Descubre cómo Ruby on Rails puede ayudarte a construir aplicaciones web de manera eficiente.",
    file: "https://ejemplo.com/imagen3.jpg",
    tags: [
      { name: "Ruby" },
      { name: "Ruby on Rails" },
      { name: "desarrollo web" },
    ],
  },
  {
    userId: 4,
    title: "Introducción a la programación en JavaScript",
    description:
      "Aprende los conceptos básicos de programación con JavaScript y cómo utilizarlo en el desarrollo web.",
    file: "https://ejemplo.com/imagen4.jpg",
    tags: [
      { name: "JavaScript" },
      { name: "programación" },
      { name: "desarrollo web" },
    ],
  },
  {
    userId: 5,
    title: "Desarrollo de aplicaciones móviles con React Native",
    description:
      "Descubre cómo React Native te permite crear aplicaciones móviles nativas con JavaScript.",
    file: "https://ejemplo.com/imagen5.jpg",
    tags: [
      { name: "React Native" },
      { name: "desarrollo móvil" },
      { name: "aplicaciones móviles" },
    ],
  },
  {
    userId: 1,
    title: "Programación de videojuegos con Unity",
    description:
      "Aprende cómo crear videojuegos en 2D y 3D utilizando Unity, una de las herramientas más populares en la industria.",
    file: "https://ejemplo.com/imagen1.jpg",
    tags: [
      { name: "Unity" },
      { name: "videojuegos" },
      { name: "programación" },
    ],
  },
  {
    userId: 2,
    title: "Desarrollo de aplicaciones móviles con Kotlin",
    description:
      "Descubre cómo Kotlin se ha convertido en uno de los lenguajes preferidos para el desarrollo de aplicaciones móviles en Android.",
    file: "https://ejemplo.com/imagen2.jpg",
    tags: [
      { name: "Kotlin" },
      { name: "Android" },
      { name: "desarrollo móvil" },
    ],
  },
  {
    userId: 3,
    title: "Introducción a la programación en PHP",
    description:
      "Aprende los fundamentos de la programación en PHP y cómo crear aplicaciones web dinámicas.",
    file: "https://ejemplo.com/imagen3.jpg",
    tags: [
      { name: "PHP" },
      { name: "programación" },
      { name: "desarrollo web" },
    ],
  },
  {
    userId: 4,
    title: "Desarrollo de aplicaciones empresariales con Java EE",
    description:
      "Descubre cómo Java Enterprise Edition (EE) puede ayudarte a construir aplicaciones empresariales escalables y seguras.",
    file: "https://ejemplo.com/imagen4.jpg",
    tags: [
      { name: "Java" },
      { name: "Java EE" },
      { name: "desarrollo empresarial" },
    ],
  },
  {
    userId: 5,
    title: "Programación en Python para análisis de datos",
    description:
      "Aprende cómo utilizar Python para el análisis de datos y descubre sus librerías más populares, como Pandas y NumPy.",
    file: "https://ejemplo.com/imagen5.jpg",
    tags: [
      { name: "Python" },
      { name: "análisis de datos" },
      { name: "programación" },
    ],
  },
  {
    userId: 1,
    title: "Introducción a la programación en C++",
    description:
      "Aprende los fundamentos de la programación en C++ y cómo crear programas eficientes y de alto rendimiento.",
    file: "https://ejemplo.com/imagen1.jpg",
    tags: [{ name: "C++" }, { name: "programación" }, { name: "eficiencia" }],
  },
  {
    userId: 2,
    title: "Desarrollo de aplicaciones web con Ruby on Rails",
    description:
      "Descubre cómo Ruby on Rails te permite crear aplicaciones web rápidas y robustas utilizando convenciones sencillas y claras.",
    file: "https://ejemplo.com/imagen2.jpg",
    tags: [
      { name: "Ruby" },
      { name: "Ruby on Rails" },
      { name: "desarrollo web" },
    ],
  },
  {
    userId: 3,
    title: "Programación de sistemas en Assembly",
    description:
      "Aprende a programar sistemas de bajo nivel utilizando Assembly, uno de los lenguajes más antiguos y potentes.",
    file: "https://ejemplo.com/imagen3.jpg",
    tags: [
      { name: "Assembly" },
      { name: "programación" },
      { name: "sistemas" },
    ],
  },
  {
    userId: 4,
    title: "Desarrollo de juegos en Unreal Engine",
    description:
      "Descubre cómo Unreal Engine te permite crear juegos impresionantes y de alto rendimiento utilizando herramientas profesionales.",
    file: "https://ejemplo.com/imagen4.jpg",
    tags: [
      { name: "Unreal Engine" },
      { name: "juegos" },
      { name: "desarrollo" },
    ],
  },
  {
    userId: 5,
    title: "Programación en JavaScript para desarrollo de aplicaciones web",
    description:
      "Aprende cómo utilizar JavaScript para crear aplicaciones web dinámicas y modernas utilizando librerías populares como React y Vue.",
    file: "https://ejemplo.com/imagen5.jpg",
    tags: [
      { name: "JavaScript" },
      { name: "desarrollo web" },
      { name: "React" },
      { name: "Vue" },
    ],
  },
  {
    userId: 1,
    title: "Introducción a la programación en PHP",
    description:
      "Aprende los conceptos básicos de la programación en PHP y cómo crear aplicaciones web dinámicas y escalables.",
    file: "https://ejemplo.com/imagen1.jpg",
    tags: [
      { name: "PHP" },
      { name: "programación web" },
      { name: "escalabilidad" },
    ],
  },
  {
    userId: 2,
    title: "Programación de videojuegos en Unity",
    description:
      "Descubre cómo Unity te permite crear videojuegos impresionantes utilizando herramientas profesionales de desarrollo y diseño.",
    file: "https://ejemplo.com/imagen2.jpg",
    tags: [
      { name: "Unity" },
      { name: "videojuegos" },
      { name: "desarrollo" },
      { name: "diseño" },
    ],
  },
  {
    userId: 3,
    title: "Desarrollo de aplicaciones móviles nativas en Android",
    description:
      "Aprende cómo crear aplicaciones móviles nativas para Android utilizando Java y el entorno de desarrollo Android Studio.",
    file: "https://ejemplo.com/imagen3.jpg",
    tags: [
      { name: "Android" },
      { name: "Java" },
      { name: "desarrollo móvil" },
      { name: "Android Studio" },
    ],
  },
  {
    userId: 4,
    title: "Programación en Python para ciencia de datos",
    description:
      "Descubre cómo utilizar Python para realizar análisis de datos y crear modelos de aprendizaje automático en ciencia de datos.",
    file: "https://ejemplo.com/imagen4.jpg",
    tags: [
      { name: "Python" },
      { name: "ciencia de datos" },
      { name: "análisis de datos" },
      { name: "aprendizaje automático" },
    ],
  },
  {
    userId: 5,
    title: "Desarrollo de aplicaciones web con Node.js",
    description:
      "Aprende cómo utilizar Node.js para crear aplicaciones web escalables y de alto rendimiento utilizando librerías populares como Express y MongoDB.",
    file: "https://ejemplo.com/imagen5.jpg",
    tags: [
      { name: "Node.js" },
      { name: "desarrollo web" },
      { name: "escalabilidad" },
      { name: "Express" },
      { name: "MongoDB" },
    ],
  },
];

module.exports = {
  users,
  posts,
  randomDates
};
