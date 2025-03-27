import { Injectable, NgZone } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { Entry } from '../../../../shared/interfaces/entry.model';

@Injectable({
  providedIn: 'root',
})
export class EventSourceService {

  private eventSourceEntry: EventSource | null = null;
  private eventSourceExit: EventSource | null = null; 

  public entriesUpdates$ = new Subject<Entry>();
  public exitUpdates$ = new Subject<Entry>(); 

  private reconnectDelay = 5000;
  private isReconnecting = false;

  constructor(private zone: NgZone) {}

  connect(): void {
    console.log('[SSE] Conectando...');

    // Cerrar las conexiones previas si existen
    if (this.eventSourceEntry) {
      this.eventSourceEntry.close();
    }
    if (this.eventSourceExit) {
      this.eventSourceExit.close();
    }

    // Crear el EventSource para el endpoint de entradas
    this.eventSourceEntry = new EventSource('http://34.175.249.11:8000/entries/events');
    this.eventSourceEntry.addEventListener(
      'Modificación de entradas',
      (event: MessageEvent) => {
        this.zone.run(() => {
          try {
            const entry: Entry = JSON.parse(event.data);
            console.log('Evento recibido desde entradas:', entry);
            this.entriesUpdates$.next(entry);
          } catch (error) {
            console.error('[SSE] Error al parsear evento de entradas:', error);
          }
        });
      }
    );

    // Crear el EventSource para el endpoint de salidas (otro puerto)
    this.eventSourceExit = new EventSource('http://34.175.249.11:8000/exits/events');
    this.eventSourceExit.addEventListener(
      'Modificación de salidas', 
      (event: MessageEvent) => {
        this.zone.run(() => {
          try {
            const exitEntry: Entry = JSON.parse(event.data);
            console.log('Evento recibido desde salidas:', exitEntry);
            this.exitUpdates$.next(exitEntry);
          } catch (error) {
            console.error('[SSE] Error al parsear evento de salidas:', error);
          }
        });
      }
    );

    // Manejo de errores para entradas
    this.eventSourceEntry.onerror = (error) => {
      console.error('Error detectado en la conexión de entradas:', error);
      this.handleReconnection();
    };

    // Manejo de errores para salidas
    this.eventSourceExit.onerror = (error) => {
      console.error('Error detectado en la conexión de salidas:', error);
      this.handleReconnection();
    };
  }

  disconnect(): void {
    console.warn('Desconectando y preparando reconexión...');
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
    console.warn(`Reintentando conexión en ${this.reconnectDelay / 1000} segundos...`);
    timer(this.reconnectDelay).subscribe(() => {
      this.isReconnecting = false;
      this.connect();
    });
  }
}
 