const { exec } = require("../db/mysql");

const login = (username, password) => {
   const sql = `
   select username, realname from users where username='${username}' and password='${password}'`;
   return exec(sql).then(rows => {
       return rows[0];
   })
}

const userRegistry = (username, password, realname) => {
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