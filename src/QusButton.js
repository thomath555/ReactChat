import React, { Component } from 'react'

export default class QusButton extends Component {

    state = {
        show: true,
    }

    render() {
        return (
            this.state.show && (
                <div className="btn-question">
                    <div className="bot-img">
                        <img src="https://s3.amazonaws.com/insent.ai/logo.png" />
                    </div>
                    <div className="btn-qus-wrapper">
                        {this.props.buttons.map((b) => (
                            <div className="btn-single" onClick={() => { this.setState({ show: false }); this.props.onClickHandler(b) }}>
                                <p className="message">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        )
    }
}
