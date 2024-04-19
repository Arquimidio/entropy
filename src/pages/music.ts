export const prerender = false;
import * as querystring from "node:querystring";
import axios from "axios";

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

    return await axios.post(
        `https://accounts.spotify.com/api/token`,
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
        authOptions
    ).then(res => res.data.access_token);
}

async function getSavedMusic() {
    const tracksUrl = import.meta.env.SPOTIFY_TRACKS_URL as string;
    return await axios.get(`${tracksUrl}?limit=5`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.data);
}

export async function GET({ params }: { params?: any }) {
    if(!token) {
        token = await getFreshToken();
    }

    try {
        const tracks = await getSavedMusic();

        return new Response(
            JSON.stringify({
                tracks: tracks?.items,
            }),
        );
    } catch(error) {
        token = await getFreshToken();
        await GET({});
    }
}