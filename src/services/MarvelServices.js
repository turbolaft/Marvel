class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=def821eaf4ef3d42fab310c285f8e702';
    _baseOffset = 210;
    _limit = 9;

    getData = async url => {
        const request = await fetch(url);

        if (!request.ok) {
            throw new Error(`Could not fetch ${url}, status ${request.status}`);
        }

        return await request.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getData(`${this._apiBase}?limit=${this._limit}&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCertainCharacter = async id => {
        const res = await this.getData(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = res => {
        return {
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wikiPage: res.urls[1].url,
            id: res.id,
            comics: res.comics.items.length == 0 ? ["this character doesn't have any comics"] : res.comics.items.slice(0, 11),
        }
    }
}

export default MarvelServices;