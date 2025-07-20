const os = require('os');
const fs = require('fs');

function getLocalIp_assign() {
    let IPV4 = [];
    const path='../drive/build/url.json';
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === "IPv4") IPV4.push(net.address)
        }
    }
    let ip = IPV4.length > 1 ? IPV4[1] : IPV4[0];
    let url = `http://${ip}:3001/`
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) throw err;
        var d = {
            "url": url
        }
        fs.writeFile(path, JSON.stringify(d), (err) => {
            if (err) throw err;
            console.log('JSON file updated!');
        })
    })
}



module.exports = { getLocalIp_assign };