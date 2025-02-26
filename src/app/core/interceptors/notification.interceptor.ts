import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

export const notificationInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    map((event) => {
      let entity = '';

      if (req.url.includes('/floors')) {
        entity = 'Planta';
      } else if (req.url.includes('/vehicles')) {
        entity = 'Vehículo';
      } else if (req.url.includes('/rates')) {
        entity = 'Tarifa';
      }

      if (entity) {
        if (req.method === 'POST') {
          Swal.fire({
            title: `${entity} Creado`,
            text: `El ${entity.toLowerCase()} fue creado exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#408221',
          });
        } else if (req.method === 'PUT') {
          Swal.fire({
            title: `${entity} Actualizado`,
            text: `El ${entity.toLowerCase()} fue actualizado exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#408221',
          });
        } else if (req.method === 'DELETE') {
          Swal.fire({
            title: `${entity} Eliminado`,
            text: `El ${entity.toLowerCase()} fue eliminado exitosamente.`,
            icon: 'success',
            confirmButtonColor: '#B76823',
          });
        }
      }

      return event;
    }),
    catchError((error) => {
      Swal.fire({
        title: 'Error',
        text: 'Algo salió mal. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
      throw error;
    })
  );
};
