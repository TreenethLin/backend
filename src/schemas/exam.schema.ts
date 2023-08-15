import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Database } from '@config/db.config';
import { ExamAIResponse } from 'exam.type';

@Entity({ name: Database.Table.Exam })
export class ExamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  grade: number;

  @Column()
  subject: string;

  @Column()
  topic: string;

  @Column()
  part: number;

  @Column()
  num_question: number;

  @Column('json', { nullable: true })
  exam_responses: ExamAIResponse;
}
