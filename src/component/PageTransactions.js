import React, { Component } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';

class PageTransactions extends Component {
    render() {
        const list = this.props.list;
        return (
            <div className="block-transaction">
                    {
                        list.map((tx, i) =>
                         <div key={i} className="list-item list-tx">
                            <div className="list-tx-common list-tx-hash" onClick={ ()=> this.showTransaction(tx.hash)}><a className="link">{tx.hash.substr(0, 35) + '...'}</a></div>
                            <div className="list-tx-common list-tx-from">{tx.from.substr(0, 25) + '...'}</div>
                            <div className="list-tx-common list-tx-to">{tx.to ? tx.to.substr(0, 25) : 'none' + '...'}</div>
                            <div className="list-tx-common list-tx-value">{tx.value}</div>
                         </div>)
                    }             
                     
            </div>
        );
    }

    showTransaction(txHash) {
        this.props.history.push(`/transaction/${txHash}`);
    }
}

export default withRouter(PageTransactions);