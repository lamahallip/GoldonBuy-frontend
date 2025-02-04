import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-premium',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './card-premium.component.html',
  styleUrl: './card-premium.component.scss'
})
export class CardPremiumComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() description!: string;
  @Input() img!: string; 
  @Input() productLength!: number
}
