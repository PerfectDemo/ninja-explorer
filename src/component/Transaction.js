import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { sendBlockNumber, sendTxHash } from '../actions/actions'

class Transaction extends Component {
    
    showBlock() {
        const blockNumber = this.props.txData.blockNumber;        
        this.props.history.push(`/block/${blockNumber}`);
    }

    componentDidMount() {
        const txHash = this.props.match.params.txHash;
        console.log(`txHash:${txHash}`);
        this.props.sendTxHash(txHash);
    }

    componentWillReceiveProps (nextProps) {
        const nextTxHash = nextProps.match.params.txHash;
        const txHash = this.props.match.params.txHash;
        if (nextTxHash != txHash)
            this.props.sendTxHash(nextTxHash);
     }

    render() {
        let { transactionHash, blockNumber, from, to, status, 
                transactionIndex, gasUsed, gasPrice, gas, nonce, value } = this.props.txData;
        return (
            <div className="model transaction">
                <h3>Transaction</h3>
                <div className="split"></div>
                <div className="txmain">
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>TxHash</p></div>
                        <div className="txinfo-value"><p>{transactionHash || 7777}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>TxReceipt Status</p></div>
                        <div className="txinfo-value"><p>{status ? 'Success': 'Fail'}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Block Height</p></div>
                        <div className="txinfo-value"><p><a className="link" onClick={ ()=> this.showBlock() }>{blockNumber}</a></p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>TimeStamp</p></div>
                        <div className="txinfo-value"><p>6 mins ago (Jul-21-2018 07:25:30 AM +UTC)</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>from</p></div>
                        <div className="txinfo-value"><p>{from}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>to</p></div>
                        <div className="txinfo-value"><p>{to}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>value</p></div>
                        <div className="txinfo-value"><p>{value}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Gas Limit</p></div>
                        <div className="txinfo-value"><p>{gas}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Gas Used By Txn</p></div>
                        <div className="txinfo-value"><p>77777</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Gas Price</p></div>
                        <div className="txinfo-value"><p>{gasPrice}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Actual Tx Cost/Fee</p></div>
                        <div className="txinfo-value"><p>{gasUsed}</p></div>
                    </div>
                    <div className="txinfo-single">
                        <div className="txinfo-name"><p>Nonce & Position</p></div>
                        <div className="txinfo-value"><p>{nonce} | {transactionIndex}</p></div>
                    </div>                  
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        txData: state.txData
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendBlockNumber: (blockNumber) => {
            dispatch(sendBlockNumber(blockNumber));
        },
        sendTxHash: (txHash) => {           
            dispatch(sendTxHash(txHash));            
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);