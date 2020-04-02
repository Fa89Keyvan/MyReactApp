import React, { Component } from 'react'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

export default class CalcHistory extends Component {

    constructor(props) {
        super(props);
    }


    state = { history: this.props.history }

    removeHistory = (index) => {
        let currentHistory = this.state.history;        
        currentHistory.splice(index, 1);
        this.setState({ history: currentHistory });
        
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.history.map(
                        (item, index) => {
                            return (
                                <div className="col-12 anim-slide-up remove-fade-out" key={index} id={"history-item-" + index}>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend" onClick={() => this.removeHistory(index)}>
                                            <span class="input-group-text"><i className="cursor-hand far fa-trash-alt text-danger"></i></span>
                                        </div>
                                        <input type="text" value={item} readOnly="readonly" class="form-control" aria-label="Amount (to the nearest dollar)" />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        )
    }
}
