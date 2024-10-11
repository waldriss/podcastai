import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
    constructor(private userService:UserService){}

   @Get('top-authors')
   async getTopAuthors(){
    return this.userService.getTopAuthors()

   }
   @Get('authors/:id')
   async getAuthor(@Param('id', ParseIntPipe) id: number){
   
    return this.userService.getAuthor(id)

   }
}