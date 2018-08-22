import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendQueryBlocks } from '../actions/actions';
import Page from './Page';
import '../App.css';

class Blocks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageParam: { page: 1, size: 10 }
        };
    }

    render() {
        const queryBlocks = this.props.queryBlocks;
        const pageParam = this.state.pageParam;
        if (!queryBlocks) {
            return <div></div>
        }

        const { list, total } = queryBlocks;
        return (
            <div className="model">
                <div className="own-title"><p>Blocks</p></div>
                <div className="block-tx-title">
                    <div className="title-blocks-age">
                        <p>age</p>
                    </div>
                    <div className="title-blocks-avgGasPrice">
                        <p>avgGasPrice</p>
                    </div>
                    <div className="title-blocks-gasLimit">
                        <p>gasLimit</p>
                    </div>
                    <div className="title-blocks-gasUsed">
                        <p>gasUsed</p>
                    </div>
                    <div className="title-blocks-height">
                        <p>height</p>
                    </div>
                    <div className="title-blocks-miner">
                        <p>miner</p>
                    </div>
                    <div className="title-blocks-reward">
                        <p>txns</p>
                    </div>
                   
                </div>

                 <div className="query-blocks">
                    {
                        list.map((block, i) =>
                         <div key={i} className="list-item list-blocks">
                            <div className="list-blocks-common list-block-same">{block.age}</div>
                            <div className="list-blocks-common list-block-same">{block.avgGasPrice}</div>
                            <div className="list-blocks-common list-block-same">{block.gasLimit}</div>
                            <div className="list-blocks-common list-block-double">{block.gasUsed}</div>
                            <div className="list-blocks-common list-block-same"  onClick={ ()=> this.showBlock(block.height)}><a className="link">{block.height}</a></div>
                            <div className="list-blocks-common list-block-double">{block.miner.substr(0, 25)}</div>
                            <div className="list-blocks-common list-block-same"  onClick={ ()=> this.showBlockTransaction(block.height)}><a className="link">{block.txn}</a></div>
                                                  
                        
                         </div>)
                    }             
                     
                </div>


                <Page pageParam={ pageParam }
                 total={ total }
                 pre={() => this.prevPage()} 
                 next={ () => this.nextPage()} 
                />    
            </div>
        );
    }
    /**  <div className="list-blocks-common list-tx-hash" onClick={ ()=> this.showTransaction(tx.hash)}><a className="link">{tx.hash.substr(0, 35) + '...'}</a></div>
                            <div className="list-blocks-common list-tx-from">{tx.from.substr(0, 25) + '...'}</div> */
    prevPage() {
        const pageParam = this.state.pageParam;
        pageParam.page = pageParam.page - 1;
        this.setState({ pageParam }, () => this.renderQueryBlocks());
    }

    nextPage() {
        const pageParam = this.state.pageParam;
        pageParam.page = pageParam.page + 1;
        this.setState({ pageParam }, () => this.renderQueryBlocks());
    }

    componentDidMount() {             
        this.renderQueryBlocks();
    }

    renderQueryBlocks() {
        const { page, size } = this.state.pageParam;
        const queryBlocksParam = { page, size}
        this.props.sendQueryBlocks(queryBlocksParam);
    }  
    
    showBlock(blockNumber) {
        this.props.history.push(`/block/${blockNumber}`);
    }

    showBlockTransaction(blockNumber) {    
        this.props.history.push(`/blockTransaction/${blockNumber}`);
    }
}

const mapStateToProps = (state) => {
    return {
        queryBlocks: state.queryBlocks
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        sendQueryBlocks: (queryBlockParam) => dispatch(sendQueryBlocks(queryBlockParam))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);