import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PageTransactions from './PageTransactions';
import Page from './Page';
import { sendQueryTransactions } from '../actions/actions';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageParam: { page: 1, size: 10 }
        }
    }
    render() {
        const queryTransactions = this.props.queryTransactions;
        const pageParam = this.state.pageParam;
        if (!queryTransactions) {
            return <div></div>
        }

        const { list, total } = queryTransactions;
        return (          
            
            <div className="model blocks">
                <div className="own-title"><p>Transactions</p></div>
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
                <PageTransactions list={list}/>
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
        this.setState({ pageParam }, () => this.renderQueryTransactions());
       
    }
    
    nextPage() {
        const pageParam = this.state.pageParam;
        pageParam.page = pageParam.page + 1;
        this.setState({ pageParam }, () => this.renderQueryTransactions());
       // this.renderBlockTransaction();
    }

    componentDidMount() {             
        this.renderQueryTransactions();
    }

    renderQueryTransactions() {
        const { page, size } = this.state.pageParam;
        const blockNumberParam = { page, size}
        this.props.sendQueryTransactions(blockNumberParam);
    }   
}

let mapStateToProps = (state) => {
    return {
        queryTransactions: state.queryTransactions
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendQueryTransactions: (queryTransactionsParam) => dispatch(sendQueryTransactions(queryTransactionsParam))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);