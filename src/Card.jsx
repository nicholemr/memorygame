import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id, e) {
        this.setState({
            clicked: true
        })

        this.props.parentSwapsCount(id)
        e.preventDefault()
    }

    componentDidUpdate(prevProps) {
        if (this.props.turns !== prevProps.turns) {
            if (this.props.matchedCards.includes(this.props.id) || this.props.turn_cards.includes(this.props.id)) {
                this.setState({
                    clicked: true
                })
            } else {
                this.setState({
                    clicked: false
                })
            }
        }

    }

    render() {

        if (!this.state.clicked) {
            return (
                <div className='card'
                    onClick={e => this.handleClick(this.props.id, e)}
                >
                </div>
            );
        }
        else {
            return (
                <div className='card'
                >
                    <div className={this.props.memkey[this.props.id]}>
                        {/* {this.props.memkey[this.props.id]} */}
                    </div>

                </div>
            );
        }
    }
}

export default Card;