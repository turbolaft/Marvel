import React, { Component } from 'react';
import MarvelServices from '../../services/MarvelServices.js';
import PropTypes from 'prop-types';

import BigSkelleton from '../skeleton/BigSkelleton.js';
import { Error } from '../randomCharacter/RandomCharacter.js';

import './charCards.scss';

class CharCards extends Component {

    state = {
        cardsData: [],
        loading: true,
        error: false,
        additionalLoading: false,
        charEnded: false,
        offset: 210,
    }

    marvelServices = new MarvelServices();

    onCharactersLoaded = newCardsData => {
        if (newCardsData.length < 9) {
            this.setState({
                charEnded: true,
            });
        } 

        this.setState(({cardsData, offset}) => ({
            cardsData: [...cardsData, ...newCardsData],
            loading: false,
            error: false,
            offset: offset + 9,
            additionalLoading: false,
        }));
    }

    onCharactersError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    newDataLoading = () => {
        this.setState({
            additionalLoading: true,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.additionalLoading !== this.state.additionalLoading || prevState.charEnded !== this.state.charEnded) {
            this.props.onCharEvents(this.state.additionalLoading, this.state.charEnded);
        }
    }

    showCharacters = offset => {
        this.newDataLoading();
        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onCharactersError);
    }

    componentDidMount() {
        this.showCharacters();
        window.addEventListener('click', this.onLoadMoreCards);
    }

    onLoadMoreCards = e => {
        if (e.target.classList.contains('footer__button')) {
            this.showCharacters(this.state.offset);
        }
    }

    interval;

    onChoiceCard = id => {
        this.myRefsArr.forEach(item => {
            item.classList.remove('char__card--selected');
        });

        this.myRefsArr.forEach(item => {
            if (item.getAttribute('data-id') == id) {
                item.classList.add('char__card--selected');
            }
        });
        this.myRefsArr = [];

        if (document.documentElement.clientWidth < 1282) {
            this.start = performance.now();

            requestAnimationFrame(this.increaseCurrentXCoordinate);
        }
    }

    animationSetUp = {
        duration: 1000,
        timing: timeFraction => {
            return Math.pow(timeFraction, 2);
        },
        draw: time => {
            const finishStop = Math.round(document.querySelector('.random').getBoundingClientRect().bottom),
                scrollTop = document.documentElement.scrollTop;

            if (time === 1) {
                window.scrollTo(0, time * (scrollTop + finishStop));
            } else {
                window.scrollTo(0, scrollTop - time * (scrollTop - (scrollTop + finishStop)));
            }
        }
    }

    increaseCurrentXCoordinate = time => {
        const {duration, timing, draw} = this.animationSetUp;

        let timeFraction = (time - this.start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1 && Math.round(document.querySelector('.random').getBoundingClientRect().bottom) != 0) {
            requestAnimationFrame(this.increaseCurrentXCoordinate);
        }
    }

    myRefsArr = [];

    pointOutCard = el => {
        if (el != null) {
            this.myRefsArr.push(el);
        }
    }

    render() {
        let errorArr = [];

        for (let i = 0; i < this.marvelServices._limit; i++) {
            errorArr.push(
                <div className="centered" key={i}>
                    <BigSkelleton/>
                </div>
            );
        }

        const {cardsData, loading, error, additionalLoading, charEnded} = this.state,
            loadingMessage = loading || additionalLoading && !error ? errorArr : null,
            errorMessage = error ? <Error/> : null,
            cards = !loading && !errorMessage ? cardsData.map(({name, thumbnail, id}) => {
                return (
                    <div 
                        data-id={id}
                        tabIndex={0}
                        onClick={() => {
                            this.props.onCharSelected(id);
                            this.onChoiceCard(id);
                        }}
                        onKeyPress={e => {
                            if (e.code == "Space" || e.code == "Enter") {
                                this.props.onCharSelected(id)
                                this.onChoiceCard(id);
                            }
                        }}
                        ref={el => this.pointOutCard(el)}
                        className="char__card centered"
                        key={id}>
                            <div className="char__card-img">
                                <img src={thumbnail} alt="thumbnail" className="img"/>
                            </div>
                            <div className="char__card-title">{name}</div>
                    </div>
                )
            }) : null;

        return (
            <>
                <section className="char__cards">
                    {cards}
                    {loadingMessage}
                    {errorMessage}
                </section>
            </>
        )
    }
}

CharCards.propTypes = {
    onCharSelected: PropTypes.func,
    onCharEvents: PropTypes.func,
}

export default CharCards;