//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { users, posts, randomDates } = require('./dumbdata.js')

function createUsers() {
  users.map(async u => {
    let user = await conn.model('User').create({
      username: u.username,
      email: u.email,
      password: u.password
    })
    console.log(user.toJSON());
  })
}

function createPosts() {
  posts.map(async p => {
    let rand = new Promise((resolve) => resolve(Math.floor(Math.random() * 10)))
    let post = await conn.model('Post').create({
      title: p.title,
      description: p.description,
      file: p.file,
      UserId: p.userId,
      publishDate: new Date(randomDates[await rand])
    })

    p.tags.map(async t => {
      const [tag, _] = await conn.model('Tag').findOrCreate({
        name: t.name,
        where: {
          name: t.name
        }
      })
      console.log(tag.toJSON());
      post.addTag(tag)
    })
    console.log(post.toJSON());
  })
}


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  console.log('db connected')
  createUsers()
  createPosts()

  server.listen(3001, () => {
    console.log('server listening at 3001'); // eslint-disable-line no-console
  });
});
