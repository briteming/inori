export function readTime(text: string) {
    const wordsPerMinute = 100;
    const numberOfWords = text.split(/\s/g).length;
    const minutes = numberOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
}

export function formatReadTime(minutes: number) {
    return `${minutes} min read`;
}