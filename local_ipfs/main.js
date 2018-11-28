var ipfsModule = require('./interfaces/ipfsModule.js');



async function test() {
    let x = new ipfsModule('prithvi');
    let node = await x.makeANode();
    // try { await node.swarm.connect('/ip4/192.168.1.9/tcp/4002/ipfs/QmRsQufzabJYx3JW9qHta5iJ8YLxt8cy7WULC6GFKmsM7V'); }
    // catch (err) {
    //     console.log(err);
    // }

     console.log("Node created...");
    // let y = await x.addAFileToNet('QmRsQufzabJYx3JW9qHta5iJ8YLxt8cy7WULC6GFKmsM7V/test.txt', 'this is a test', node);
    // console.log("File Added...", y);
    // const file = await x.getFile('QmRsQufzabJYx3JW9qHta5iJ8YLxt8cy7WULC6GFKmsM7V/test.txt', 'Qmc3AUu73oGXc3UFN7gziYnrkADygbkT66T7xCWJFcEgHe',node);
    // console.log('Added file contents:', file);
}

test();
