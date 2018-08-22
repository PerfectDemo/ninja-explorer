import { GET_TX_DATA, SHOW_LOADING, HIDE_LOADING, GET_BLOCK_DATA, GET_BLOCK_TRANSACTION, GET_QUERY_TRANSACTIONS, GET_QUERY_BLOCKS } from '../actions/actionTypes';

const initialState = {
	loading: 'start',
	txData: {
		transactionHash: '...',
		blockNumber: '...',
		from: '0x0',
		to: '0x0',
		status: true,
		transactionIndex: 0,
		gasUsed: '0',
		gasPrice: '0',
		gasLimit: '0',
		value: '0x0'
	},
	blockData: {
		"number": 0,
		"hash": "0x0",
		"parentHash": "0x0",
		"nonce": "0x0",
		"sha3Uncles": "0x0",
		"logsBloom": "0x0",
		"transactionsRoot": "0x0",
		"stateRoot": "0x0",
		"miner": "0x0",
		"difficulty": '0',
		"totalDifficulty": '0',
		"size": 0,
		"extraData": "0x",
		"gasLimit": 0,
		"gasUsed": 0,
		"timestamp": 0,
		"transactions": [],
		"uncles": []
	}
};

export default (state = initialState, action) => {
	console.log(action);
	switch(action.type) {
		case GET_TX_DATA:
			return {...state, txData: action.txData};
		case SHOW_LOADING:
			return {...state, loading: true };
		case HIDE_LOADING:
			return {...state, loading: false};
		case GET_BLOCK_DATA:
			return {...state, blockData: action.blockData};
		case GET_BLOCK_TRANSACTION: 
			return {...state, blockTransaction: action.blockTransaction};
		case GET_QUERY_TRANSACTIONS:
			return {...state, queryTransactions: action.queryTransactions};
		case GET_QUERY_BLOCKS:
			return {...state, queryBlocks: action.queryBlocks};
		default:
			return initialState;
	}
}
