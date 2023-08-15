import { Injectable, Logger } from '@nestjs/common';
import { ExamHttpService } from '@modules/http/http.service';
import { CreateExamDto, UpdateExamDto } from './dto/exam.dto';
import { ExamDal } from './exam.dal';
import { HttpResponse } from 'http-response';
import { v4 as uuidv4 } from 'uuid';
import responseConfig from '@config/response.config';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);
  constructor(private readonly examDal: ExamDal, private readonly httpService: ExamHttpService) {}

  async createExam(createExamDto: CreateExamDto): Promise<HttpResponse<boolean>> {
    const externalData = await this.httpService.generateExam(createExamDto);
    const requestData = createExamDto;
    const data = {
      id: uuidv4(),
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

  async getAllExams(): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getAllExams();
      this.logger.log('Successfully get all exams from database');
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error('Failed to get all exams from database');
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getExamById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getExamById(id);
      if (!result) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get exam from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to get exam from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async updateExamById(id: string, updateExamDto: UpdateExamDto): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getExamById(id);
      if (!result) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      await this.examDal.updateExamById(id, updateExamDto);
      this.logger.log(`Successfully update exam from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to update exam from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async deleteExamById(id: string): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getExamById(id);
      if (!result) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      await this.examDal.deleteExamById(id);
      this.logger.log(`Successfully delete exam from database with id: ${id}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to delete exam from database with id: ${id}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllExamsByGrade(grade: number): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getAllExamsByGrade(grade);
      if (result.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all exams from database with grade: ${grade}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to get all exams from database with grade: ${grade}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllExamsBySubject(subject: string): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getAllExamsBySubject(subject);
      if (result.length === 0) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all exams from database with subject: ${subject}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to get all exams from database with subject: ${subject}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }

  async getAllExamsByTopic(topic: string): Promise<HttpResponse<boolean>> {
    try {
      const result = await this.examDal.getAllExamsByTopic(topic);
      if (!result) {
        return {
          statusCode: responseConfig.NOT_FOUND.statusCode,
          message: responseConfig.NOT_FOUND.message,
        };
      }
      this.logger.log(`Successfully get all exams from database with topic: ${topic}`);
      this.logger.debug(JSON.stringify(result));
      return {
        statusCode: responseConfig.SUCCESS.statusCode,
        message: responseConfig.SUCCESS.message,
      };
    } catch (error) {
      this.logger.error(`Failed to get all exams from database with topic: ${topic}`);
      this.logger.error(error);
      return {
        statusCode: responseConfig.INTERNAL_SERVER_ERROR.statusCode,
        message: responseConfig.INTERNAL_SERVER_ERROR.message,
      };
    }
  }
}
