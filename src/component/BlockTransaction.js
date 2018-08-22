import React, { Component } from 'react';
import '../App.css';
import Page from './Page';
import { sendBlockTransaction } from '../actions/actions';
import { connect } from 'react-redux';
import PageTransactions from './PageTransactions';

class BlockTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageParam: { page: 1, size: 10 }
        }
    }

    render() {
       const pageParam = this.state.pageParam;
       if (!this.props.blockTransaction)
            return <div></div>
        const { total, list } = this.props.blockTransaction;
        const blockNumber = this.props.match.params.blockNumber; 
    
        return (
            <div className="model">
                <div className="own-title"><p>Block: {blockNumber} </p></div>
                <div className="block-tx-title">
                    <div className="block-tx-hash">
                        <p>TxHash</p>
                    </div>
                    <div className="block-tx-from">
                        <p>From</p>
                    </div>
                    <div className="block-tx-to">
                        <p>To</p>
                    </div>
                    <div className="block-tx-value">
                        <p>Value</p>
                    </div>
                </div>
                <PageTransactions list={list} />
              
                <Page pageParam={ pageParam }
                 total={total}
                 pre={() => this.prevPage()} 
                 next={ () => this.nextPage()} 
                />                
            </div>
        );
    }      

    prevPage() {
        const pageParam = this.state.pageParam;
        pageParam.page = pageParam.page - 1;
        this.setState({ pageParam }, () => this.renderBlockTransaction());
       
    }
    
    nextPage() {
        const pageParam = this.state.pageParam;
        pageParam.page = pageParam.page + 1;
        this.setState({ pageParam }, () => this.renderBlockTransaction());
       // this.renderBlockTransaction();
    }

    componentDidMount() {             
        this.renderBlockTransaction();
    }

    renderBlockTransaction() {
        const blockNumber = this.props.match.params.blockNumber; 
        const { page, size } = this.state.pageParam;
        const blockNumberParam = { blockNumber, page, size}
        this.props.sendBlockTransaction(blockNumberParam);
    }   
}

let mapStateToProps = (state) => {
    return {
        blockTransaction: state.blockTransaction
    };
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendBlockTransaction: (blockNumberParam) => dispatch(sendBlockTransaction(blockNumberParam))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockTransaction);

/**
 *   <div className="block-transaction">
                    {
                        list.map((tx, i) =>
                         <div key={i} className="list-item list-tx">
                            <div className="list-tx-common list-tx-hash" onClick={ ()=> this.showTransaction(tx.hash)}><a className="link">{tx.hash.substr(0, 35) + '...'}</a></div>
                            <div className="list-tx-common list-tx-from">{tx.from.substr(0, 25) + '...'}</div>
                            <div className="list-tx-common list-tx-to">{tx.to.substr(0, 25) + '...'}</div>
                            <div className="list-tx-common list-tx-value">{tx.value}</div>
                         </div>)
                    }
                    
                     
                </div>
 */