import { Controller, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthenticatedUserId } from 'src/auth/authenticated-user-id.decorator';

@Controller('')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('top-authors')
  async getTopAuthors() {
    return this.userService.getTopAuthors();
  }
  @Get('authors/:id')
  async getAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getAuthor(id);
  }
  @Post("change-image")
  @UseInterceptors(AnyFilesInterceptor())
  async changeProfileImage( @AuthenticatedUserId() authId: number,@UploadedFiles() files: Array<Express.Multer.File>){
   
    const imageFile = files.find((file) => file.fieldname === 'imageFile');
    return this.userService.changeProfileImage(imageFile,authId);


  }
}
