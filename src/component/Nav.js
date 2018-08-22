import React, { Component } from 'react';
import '../App.css';
import { sendTxHash, sendBlockNumber } from '../actions/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            text: ''
        }
    }
    sendTxHash() {       
        let text = this.state.text;
       
        if (/^0x[a-zA-Z0-9]{64}/.test(text)) {     
            this.props.history.push(`/transaction/${text}`);
        } else if( /[0-9]*/.test(text)) {      
            this.props.history.push(`/block/${text}`);
        }
    }

    handleChange(text) {       
        this.setState({
            text: text
        })
    }

    render() {
        return (
            <div className="nav">
                <div className="title">Ninja-Explorer</div>
                <div className="empty"></div>
                <div className="search">
                    <input type="text" onChange={(e) => this.handleChange(e.target.value)} placeholder="input txHash or blockNumber"/>
                    <div className="searchBtn" onClick={() => this.sendTxHash()}></div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {};
}

let mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Nav)
);

