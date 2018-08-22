import React, { Component } from 'react';
import '../App.css';
import OverviewBlocks from './OverviewBlocks';
import OverviewTransactions from './OverviewTransactions';

class Overview extends Component {
    render() {
        return (
            <div className="model overview">
                <div className="dashboard">
                   <OverviewBlocks />
                   <OverviewTransactions />
                </div>
            </div>
        );
    }
}

export default Overview;