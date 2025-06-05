import { Expose, Transform } from 'class-transformer'

export class PaginationResponseDto {
  @Expose()
  @Transform(({ value }) => Number(value))
  page: number

  @Expose()
  @Transform(({ value }) => Number(value))
  size: number

  @Expose()
  @Transform(({ value }) => Number(value))
  total: number
}
