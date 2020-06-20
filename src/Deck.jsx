import React, { Component } from 'react';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className='card' id={this.props.id}></div>
            </div>
        );
    }
}

export default Deck;