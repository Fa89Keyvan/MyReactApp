import React, { Component } from 'react'
import { match } from 'react-router-dom'

export default class Home extends Component {

    

    render() {
        console.log(this.props);
        const userId = this.props.match.params.id;
        return (
            <>
              <div>
                  <h3>Home</h3>
                  <h4>ID: {userId}</h4>
              </div>  
            </>
        )
    }
}
