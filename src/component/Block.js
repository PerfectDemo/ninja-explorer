import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formateTimestampToTime } from '../utils/timeUtil';
import { sendBlockNumber } from '../actions/actions';
import '../App.css';

class Block extends Component {
    componentDidMount() {
        const blockNumber = this.props.match.params.blockNumber;
        this.props.sendBlockNumber(blockNumber);
    }
    
    componentWillReceiveProps (nextProps) {
       const nextBlockNumber = nextProps.match.params.blockNumber;
       const blockNumber = this.props.match.params.blockNumber;
       if (nextBlockNumber != blockNumber)
            this.props.sendBlockNumber(nextBlockNumber);
    }

    showBlockTransaction() {
        const blockNumber = this.props.blockData.number;        
        this.props.history.push(`/blockTransaction/${blockNumber}`);
    }

    render() {
        const blockData = this.props.blockData;
        const { number, timestamp, transactions, hash, parentHash, sha3Uncles, miner,
                difficulty, totalDifficulty, size, gasLimit, gasUsed, nonce, extraData } = blockData;
        const txLength = transactions.length;
        const time = formateTimestampToTime(timestamp);
        const rate = ((new Number(gasUsed) / new Number(gasLimit)) * 100).toFixed(2);
        return (
            <div className="model block">
                <h3>Block</h3>
                <div className="split"></div>
                <div className="blockmain">
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Height</p></div>
                        <div className="blockinfo-value"><p>{number}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>TimeStamp</p></div>
                        <div className="blockinfo-value"><p>{time}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Transactions</p></div>
                        <div onClick={ () => this.showBlockTransaction() }className="blockinfo-value"><p className="hover">{txLength} transactions</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>blockHash</p></div>
                        <div className="blockinfo-value"><p>{hash}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Parent Hash:</p></div>
                        <div className="blockinfo-value"><p>{parentHash}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Sha3Uncles</p></div>
                        <div className="blockinfo-value"><p>{sha3Uncles}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Mined By</p></div>
                        <div className="blockinfo-value"><p>{miner}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Difficulty</p></div>
                        <div className="blockinfo-value"><p>{difficulty}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Total Difficulty</p></div>
                        <div className="blockinfo-value"><p>{totalDifficulty}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Size</p></div>
                        <div className="blockinfo-value"><p>{size} bytes</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Gas Used</p></div>
                        <div className="blockinfo-value"><p>{gasUsed} ({rate}%)</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Gas Limit</p></div>
                        <div className="blockinfo-value"><p>{gasLimit}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Nonce:</p></div>
                        <div className="blockinfo-value"><p>{nonce}</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Block Reward</p></div>
                        <div className="blockinfo-value"><p>unknown</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Uncles Reward</p></div>
                        <div className="blockinfo-value"><p>unknown</p></div>
                    </div>
                    <div className="blockinfo-single">
                        <div className="blockinfo-name"><p>Extra Data</p></div>
                        <div className="blockinfo-value"><p>{extraData.substr(0, 30) + '......'}</p></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blockData: state.blockData
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendBlockNumber: (blockNumber) => {
            dispatch(sendBlockNumber(blockNumber));
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Block);