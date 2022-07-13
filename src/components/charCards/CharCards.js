import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices.js';

import { Waiting } from '../randomCharacter/RandomCharacter.js';
import { Error } from '../randomCharacter/RandomCharacter.js';

import './charCards.scss';

class CharCards extends Component {
    state = {
        cardsData: [],
        loading: true,
        error: false
    }

    marvelServices = new MarvelServices();

    onCharactersLoaded = cardsData => {
        this.setState({
            cardsData,
            loading: false,
            error: false
        });
    }

    onCharactersError = () => {
        this.setState({
            cardsData: [],
            loading: false,
            error: true
        });
    }

    showCharacters = () => {
        this.marvelServices
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onCharactersError);              
    }

    componentDidMount() {
        this.showCharacters(); 
    }

    render() {
        const {cardsData, loading, error} = this.state,
            loadingMessage = loading ? <Waiting/> : null,
            sectionStructure = loading ? 'char__cards db' : 'char__cards',
            errorMessage = error ? <Error/> : null,
            cards = !loadingMessage && !errorMessage ? cardsData.map(({name, thumbnail}, num) => {
                return (
                    <div className="char__card" key={num + 1}>
                        <div className="char__card-img">
                            <img src={thumbnail} alt="thumbnail" className="img"/>
                        </div>
                        <div className="char__card-title">{name}</div>
                    </div>
                )
            }) : null;

        return (
            <section className={sectionStructure}>
                {cards}
                {loadingMessage}
                {errorMessage}
            </section>
        )
    }
}

export default CharCards;