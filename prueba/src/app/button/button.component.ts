import {
  Component,
  OnInit,
  ContentChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input() price: number;
  @Output() selectPrice: EventEmitter<number> = new EventEmitter<number>();

  onClick() {
    this.selectPrice.emit(this.price + 1);
  }

  ngOnInit() {}
}
