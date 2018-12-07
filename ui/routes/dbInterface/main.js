//Login management
exports.loginUser = function (userId, password) {
    return new Promise((resolve, reject) => {
        let sql = `select Password from majorProject.login where Username = "${userId}"`;
        console.log(sql);
        con.query(sql, (err, results) => {
            if (err) console.log(err);
            console.log(results);
            if (results.length === 0) {
                resolve(false);
            } else {
                let pwd = results[0]['Password'];

                if (pwd === password) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });

    });
}

exports.saveSessionId = function (username, sessionId) {
    return new Promise((resolve, reject) => {
        let sql = `insert into majorProject.session (Username, session_id) values ('${username}', '${sessionId}')`;
        console.log(sql);
        con.query(sql, (err) => {
            if (err) reject(err);
            console.log('hello', err);
            resolve();

        });
    });
}

exports.deleteSessionId = function (sessionId) {
    return new Promise((resolve, reject) => {
        let sql = `delete from majorProject.session where session_id = "${sessionId}"`;
        console.log(sql);
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

exports.checkSessionId = function (sessionId) {
    return new Promise((resolve, reject) => {
        let sql = `select * from majorProject.session where session_id = "${sessionId}"`;
        console.log(sql);
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                resolve(false);
            }
            //console.log("session :", result);
            if (result.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}



//File management
exports.getFiles = function (userId) {
    return new Promise((resolve, reject) => {
        let sql = `select * from majorProject.files where Uid = "${userId}"`;
        console.log(sql);
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                resolve([]);
            } else {
                resolve(result);
            }
        });
    });
}

exports.addFile = function (userId, file) {
    return new Promise((resolve, reject) => {
        let sql = `insert into majorProject.files (Uid, fileInfo, fileId) values ('${userId}', '${file.info}', '${file.hash}')`;
        console.log(sql);
        con.query(sql, (err) => {
            if (err) reject(err);
            resolve();

        });
    });
}

// exports.shareFile = function (userId, fileName, fileId) {
//     return new Promise((resolve, reject) => {
//         let sql = `insert into`
//     });
// }