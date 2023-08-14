import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamDal } from './exam.dal';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { HttpServiceModule } from '../http/http.module';
import { ExamEntity } from '@schemas/exam.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity]), HttpServiceModule],
  controllers: [ExamController],
  providers: [ExamService, ExamDal],
  exports: [ExamService],
})
export class ExamModule {}
