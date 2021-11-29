let accessToken = '';
const appClientID = '8a6e42f66e7342fbbf482c39f4e878d9';
const redirectURI = 'http://localhost:3000/';

export const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } else {
            const urlAccessToken = window.location.href.match(/access_token=([^&]*)/); //get access token and expiresin token from url
            const expiresIn = window.location.href.match(/expires_in=([^&]*)/)

            if(accessToken && urlAccessToken) { //if they exist
                accessToken = urlAccessToken;
                
                //wipe access token and url params
                window.setTimeout(() => accessToken='', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/')
            } else if (!accessToken && !urlAccessToken) {
                window.location.href =`https://accounts.spotify.com/authorize?client_id=${appClientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`; //redirects users to this uri if they dont have access token and access token not in url
            }
        }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        {headers: {Authorization: `Bearer ${accessToken}`}})
            .then((response) => {return response.json()})
            .then((jsonResponse) => {
                if(!jsonResponse.tracks.items) { //problem here
                    return [];
                }
                else {
                    return jsonResponse.tracks.items.map((track) =>  {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                        }
                    })
                }
            })
    }
}

export default Spotify