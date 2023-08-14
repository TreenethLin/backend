import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ExamHttpService } from './http.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ExamHttpService],
  exports: [ExamHttpService],
})
export class HttpServiceModule {}
