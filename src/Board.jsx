import React, { Component } from 'react';
import Deck from './Deck'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    displayCards = () => {
        let deckDisplay = [];

        for (let i = 0; i < 16; i++) {
            deckDisplay.push(
                <Deck id={i} key={i} />
            )
        }
        return deckDisplay;
    }
    render() {
        return (
            <div className='board'>
                {this.displayCards()}
            </div>
        );
    }
}

export default Board;