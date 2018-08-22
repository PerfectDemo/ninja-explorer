const Web3Tool = require('../backend/helper/web3Tool');

const w3tool = new Web3Tool();
(async () => {
    console.log(w3tool);
console.log('2222222');
console.log(JSON.stringify(await w3tool.web3.eth.getTransaction('0x324473974baf30e12ca7449e14156cb5a2cac42c2dd98dab46df97cabcf9e98b')));
})()
