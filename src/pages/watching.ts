export const prerender = false;
import axios from "axios";

async function getWatchingShows() {
    return axios
        .get(import.meta.env.SIMKL_ALL_ITEMS_URL, {
          headers: {
            Authorization: `Bearer ${import.meta.env.SIMKL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "simkl-api-key": "a3c665380228eb381725659c70ad90d5f5b146ed6c935a5e1ab7150dc680dfe0"
          }
        })
        .then((res) => res.data)
}

export async function GET() {
    try {
        const shows = await getWatchingShows();

        if(shows) {
            return new Response(
                JSON.stringify({
                    shows,
                }),
            );
        }
    } catch(error: any) {
        console.log(error);
    }
}