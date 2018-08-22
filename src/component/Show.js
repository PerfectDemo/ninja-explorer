import React, { Component } from 'react';
import '../App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Overview from './Overview';
import Blocks from './Blocks';
import Transactions from './Transactions';
import Tokens from './Tokens';
import Account from './Account';
import Loading from './Loading';
import Transaction from './Transaction';
import Block from './Block';
import BlockTransaction from './BlockTransaction';

class Show extends Component {
    render() {
        return (
            <div className="show">
                <Loading />               
                <Switch>
                    <Route exact path="/" component={ Overview }></Route>
                    <Route exact path="/overview" component={ Overview }></Route>
                    <Route path="/blocks" component={ Blocks }></Route>
                    <Route path="/transactions" component={ Transactions }></Route>
                    <Route path="/tokens" component={ Tokens }></Route>
                    <Route path="/accounts" component={ Account }></Route>    
                    <Route path="/transaction/:txHash" component={ Transaction }></Route>    
                    <Route path="/block/:blockNumber" component={ Block }></Route>
                    <Route path="/blockTransaction/:blockNumber" component={ BlockTransaction }></Route>         
                </Switch>
            </div>
        );
    }
}

export default Show;