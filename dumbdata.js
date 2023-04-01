const users = [
    {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        password: 'Password1'
    },
    {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        password: 'Password2'
    },
    {
        id: 3,
        username: 'user3',
        email: 'user3@example.com',
        password: 'Password3'
    }
];

const tags = [
    { name: 'JavaScript' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'MongoDB' }
];

const posts = [
    {
        userId: 1,
        title: 'Introducción a Node.js',
        description: 'Aprende cómo Node.js te permite escribir JavaScript en el lado del servidor.',
        file: 'https://ejemplo.com/archivo1.pdf',
        tags: [
            { name: 'JavaScript' },
            { name: 'HTML' },
            { name: 'CSS' },
        ]
    },
    {
        userId: 2,
        title: '10 Consejos para mejorar tu productividad',
        description: 'Descubre algunos consejos simples para aumentar tu productividad en el trabajo.',
        file: 'https://ejemplo.com/archivo2.pdf',
        tags: [
            { name: 'React' },
            { name: 'Node.js' },
        ]
    },
    {
        userId: 3,
        title: 'Cómo crear una aplicación web con React',
        description: 'Sigue esta guía paso a paso para aprender cómo crear una aplicación web con React.',
        file: 'https://ejemplo.com/archivo3.pdf',
        tags: [
            { name: 'MongoDB' }
        ]
    }
];

module.exports = {
    users,
    posts
}