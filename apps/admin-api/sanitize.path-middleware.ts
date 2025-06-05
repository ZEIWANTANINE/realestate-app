import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { normalize, sep } from 'path'

@Injectable()
export class SanitizePathMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestedPath = req.path
    const normalizedPath = normalize(requestedPath)

    // Check if the normalized path attempts to navigate outside the public directory
    if (normalizedPath.includes(`..${sep}`)) {
      throw new ForbiddenException('Access to the requested path is forbidden')
    }

    next()
  }
}
