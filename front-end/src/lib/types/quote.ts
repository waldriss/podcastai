export type Voice="brian"|"bill"|"george"|"lilly"

export interface GenerateAudioParams {
    voice:Voice,
    input:string

}

export interface CreateQuoteParams{
    quoteTitle:string,
    quoteDescription: string,
    audioUrl:string,
    imageUrl:string,
    voiceType:Voice,
    imagePrompt:string,
    voicePrompt:string,
    views: number,
    audioDuration:number
}