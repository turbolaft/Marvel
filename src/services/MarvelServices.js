class MarvelServices {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=def821eaf4ef3d42fab310c285f8e702';

    getData = async url => {
        const request = await fetch(url);

        if (!request.ok) {
            throw new Error(`Could not fetch ${url}, status ${request.status}`);
        }

        return await request.json();
    }

    getAllCharacters = async () => {
        const res = await this.getData(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformSimplifiedCharacters);
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
        }
    }

    _transformSimplifiedCharacters = res => {
        return {
            name: res.name,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
        }
    }
}

export default MarvelServices;