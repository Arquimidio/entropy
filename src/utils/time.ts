export const AVERAGE_WORDS_READ_PER_MINUTE = 200;

export const calculateReadTime = (body: string) =>
    Math.floor(body.split(/\s/).length / AVERAGE_WORDS_READ_PER_MINUTE) || 1;