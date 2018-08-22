const Web3Tool = require('./helper/web3Tool');
const TrasactionService = require('./service/TransactionService');
const BlockService = require('./service/BlockService');
const { TX_HASH, TX_DATA, BLOCK_DATA, BLOCK_TRANSACTION, QUERY_TRANSACTIONS, QUERY_BLOCKS } = require('./actions');


class Controller {
    constructor(ipcMain, win) {        
        this.ipcMain = ipcMain;
        this.win = win;
        this.web3Tool = new Web3Tool();        
        this.transaction = new TrasactionService(this.web3Tool);
        this.block = new BlockService(this.web3Tool);

        this.listen();
    }

    listen() {

        // txData
        this.ipcMain.on(TX_HASH, async (_, txHash) => {
            let txData = await this.transaction.getTransaction(txHash);
            this.win.webContents.send(TX_DATA, txData);
        });

        // blockData
        this.ipcMain.on(BLOCK_DATA, async(_, blockNumber) => {
            let blockData = await this.block.getBlock(blockNumber);
            this.win.webContents.send(BLOCK_DATA, blockData);
        });

        // blockTransation
        this.ipcMain.on(BLOCK_TRANSACTION, async (_, param) => {
            let { blockNumber, page, size } = param;
            let blockTransation = await this.block.getBlockTransaction(blockNumber, page, size);
            this.win.webContents.send(BLOCK_TRANSACTION, blockTransation);
        });

        // queryTransaction
        this.ipcMain.on(QUERY_TRANSACTIONS, async (_, param) => {
            try {
                let { page, size } = param;
                const txs = await this.transaction.queryTransactions(page, size);
                this.win.webContents.send(QUERY_TRANSACTIONS, {
                    success: true,
                    data: {
                        list: txs,
                        total: 99999
                    }
                });
            } catch (error) {
                console.log('[QUERY_TRNACTIONS_ERROR]:'. error.message);
                this.win.webContents.send(QUERY_TRANSACTIONS, { success: false, message: error.message });
            }
           
            
        });

        // queryBlocks
        this.ipcMain.on(QUERY_BLOCKS, async (_, param) => {
            try {
                let { page, size } = param;
                const blocks = await this.block.queryBlocks(page, size);
                this.win.webContents.send(QUERY_BLOCKS, {
                    success: true,
                    data: {
                        list: blocks,
                        total: 99999
                    }
                });
            } catch (error) {
                console.log('[QUERY_TRNACTIONS_ERROR]:'. error.message);
                this.win.webContents.send(QUERY_BLOCKS, { success: false, message: error.message });
            }          
            
        });


    }
   
}

module.exports = Controller;