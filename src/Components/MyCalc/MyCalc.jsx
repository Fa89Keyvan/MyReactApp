import React, { Component } from 'react'
import CalcHistory from './CalcHistory';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default class MyCalc extends Component {

    state = { result: 0, number1: 0, number2: 0, history: [] };

    addHistory = (operand, res) => {
        let currentHistory = this.state.history;
        this.setState({ history: currentHistory });
        currentHistory.push(`${this.state.number1} ${operand} ${this.state.number2} = ${res}`);
    }

    calc = (operand) => {
        let number1 = Number(this.state.number1);
        let number2 = Number(this.state.number2);
        let res = 0;
        if (operand === '+') {
            res = number1 + number2;
        }
        else if (operand === '-') {
            res = number1 - number2;
        }
        else {

        }
        this.setState({ result: res });
        this.addHistory(operand, res);
    }



    onChangeValues = (e) => {
        this.setState({ [e.target.name]: [e.target.value] });
    }

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-header bg-primary text-white">My simple calculator</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label for="number1">Number 1</label>
                                    <input type="number" 
                                           id="number1"
                                           name="number1" 
                                           className="form-control"
                                           value={this.state.number1} 
                                           onChange={this.onChangeValues} />
                                </div>
                                <div className="form-group">
                                    <label for="number2">Number 2</label>
                                    <input type="number"
                                           id="number2"
                                           name="number2"
                                           className="form-control"
                                           value={this.state.number2}
                                           onChange={this.onChangeValues} />
                                </div>
                                <div className="btn-group">
                                    <button className="btn btn-success" 
                                            onClick={() => this.calc('+')}>+
                                            </button>
                                    <button className="btn btn-danger" 
                                            onClick={() => this.calc('-')}>-
                                            </button>
                                    <input  type="text" 
                                            value={this.state.result} 
                                            readOnly="readonly"
                                            className="form-control" />
                                </div>
                            </div>
                            <div className="col-3">
                                <CalcHistory history={this.state.history} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
