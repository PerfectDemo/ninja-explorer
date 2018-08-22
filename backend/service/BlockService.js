const { getQueryHtml } = require('../helper/requestTool');
const baseUrl = require('../helper/configTool').getConfig().etherscan;
const cheerio = require('cheerio');
class Block {
    constructor(web3Tool) {
        this.web3 = web3Tool.web3;
        this.blockTransaction = {};
        this.blockUrl = `${baseUrl}/blocks`;
    }

    async getBlock(number) {
        return await this.web3.eth.getBlock(number);
    }

    async getBlockTransaction(blockNumber, page = 1, size = 10) {
        try {
            let transactions;
            if (this.blockTransaction[blockNumber]) {
                transactions = this.blockTransaction[blockNumber].transactions;            
            } else {
                this.blockTransaction = {};
                this.blockTransaction[blockNumber] = await this.web3.eth.getBlock(blockNumber, true);
                transactions = this.blockTransaction[blockNumber].transactions;
            }

            const start = (page - 1) * size;
            const end = start + size;

            return {
                success: true,
                data: {
                    list: transactions.slice(start, end),
                    total: transactions.length
                }
            };
        } catch (error) {
            return {
                success: false,
                message: 'get block transaction fail :' + error.message
            }
        }        
    }

    async queryBlocks(page, size) {
        try {
            const html = await getQueryHtml(this.blockUrl, page, size);
            const $ = cheerio.load(html);
            const blockItems = $('.table-hover').find('tr');
            const blocks = [];
    
            for (let i = 1, len = blockItems.length; i < len; i ++) {
                const blockItem = blockItems[i];
                const tds = $(blockItem).find('td');
    
                const $height = $(tds[0]);
                const $age = $(tds[1]);
                const $txn = $(tds[2]);
                const $uncles = $(tds[3]);
                const $miner = $(tds[4]);
                const $gasUsed = $(tds[5]);
                const $gasLimit = $(tds[6]);
                const $avgGasPrice = $(tds[7]);
                const $reward = $(tds[8]);
                
                blocks.push({
                    height: $height.find('a').text(),
                    age: $age.find('span').text(),
                    txn: $txn.find('a').text(),
                    uncles: $uncles.text(),
                    miner: $miner.find('a').text(),
                    gasUsed: $gasUsed.text(),
                    gasLimit: $gasLimit.text(),
                    avgGasPrice: $avgGasPrice.text(),
                    reward: $reward.text()
                });
                
            }
            return blocks;
        } catch (error) {
            throw new Error(`Parse blocks html error! message: ${error.message}`);
        }
        
     }
    
}

module.exports = Block;