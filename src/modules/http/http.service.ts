import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ExamAIResponse } from 'exam.type';
import { CreateExamDto } from '@modules/exam/dto/exam.dto';

@Injectable()
export class ExamHttpService {
  private readonly logger = new Logger(ExamHttpService.name);

  constructor(private readonly httpService: HttpService) {}
  private config = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: process.env.EXAM_API_BASE_URL,
  };

  async generateExam(data: CreateExamDto): Promise<AxiosResponse<ExamAIResponse>> {
    const result = await firstValueFrom(this.httpService.post('/create_response', data, this.config));
    return result;
  }
}
