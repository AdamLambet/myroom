const { exec, escape } = require("../db/mysql");
const { genPassword } = require('../utils/cryp');

const login = (username, password) => {
   username = escape(username);
   password = escape(password);

   // 生成加密密码
   password = genPassword(password);

   const sql = `
   select username, realname from users where username='${username}' and password='${password}'`;
   return exec(sql).then(rows => {
       return rows[0];
   })
}

const userRegistry = (username, password, realname) => {
    password = genPassword(password);
    const sql = `
    insert into users (username, password, realname) values ('${username}', '${password}', '${realname}')`;
    return exec(sql).then(registryData => {
        console.log(sql, registryData);
        return {
            id: registryData.insertId
        }
    })
}


module.exports = {
    login,
    userRegistry
}