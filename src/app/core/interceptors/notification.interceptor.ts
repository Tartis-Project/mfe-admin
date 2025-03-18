import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

export const notificationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      let entity = '';
      let isMasculine = false;

      if (req.url.includes('/floors')) {
        entity = 'Planta';
      } else if (req.url.includes('/vehicles')) {
        entity = 'Vehículo';
        isMasculine = true;
      } else if (req.url.includes('/rates')) {
        entity = 'Tarifa';
      } else if (req.url.includes('/parking')) {
        entity = 'Planta';
      }

      if (entity) {
        const createdText = isMasculine ? 'Creado' : 'Creada';
        const updatedText = isMasculine ? 'Actualizado' : 'Actualizada';
        const deletedText = isMasculine ? 'Eliminado' : 'Eliminada';
        const articleText = isMasculine ? 'El' : 'La';

        if (req.method === 'POST') {
          Swal.fire({
            title: `${entity} ${createdText}`,
            text: `${articleText} ${entity.toLowerCase()} fue ${createdText.toLowerCase()} exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#408221',
          });
        } else if (req.method === 'PUT') {
          Swal.fire({
            title: `${entity} ${updatedText}`,
            text: `${articleText} ${entity.toLowerCase()} fue ${updatedText.toLowerCase()} exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#408221',
          });
        } else if (req.method === 'DELETE') {
          Swal.fire({
            title: `${entity} ${deletedText}`,
            text: `${articleText} ${entity.toLowerCase()} fue ${deletedText.toLowerCase()} exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#B76823',
          });
        }
      }

      return event;
    }),
  );
};
