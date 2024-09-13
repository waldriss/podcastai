export type Voice="brian"|"bill"|"george"|"lilly"

export interface GenerateAudioParams {
    voice:Voice,
    input:string

}