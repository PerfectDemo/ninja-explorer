const Web3 = require('web3');
const config = require('./configTool').getConfig();
const HttpProvider = require('ethjs-provider-http');


class Web3Tool {
    constructor() {        
        let provider = new HttpProvider(config.provider);
        this.web3 = new Web3(provider);
    }    
}

module.exports = Web3Tool;