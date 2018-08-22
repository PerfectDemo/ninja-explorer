import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class TabItem extends Component {
    render() {        
        return (
            <div className="tab-item">
                <Link className="link" to={`/${this.props.title}`}>             
                   {this.props.title}              
                </Link>
            </div>
        );
    }
}

export default TabItem;