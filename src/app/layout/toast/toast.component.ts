import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { ToastService } from '../../service/toast/toast.service';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnDestroy {

  toastService = inject(ToastService)

  showStandard(template: TemplateRef<any>) {
		this.toastService.show({ template });
	}

  showSuccess(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-success text-light', delay: 7000 });
	}

	showDanger(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 12000 });
	}

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
