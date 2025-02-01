import { Component, inject } from '@angular/core';
import { ToastService } from '../../service/toast/toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toasts-container.component.html',
  styleUrl: './toasts-container.component.scss'
})
export class ToastsContainerComponent {
  
  toastService = inject(ToastService)

}
