import { IsEnum, IsString } from "class-validator";

enum VoiceOptions {
  BRIAN = 'Brian',
  BILL = 'Bill',
  GEORGE = 'George',
  LILLY = 'Lilly',
}


export class GetQuoteByVoiceDTO{
@IsString()
voice:string
}