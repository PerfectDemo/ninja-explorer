import React, { Component } from 'react';
import '../App.css';
import loading from '../loading.gif';
import { connect } from 'react-redux';

class Loading extends Component {
    render() {
        if (this.props.loading === true) {
            return (
                <div className="model loading">                
                    <img className="spin" src={loading} />
                </div>
            );        
        } else {
            return '';
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    };
}

export default connect(mapStateToProps, null)(Loading);