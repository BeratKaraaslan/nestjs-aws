// //TUM REQUESTLERI LOGLAR
// import { Request, Response } from 'express';
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import axios from 'axios';
// import configurations from '../settings/configurations';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void) {
//     if (configurations().request_log) {
//       res.on('close', () => {
//         const data = {
//           ip: req.ip,
//           method: req.method,
//           url: req.url,
//           header: req.headers,
//           body: req.body || '',
//           response: {
//             statusCode: res.statusCode || '',
//             statusMessage: res.statusMessage || '',
//           },
//         };
//         try {
//           axios.post(`${configurations().log_api}`, {
//             type: 'REQUEST',
//             id: `${configurations().swagger_path}`,
//             data: [data],
//           }).catch(err => { })

//         } catch (e) { console.error(e); }

//       });
//     }

//     next();
//   }
// }

