import { Injectable, NgZone } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { ParkingSpotService } from '../../../parking/services/parkingSpot.service';

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {
  private eventSourceEntry: EventSource | null = null;
  private eventSourceExit: EventSource | null = null;
  private reconnectDelay = 5000;
  private isReconnecting = false;

  public spotUpdates$ = new Subject<String>();

  constructor(private zone: NgZone, private parkingSpotService: ParkingSpotService) { }

  connect(): void {
    console.log('[SSE] Conectando...');

    if (this.eventSourceEntry) {
      this.eventSourceEntry.close();
    }

    if (this.eventSourceExit) {
      this.eventSourceExit.close();
    }

    this.eventSourceEntry = new EventSource('https://34.175.249.11:443/entries/events');
    this.eventSourceExit = new EventSource('https://34.175.249.11:443/exits/events');

    this.eventSourceEntry.addEventListener('Registro creado', (event: MessageEvent) => {
      this.zone.run(() => {
        try {
          console.log(event.data)
          const data = JSON.parse(event.data);
          this.spotUpdates$.next(data.status);

        } catch (error) {
          console.error('[SSE] Error al parsear evento Entrada de vehículo:', error);
        }
      });
    });


    this.eventSourceExit.addEventListener('Liberación de Plaza', (event: MessageEvent) => {
      this.zone.run(() => {
        try {
          console.log(event.data)
          const data = JSON.parse(event.data);
          this.spotUpdates$.next(data);

        } catch (error) {
          console.error('[SSE] Error al parsear evento Salida de vehículo:', error);
        }
      });
    });



    this.eventSourceEntry.onerror = (error) => {
      console.error('[SSE] Error en EventSourceEntry:', error);
      this.handleReconnection();
    };

    this.eventSourceExit.onerror = (error) => {
      console.error('[SSE] Error en EventSourceExit:', error);
      this.handleReconnection();
    };


  }

  disconnect(): void {
    console.warn('[SSE] Desconectando EventSource...');
    if (this.eventSourceEntry) {
      this.eventSourceEntry.close();
      this.eventSourceEntry = null;
    }

    if (this.eventSourceExit) {
      this.eventSourceExit.close();
      this.eventSourceExit = null;
    }


    this.handleReconnection();
  }

  private handleReconnection(): void {
    if (this.isReconnecting) return;

    this.isReconnecting = true;
    console.warn(`[SSE] Reintentando conexión en ${this.reconnectDelay / 1000} segundos...`);
    timer(this.reconnectDelay).subscribe(() => {
      this.isReconnecting = false;
      this.connect();
    });
  }
}
