import { Component, OnInit } from '@angular/core';

import { ActionsService } from './actions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Numbers {
  first_num: number;
  second_num: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly destroy$ = new Subject();

  title = 'app';
  numbers: Numbers = { first_num: 0, second_num: 0 };
  result: number;

  constructor(private action: ActionsService) {}

  ngOnInit() {
    this.action
      .connect()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.result = data.result;
      });
  }

  add() {
    this.action.add(this.numbers);
  }

  sub() {
    this.action.sub(this.numbers);
  }

  mult() {
    this.action.mult(this.numbers);
  }

  ngOnDestroy() {
    this.action.disconnect();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
