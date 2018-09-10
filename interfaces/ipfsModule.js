const IPFS = require('ipfs');

function ipfsModule(userName) {
    this.userName = userName;
}

ipfsModule.prototype.makeANode = async function () {
    return new Promise((resolve, response) => {
        const node = new IPFS();
        node.on('ready', async () => {
            resolve(node);
            //const version = await node.version();
        });

    });
}

ipfsModule.prototype.addAFileToNet = async function (path, file, node) {
    return node.files.add({
        path: path,
        content: Buffer.from(file)
    });
}

ipfsModule.prototype.getFile = async function (path, hash, node) {
    const fileBuffer = await node.files.cat(hash);
    return fileBuffer.toString();
}


module.exports = ipfsModule;