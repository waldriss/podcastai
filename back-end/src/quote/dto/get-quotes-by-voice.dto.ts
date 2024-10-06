import { IsEnum } from "class-validator";

enum VoiceOptions {
  BRIAN = 'Brian',
  BILL = 'Bill',
  GEORGE = 'George',
  LILLY = 'Lilly',
}


export class GetQuoteByVoiceDTO{
@IsEnum(VoiceOptions,{message:'Voice muste be either "Brian" or "Bill" or "George" or "Lilly"'})
voice:VoiceOptions
}