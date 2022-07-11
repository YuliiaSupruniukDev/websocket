import { Injectable } from '@angular/core';
import { Numbers } from './app.component';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActionsService {
  public events: Subject<any> = new Subject<any>();
  constructor(private socket: Socket) {}

  connect(): Subject<any> {
    this.socket.on('message', (data: any) => {
      console.log('Received message from server');
      this.events.next(data);
    });

    return this.events;
  }

  add(numbers: Numbers) {
    this.socket.emit('sum', numbers);
  }

  sub(numbers: Numbers) {
    this.socket.emit('sub', numbers);
  }

  mult(numbers: Numbers) {
    this.socket.emit('mult', numbers);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
