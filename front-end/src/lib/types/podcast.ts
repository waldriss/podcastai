export type Voice="alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"

export interface GenerateAudioParams {
    voice:Voice,
    input:string

}