import { TX_HASH, GET_TX_DATA, GET_BLOCK_DATA, SHOW_LOADING, HIDE_LOADING, BLOCK_DATA, GET_BLOCK_TRANSACTION, BLOCK_TRANSACTION, QUERY_TRANSACTIONS, GET_QUERY_TRANSACTIONS, QUERY_BLOCKS, GET_QUERY_BLOCKS } from './actionTypes';
const ipcRenderer = window.electron.ipcRenderer;

export const sendTxHash = (txHash) => {
    return (dispatch) => {
        dispatch(showLoading());
        ipcRenderer.send(TX_HASH, txHash);        
    }  
}



export const getTxData = (txData) => {
    return {
        type: GET_TX_DATA,
        txData: txData
    }
}

export const showLoading = () => {
    return {
        type: SHOW_LOADING,
    }
}

export const hideLoading = () => {
    return {
        type: HIDE_LOADING,
    }
}

export const sendBlockNumber = (blockNumber) => {
    return (dispatch) => {
        dispatch(showLoading());
        ipcRenderer.send(BLOCK_DATA, blockNumber);
    }
}

export const getBlockData = (blockData) => {
    return {
        type: GET_BLOCK_DATA,
        blockData
    }
}

export const sendBlockTransaction = (blockNumberParam) => {
    return (dispatch) => {
        dispatch(showLoading());
        ipcRenderer.send(BLOCK_TRANSACTION, blockNumberParam);
    }
}

export const getBlockTransaction = (blockTransaction) => {
    return {
        type: GET_BLOCK_TRANSACTION,
        blockTransaction
    }
}

export const sendQueryTransactions = (queryTransactionParam) => {
    return (dispatch) => {
        dispatch(showLoading());
        ipcRenderer.send(QUERY_TRANSACTIONS, queryTransactionParam);
    }
}

export const getQueryTransactions = (queryTransactions) => {
    return {
        type: GET_QUERY_TRANSACTIONS,
        queryTransactions
    }
}

export const sendQueryBlocks = (queryBlockParam) => {
    return (dispatch) => {
        dispatch(showLoading());
        ipcRenderer.send(QUERY_BLOCKS, queryBlockParam);
    }
}

export const getQueryBlocks = (queryBlocks) => {
    return {
        type: GET_QUERY_BLOCKS,
        queryBlocks
    }
}
