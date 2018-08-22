import { TX_DATA, BLOCK_DATA, BLOCK_TRANSACTION, QUERY_TRANSACTIONS, QUERY_BLOCKS } from './actionTypes';
import { getTxData, hideLoading, getBlockData, getBlockTransaction, getQueryTransactions, getQueryBlocks } from './actions';
const ipcRenderer = window.electron.ipcRenderer;

export default function connectToElectron(store) {
    ipcRenderer.on('begin', (data) => {
        store.dispatch({});
    });

    ipcRenderer.on(TX_DATA, (_, txData) => {
        store.dispatch(hideLoading());
        if (txData == null) {
            // todo notice unfind
        } else {
            console.log(txData);        
            store.dispatch(getTxData(txData));
        }         
    });

    ipcRenderer.on(BLOCK_DATA, (_, blockData) => {
        store.dispatch(hideLoading());
        if (blockData == null) {
            // todo notice unfind
        } else {
            console.log(blockData);
            store.dispatch(getBlockData(blockData));
        }
        
    });

    ipcRenderer.on(BLOCK_TRANSACTION, (_, BlockTxsResult) => {
        store.dispatch(hideLoading());
        if (BlockTxsResult.success) {
            console.log(BlockTxsResult);
            store.dispatch(getBlockTransaction(BlockTxsResult.data));
        } else {
            // todo notice unfind
        }
    });

    ipcRenderer.on(QUERY_TRANSACTIONS, (_, queryTransactionsResult) => {
        store.dispatch(hideLoading());
        if (queryTransactionsResult.success) {
            store.dispatch(getQueryTransactions(queryTransactionsResult.data));
        } else {
            // todo notice unfind
        }
    });

    ipcRenderer.on(QUERY_BLOCKS, (_, queryblocksResult) => {
        store.dispatch(hideLoading());
        if (queryblocksResult.success) {
            store.dispatch(getQueryBlocks(queryblocksResult.data));
        } else {
            // todo notice unfind
        }
    })

    
}