import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/roles/roles.decorators';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { imageFileFilter } from 'src/utils/image-file-filter';
import { NullableType } from 'src/utils/types/nullable.type';
import { User, UserImage } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Roles(RoleEnum.admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: User['id']): Promise<NullableType<User>> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: User['id'],
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']) {
    return this.usersService.remove(id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('image')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image',
        },
      ],
      {
        fileFilter: imageFileFilter,
      },
    ),
  )
  async uploadImage(@UploadedFiles() files: { image?: Express.Multer.File }) {
    return this.usersService.uploadUserImage(files['image'][0]);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('image/:id')
  @HttpCode(HttpStatus.OK)
  async removeImage(@Param('id') id: UserImage['id']) {
    return this.usersService.removeImage(id);
  }
}
