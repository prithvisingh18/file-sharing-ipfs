var ipfsModule = require('./interfaces/ipfsModule.js');



async function test() {
    let x = new ipfsModule('prithvi');
    let node = await x.makeANode();
    console.log(await node.swarm.addrs());
    // console.log("Node created...");
    // let y = await x.addAFileToNet('test.txt', 'this is a test', node);
    // console.log("File Added...");
    // const file = await node.files.cat(y[0].hash);
    // console.log('Added file contents:', file);
}

test();
