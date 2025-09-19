import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryBookDto } from './dto/query.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new book'
  })
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get('All')
  findAll() {
    return this.bookService.findAll({ relations: { histories: true, borrows: true } });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Get('bookHistory/:id')
  @ApiBearerAuth()
  bookHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.bookHistory(id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Get('statisticUser')
  @ApiBearerAuth()
  statistikaUser() {
    return this.bookService.statistyUser()
  }

  @Get('statisticBook')
  statistikaBook() {
    return this.bookService.statistyBook()
  }

  @Post('query')
  querry(@Query() querryDto: QueryBookDto) {
    const { title, author, published_year, available } = querryDto

    const where: any = {}

    if (title) where.title = title;
    if (author) where.author = author;
    if (published_year) where.published_year = published_year;
    if (available) where.available = available;

    return this.bookService.query({
      where,
      relations: { histories: true, borrows: true }
    })
  }


  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id, { relations: { histories: true, borrows: true } });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Delete(':id')
  @ApiBearerAuth()
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.delete(id);
  }
}
