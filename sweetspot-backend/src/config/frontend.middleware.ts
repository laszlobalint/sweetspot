/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const API_ROUTE_PREFIX = 'api';
const ALLOWED_EXTENSIONS = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
const resolvePath = (file: string) => path.resolve(`./public/${file}`);

export class FrontendMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    const { baseUrl } = req;
    if (baseUrl.indexOf(API_ROUTE_PREFIX) === 1) {
      next();
    } else if (ALLOWED_EXTENSIONS.filter(ext => baseUrl.indexOf(ext) > 0).length > 0) {
      res.sendFile(resolvePath(baseUrl));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
