var express = require('express');
var router = express.Router();
var dbInt = require('./dbInterface/main.js');
const uuidv4 = require('uuid/v4');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(`login_page.html`, { root: `${__dirname + '/../views/'}` });
});

router.get('/ipfs', async function (req, res, next) {
  let result = await dbInt.checkSessionId(req.query.sessionId);
  if (result === true) {
    res.sendFile(`ipfs_test.html`, { root: `${__dirname + '/../views/'}` });
  } else {
    res.send({ err: "Session Id not found !" });
  }
});

router.get('/logout', async function (req, res, next) {
  let message = { err: null, details: "Logout Successfull" }
  try {
    await dbInt.deleteSessionId(req.query.sessionId);
  } catch (err) {
    message.err = 'Problem with Database';
    message.details = "Error deleting session";
  }
  res.send(message);
});


router.post('/ipfs/files/get', async function (req, res, next) {
  let data = await dbInt.getFiles(req.body.userId);
  res.send(data);
});

router.post('/ipfs/files/add', async function (req, res, next) {
  let response = { err: null };
  try {
    await dbInt.addFile(req.body.userId, { info: req.body.fileName, hash: req.body.fileHash });
  } catch (err) {
    console.log(err);
    response = { err: 'ERROR_ADDING_FILES' };
  }
  res.send(response);
});


router.post('/login', async function (req, res) {
  console.log(req.body);
  let result = await dbInt.loginUser(req.body.userId, req.body.password);
  if (result === true) {
    let sessionId = uuidv4();
    let x = await dbInt.saveSessionId(req.body.userId, sessionId);
    res.send(`/ipfs?sessionId=${sessionId}&userId=${req.body.userId}`)
  } else {
    res.send({ err: "Login failed password not found !" });
  }
});

module.exports = router;