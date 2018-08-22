import React, { Component } from 'react';
import '../App.css';
import TabItem from './TabItem';

class Tab extends Component {
    render() {
        return (
            <div className="tab">
                <TabItem title="overview" />
                <TabItem title="accounts" /> 
                <TabItem title="transactions" /> 
                <TabItem title="tokens" /> 
                <TabItem title="blocks" /> 
            </div>
        );
    }
}

export default Tab;