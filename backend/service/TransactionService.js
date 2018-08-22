const { getQueryHtml } = require('../helper/requestTool');
const baseUrl = require('../helper/configTool').getConfig().etherscan;
const cheerio = require('cheerio');
class Transaction {
    constructor(web3Tool) {
        this.web3 = web3Tool.web3;
        this.txsUrl = `${baseUrl}/txs`;
    }

    async getTransaction(txHash) {
        const [ tx, txReceipt ] = await Promise.all([
            this.web3.eth.getTransaction(txHash),
            this.web3.eth.getTransactionReceipt(txHash)
        ]);

        if (txReceipt == null)
            return null;
        else 
            return {
                ...txReceipt,
                nonce: tx.nonce,
                gasPrice: tx.gasPrice,
                gas: tx.gas,
                value: tx.value               
            } 
    }

    async queryTransactions(page, size) {
        try {
            const html = await getQueryHtml(this.txsUrl, page, size);
            const $ = cheerio.load(html);
            const txItems = $('.table-hover').find('tr');
            const txs = [];
    
            for (let i = 1, len = txItems.length; i < len; i ++) {
                const tx = txItems[i];
                const tds = $(tx).find('td');
    
                txs.push({
                    hash: $(tds[0]).find('a').text(),
                    block: $(tds[1]).find('a').text(),
                    age: $(tds[2]).find('span').text(),
                    from: $(tds[3]).find('a').text(),
                    to: $(tds[5]).find('.address-tag').text(),
                    value: $(tds[6]).text(),
                    txFree: $(tds[7]).find('font').text()
                });
            }
            return txs;
        } catch (error) {
            throw new Error(`Parse txs html error! message: [ ${error.message} ]`);
        }
    }    
    
       
}

module.exports = Transaction;