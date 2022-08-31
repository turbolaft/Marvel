import React,{ Component } from 'react';
import MarvelServices from '../../services/MarvelServices';

import Skeleton from '../skeleton/SmallSkeleton';
import { Waiting } from '../randomCharacter/RandomCharacter';
import { Error } from '../randomCharacter/RandomCharacter';
import './charAbout.scss';

class CharAbout extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelServices();

    onCharLoaded = char => {
        this.setState({char, loading: false});
    }

    onCharError = () => {
        this.setState({error: true, loading: false});
    }

    onCharLoading = () => {
        this.setState({
            char: null,
            loading: true,
            error: false
        });
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCertainCharacter(this.props.charId)
            .then(this.onCharLoaded)
            .catch(this.onCharError);
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    render() {
        const {char, loading, error} = this.state,
            loadingMessage = loading ? <Waiting/> : null,
            skeleton = !char && !loading && !error ? <Skeleton/> : null,
            errorMessage = error ? <Error/> : null,
            getResult = !loading && !error && char ? <View char={char}/> : null;

        return (
            <div className="char__about about">
                {skeleton}
                {loadingMessage}
                {errorMessage}
                {getResult}
            </div>
        )
    }
}

const View = ({char}) => {
    let imgClass = 'img';

    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgClass += " contain";
    }

    return (
        <>
            <div className="about__main-info main-info">
                <div className="main-info__logo">
                    <img src={char.thumbnail} alt={char.name} className={imgClass} />
                </div>
                <div className="main-info__descr">
                    <div className="main-info__name">{char.name}</div>
                    <button className="main-info button">HOMEPAGE</button>
                    <button className="main-info__button button">WIKI</button>
                </div>
            </div>
    
            <p className="about__descr">
                {char.description || "We haven't got a description here!"}
            </p>
    
            <div className="about__comics comics">
                <div className="comics__title">Comics:</div>

                <ul className="comics__list">
                    {char.comics.map((item, index) => {
                        return (
                            <li className="comics__item" key={index}>
                                {typeof item === 'string' ? item : item.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
export { CharAbout };
