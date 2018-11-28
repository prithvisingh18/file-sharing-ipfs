// Compile command browserify main.js -o index.js

const node = new window.Ipfs()
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!


$(document).ready(function () {
    node.on('ready', () => {
        // Ready to use!
        // See https://github.com/ipfs/js-ipfs#core-api
        $('#output').text('IPFS Intialized');
        $('#upload').css("visibility", "visible");
        node.id((err, id) => {
            if (err) {
                console.log(err);
            }
            $('#node_id').text(id.id);
        });
        node.swarm.peers((err, addrs) => {
            console.log('Address: ');
            addrs.forEach((e) => {
                console.log(e);
            });
        });
    });

});

function fileUpload() {
    console.log('hello');
    let fr = new FileReader();
    fr.onloadend = (f) => {
        console.log('hello', f.target.result, Buffer.from(f.target.result));
        node.files.add({
            path: 'hello.txt',
            content: Buffer.from(f.target.result)
        },
            (err, res) => {
                if (err) {
                    console.log(err);
                }
                $('#hash').text(res[0].hash);
                console.log(res);
                $.post('ipfs/files/add', { userId: userId, fileName: `test_${userId}`, fileHash: res[0].hash },
                    function (data, status) {
                        console.log('File Upload', data, status);
                        //TODO: Check status and delete file from IPFS network if not updated on DB
                    });
            })
    }
    fr.readAsArrayBuffer(document.getElementById('fileItem').files[0]);
}


function fileDownload() {
    node.files.get($('#getHash').val(),
        (err, files) => {
            if (err) {
                console.log(err);
            }
            files.forEach((file) => {
                console.log(file.path, file.content)
                let blob = new Blob([file.content]);
                saveAs(blob, 'temp');
            })
        })
}

function pingId() {
    node.ping($('#getId').val(),
        (err, res) => {
            console.log(res[0]);
            if (res[0].success) {
                $('#pingRes').text('Ping Success');

            } else {
                $('#pingRes').text('Failed');
            }
        });
}

function connectToPeer() {
    node.swarm.connect($('#addr').val(), function (err) {
        if (err) {
            console.log(err);
        } else {
            $('#connRes').text('Connected');
        }
    });
}

function refreshPeers() {
    node.swarm.addrs((err, addrs) => {
        console.log('Address: ');
        addrs.forEach((e) => {
            console.log(e);
        });
    });
    node.swarm.peers((err, addrs) => {
        console.log('Address: ');
        addrs.forEach((e) => {
            console.log(e);
        });
    });
}


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var userId = GetURLParameter('userId');
function refreshFiles() {
    $.post('/ipfs/files/get', { userId: userId }, function (data, status) {
        console.log(data);
        $('#userFiles').empty();
        for (var i = 0; i < data.length; i++) {
            $('#userFiles').append(`File Name: ${data[i].fileInfo}, File Hash : ${data[i].fileId}<br>`);
        }
    });
}

refreshFiles();

function shareFiles() {
    $.post('/ipfs/files/add', {
        userId: $('#uid').val(),
        fileName: $('#fileName').val(),
        fileHash: $('#fileHash').val()
    }, function (data, status) {
        if (data.err) { console.log('Err Sharing files'); }
        else {
            console.log('File Shared');
        }
    });
}


$('#share').click(shareFiles);
$('#peer_list').click(refreshPeers);
$('#upload_file').click(fileUpload);
$('#download_file').click(fileDownload);
$('#ping').click(pingId);
$('#conn').click(connectToPeer);
$('#refreshFiles').click(refreshFiles);
