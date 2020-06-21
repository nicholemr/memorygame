import React, { Component } from 'react';
import Card from './Card'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memoryKey: {},
            turns: 0,
            last_card_id: null,
            matched: [],
            turn_swaps: 0
        }
    }
    componentDidMount() {
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        var ids = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];

        shuffle(ids)
        let memkey = {}
        for (let i = 0; i < 16; i++) {
            memkey[i] = ids[i]
        }

        this.setState({ memoryKey: memkey })

    }

    swapsCount = (id) => {
        if (this.state.turn_swaps === 0) {
            this.setState({
                turn_swaps: this.state.turn_swaps + 1,
                last_card_id: id
            })
        }
        else {
            if (this.state.memoryKey[id] === this.state.memoryKey[this.state.last_card_id]) {
                let matched = this.state.matched
                matched.push(id, this.state.last_card_id)
                this.setState({
                    matched: matched,
                    last_card_id: null,
                    turn_swaps: 0,
                    turns: this.state.turns + 1
                })
            }
            else {
                this.setState({
                    last_card_id: null,
                    turn_swaps: 0,
                    turns: this.state.turns + 1
                })
            }

        }


    }

    displayDeck = () => {
        let deckDisplay = [];
        for (let i = 0; i < 16; i++) {
            deckDisplay.push(
                <Card id={i} key={i} memkey={this.state.memoryKey}
                    parentSwapsCount={this.swapsCount}
                    matchedCards={this.state.matched}
                    totalSwaps={this.state.turn_swaps}
                    turns={this.state.turns} />
            )
        }
        return deckDisplay;
    }


    render() {
        // console.log(this.state.memoryKey)

        return (
            <div className='board'>
                {this.displayDeck()}
            </div>
        );
    }
}

export default Board;