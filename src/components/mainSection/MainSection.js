import { Component } from 'react';

import CharCards from '../charCards/CharCards';
import {CharAbout} from '../charAbout/CharAbout.js';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './mainSection.scss';

class MainSection extends Component {
    state = {
        selectedChar: null,
        charEnded: false,
        additionalLoading: false,
    }

    selectCharId = id => {
        this.setState({selectedChar: id});
    }

    onCharEvents = (loading, charEnded) => {

        this.setState({
            additionalLoading: loading,
            charEnded: charEnded,
        });
    }

    render() {
        return (
            <>
                <main className="main-section">
                    <ErrorBoundary>
                        <CharCards onCharSelected={this.selectCharId}
                            onCharEvents={(loading, charEnded) => this.onCharEvents(loading, charEnded)}/>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <CharAbout charId={this.state.selectedChar}/>
                    </ErrorBoundary>
                </main>

                <div className="footer__wrapper">
                    <button
                            style={{'display': this.state.charEnded ? 'none' : 'block'}}
                            disabled={this.state.additionalLoading}
                            className="footer__button button"
                    >LOAD MORE</button>
                </div>
            </>
        )
    }
}

export default MainSection;

