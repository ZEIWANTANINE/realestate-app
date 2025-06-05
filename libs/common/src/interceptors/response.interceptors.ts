import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common'
  import { instanceToPlain, plainToInstance } from 'class-transformer'
  import { map, Observable } from 'rxjs'
  import { PaginationResponseDto } from '../dtos/common.dto'
  
  export interface Response<T> {
    message: string
    data: T
    timestamp: number | string
    total_count?: number
    meta_data?: any
    pagination?: PaginationResponseDto | null
  }
  
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, Response<any>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<any>> {
      return next.handle().pipe(
        map((data) => {
          const responseData = !data?.message
            ? instanceToPlain(data?.data || data)
            : null
          const pagination = data?.pagination
            ? plainToInstance(PaginationResponseDto, data.pagination)
            : null
  
          return {
            message: data?.message || 'Success',
            data: responseData,
            timestamp: new Date().getTime(),
            total_count:
              data?.totalCount ??
              (Array.isArray(responseData) ? responseData.length : 1),
            meta_data: data?.metaData ?? {},
            pagination,
          }
        }),
      )
    }
  }
  