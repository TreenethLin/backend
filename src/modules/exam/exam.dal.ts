import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from '@schemas/exam.schema';
import { ExamRequestData } from 'exam.type';

export class ExamDal {
  private readonly logger = new Logger(ExamDal.name);

  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  async createExam(data: ExamRequestData): Promise<ExamEntity> {
    const result = await this.examRepository.save(data);
    return result;
  }

  async getAllExams(): Promise<ExamEntity[]> {
    const allExams = await this.examRepository.find({
      order: {
        created_at: 'ASC',
      },
    });
    return allExams;
  }
}
