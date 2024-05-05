export const prerender = false;
import axios from "axios";

async function getBooks() {
    return axios
        .get(import.meta.env.ME_KINDLE_SERVER_URL)
        .then((res) => res.data)
}

export async function GET() {
    try {
        const books = await getBooks();

        if(books) {
            return new Response(
                JSON.stringify({
                    books: books.slice(0, 10),
                }),
            );
        }
    } catch(error: any) {
        console.log(error);
    }
}