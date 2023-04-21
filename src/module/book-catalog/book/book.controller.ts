import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Response as IResponse } from "express";
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UploadBookDto } from './dto/upload-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: "Добавить новую книгу."
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOperation({
    summary: "Получить список книг."
  })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiOperation({
    summary: "Редактировать книгу."
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @ApiOperation({
    summary: "Удалить книгу."
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  @ApiOperation({
    summary: "Загрузить книгу.",
  })
  @ApiConsumes("multipart/form-data")
  @Post("upload")
  @UseInterceptors(FileInterceptor("book_file"))
  async upload(
    @Body() uploadBookDto: UploadBookDto,
    @UploadedFile() book_file: Express.Multer.File,
  ) {
    uploadBookDto.book_file = book_file;
    return this.bookService.upload(uploadBookDto);
  }

  @ApiOperation({
    summary: "Скачать книгу.",
  })
  @Get('download/:id')
  async download(
    @Param('id') id: string,
    @Response() response: IResponse,
  ) {
    const {
      originalname,
      file_stream,
    } = await this.bookService.download({ book_id: id });

    const filename = encodeURIComponent(originalname)
    response.set({
      'Content-Type': 'application/force-download',
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    file_stream.pipe(response);
  }
}
