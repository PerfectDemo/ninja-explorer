import React, { Component } from 'react';
import '../App.css';

class Page extends Component {
    getUseful() {
        const { page = 1, size = 10 } = this.props.pageParam;
        const total = this.props.total;
        let left = true;
        let right = true;

        if (!total) {
            return { left: false, right: false }
        }


        if (page == 1) {
            left = false;
        }

        if (page * size >= total) {
            right = false;
        }
        return { left, right };
    }


    render() {
        const { left, right } = this.getUseful();
        return (
            <div className="page">
               <div className="page-body">
                    { left ?  <div onClick= {() => this.props.pre() } className="pre enable">PREV</div> : <div className="pre unable">PREV</div> }                          
                    { right ? <div onClick= {() => this.props.next() } className="next enable">NEXT</div> : <div className="next unable">NEXT</div> }                    
               </div>
            </div>
        );
    }
}

export default Page;