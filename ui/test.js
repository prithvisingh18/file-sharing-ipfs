var mysql = require('mysql');
var config = require('./config');

global.con = mysql.createConnection({
    host: config.databaseConfig.host,
    user: config.databaseConfig.user,
    password: config.databaseConfig.password
});


let dbInt = require('./routes/dbInterface/main');

async function test() {
    con.connect(async function (err) {
        if (err) throw err;
        console.log("DB Connected!");
        let res = await dbInt.checkSessionId('f5f293bb-5cc7-4e75-b62e-e99e4c89a6f5');
        console.log(res);
    });

}

test();