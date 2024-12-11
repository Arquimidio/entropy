export const prerender = false;
import * as querystring from "node:querystring";
import axios from "axios";

const FAVORITE_SONGS_THRESHOLD = 9;

let refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
let token: string | null = null;

async function getFreshToken() {
    const clientId = import.meta.env.SPOTIFY_CLIENT_ID as string ?? '';
    const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET as string ?? '';

    const authOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        json: true
    };
    
    return axios.post(
        `https://accounts.spotify.com/api/token`,
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
        authOptions
    )
    .then(res => res.data.access_token)
    .catch(() => console.log('It broke on getting fresh token'));
}

async function getSavedMusic() {
    const tracksUrl = import.meta.env.SPOTIFY_TRACKS_URL as string;
    return axios.get(`${tracksUrl}?limit=${FAVORITE_SONGS_THRESHOLD}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => res.data)
    .catch(() => console.log('It broke on getting saved music'));
}

export async function GET() {
    if(!token) {
        try  {
            token = await getFreshToken();
        } catch(error) {
            console.log('Fail total');
        }
    }

    try {
        const tracks = await getSavedMusic();

        if(tracks) {
            return new Response(
                JSON.stringify({
                    tracks: tracks?.items,
                }),
            );
        }
    } catch(error: any) {
        if(error.response.status === 401) {
                token = await getFreshToken();
                await GET();
        }
    }
}