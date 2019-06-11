import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit {

  @Input()
  type: String = 'error';

  constructor() { }

  ngOnInit() {
  }

}
