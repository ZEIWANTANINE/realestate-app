import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GooglemapService } from './googlemap.service';

@Module({
  imports: [ConfigModule],
  providers: [GooglemapService],
  exports: [GooglemapService],
})
export class GooglemapModule {}
