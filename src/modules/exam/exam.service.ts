import { Injectable, Logger } from '@nestjs/common';
import { ExamHttpService } from '@modules/http/http.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamDal } from './exam.dal';
import { HttpResponse } from 'http-response';
import { v4 as uuidv4 } from 'uuid';
import responseConfig from '@config/response.config';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);
  constructor(
    private readonly examDal: ExamDal,
    private readonly httpService: ExamHttpService,
  ) {}

  async createExam(createExamDto: CreateExamDto): Promise<HttpResponse<void>> {
    const externalData = await this.httpService.generateExam(createExamDto);
    const requestData = createExamDto;
    const data = {
      id: Number(uuidv4()),
      created_at: new Date(),
      grade: requestData.grade,
      subject: requestData.subject,
      topic: requestData.topic,
      part: requestData.part,
      num_question: requestData.num_question,
      exam_responses: externalData.data,
    };
    try {
      const result = await this.examDal.createExam(data);
      this.logger.log('Successfully saved exam request to database');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error('Failed to save exam request to database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
