import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;

  initSocket(): void {
    this.socket = io.connect(environment.backendHost);
  }

  emit(event: string) {
    this.socket.emit(event);
  }

  onReloadData(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('onReload', (data: any) => {
        observer.next(data);
      });
    });
  }
}
