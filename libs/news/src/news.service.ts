import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@app/common';
import { ICreateNew, IListNew, IUpdateNew } from '@app/news/news.interface';
import { CompanyRepository, CompanyEntity, NewRepository } from '@app/database';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewEntity } from '@app/database/entities/new.entity';

@Injectable()
export class NewsService {
    constructor(
            private readonly newRepository: NewRepository
        ) {}
          async create(data: ICreateNew) {
            const company = await this.newRepository.create({
              title: data.title,
              content: data.content,
              thumbnail_url: data.thumbnail_url,
              source_url: data.source_url,
              published_at: data.published_at,
              tags: data.tags,
              user_id: data.user_id,
            })
            return company
          }
        
          async findAll(params: IListNew) {
            return this.newRepository.findAll({
              ...params,
              size: params.size || DEFAULT_PAGE_SIZE,
              page: params.page || DEFAULT_PAGE,
            })
          }
        
          async findOne(id: number) {
            const news = await this.newRepository.findById(id)
            if (!news) throw new NotFoundException('news not found')
            return news
          }
        
          async update(id: number, data: IUpdateNew) {
            const news = {
              title: data.title,
              content: data.content,
              thumbnail_url: data.thumbnail_url,
              source_url: data.source_url,
              published_at: data.published_at,
              tags: data.tags,
              user_id: data.user_id,
            } as Partial<NewEntity>
        
            return await this.newRepository.update(id, news)
          }
        
          async softDelete(id: number) {
            const news = await this.newRepository.findById(id)
            if (!news) throw new NotFoundException('news not found')
            return this.newRepository.softDelete(id)
          }
}
