import { Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpCode, HttpStatus } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto, UpdateExamDto } from './dto/exam.dto';
import { HttpResponse } from 'http-response';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Version('1')
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createExam(@Body() createExamDto: CreateExamDto): Promise<HttpResponse<boolean>> {
    return this.examService.createExam(createExamDto);
  }

  @Version('1')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllExams(): Promise<HttpResponse<boolean>> {
    return this.examService.getAllExams();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getExamById(@Param('id') id: string): Promise<HttpResponse<boolean>> {
    return this.examService.getExamById(id);
  }

  @Version('1')
  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateExamById(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto): Promise<HttpResponse<boolean>> {
    return this.examService.updateExamById(id, updateExamDto);
  }

  @Version('1')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteExamById(@Param('id') id: string): Promise<HttpResponse<boolean>> {
    return this.examService.deleteExamById(id);
  }

  @Version('1')
  @Get('grade/:grade')
  @HttpCode(HttpStatus.OK)
  async getAllExamsByGrade(@Param('grade') grade: number) {
    return this.examService.getAllExamsByGrade(grade);
  }

  @Version('1')
  @Get('subject/:subject')
  @HttpCode(HttpStatus.OK)
  async getAllExamsBySubject(@Param('subject') subject: string) {
    return this.examService.getAllExamsBySubject(subject);
  }

  @Version('1')
  @Get('topic/:topic')
  @HttpCode(HttpStatus.OK)
  async getAllExamsByTopic(@Param('topic') topic: string) {
    return this.examService.getAllExamsByTopic(topic);
  }
}
