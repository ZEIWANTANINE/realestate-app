import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
