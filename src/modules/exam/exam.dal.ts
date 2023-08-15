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

  async getExamById(id: string): Promise<ExamEntity | null> {
    const exam = await this.examRepository.findOne({
      where: { id },
    });
    return exam;
  }

  async updateExamById(id: string, data: ExamRequestData): Promise<ExamEntity | null> {
    const exam = await this.examRepository.findOne({
      where: { id },
    });
    if (!exam) {
      return null;
    }
    const result = await this.examRepository.save({
      ...exam,
      ...data,
    });
    return result;
  }

  async deleteExamById(id: string): Promise<boolean> {
    const result = await this.examRepository.delete({
      id,
    });
    if (result.affected === 0) {
      return false;
    }
    return true;
  }

  async getAllExamsByGrade(grade: number): Promise<ExamEntity[]> {
    const allExamsByGrade = await this.examRepository.find({
      where: {
        grade,
      },
      order: {
        created_at: 'ASC',
      },
    });
    return allExamsByGrade;
  }

  async getAllExamsBySubject(subject: string): Promise<ExamEntity[]> {
    const allExamsBySubject = await this.examRepository.find({
      where: {
        subject,
      },
      order: {
        created_at: 'ASC',
      },
    });
    return allExamsBySubject;
  }

  async getAllExamsByTopic(topic: string): Promise<ExamEntity[]> {
    const allExamsByTopic = await this.examRepository.find({
      where: {
        topic,
      },
      order: {
        created_at: 'ASC',
      },
    });
    return allExamsByTopic;
  }
}
