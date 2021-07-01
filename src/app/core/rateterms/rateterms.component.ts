import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { OperationsService } from 'src/app/services/operations.service';
import { RatetermsService } from 'src/app/services/rateterms.service';

@Component({
  selector: 'app-rateterms',
  templateUrl: './rateterms.component.html',
  styleUrls: ['./rateterms.component.scss'],
})
export class RatetermsComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private rateTermsService: RatetermsService,
    private operationsService: OperationsService,
    private router: Router
  ) {}

  isLoading = false;
  rateForm: FormGroup;
  ngOnInit(): void {
    this.rateForm = new FormGroup({
      daysPerYear: new FormControl(0, [Validators.required]),
      rateTerm: new FormControl('', [Validators.required]),
      effectiveRate: new FormControl('', [Validators.required]),
      day: new FormControl('', [
        Validators.required,
        Validators.max(31),
        Validators.min(1),
      ]),
      month: new FormControl('', [
        Validators.required,
        Validators.max(12),
        Validators.min(1),
      ]),
      year: new FormControl('', [
        Validators.required,
        Validators.max(2026),
        Validators.min(1),
      ]),
    });
  }
  changeYear(e) {
    this.rateForm.get('daysPerYear').setValue(e.target.value);
  }
  nextStep() {
    if (this.rateForm.valid) {
      this.isLoading = true;

      var date =
        this.rateForm.get('year').value +
        '-' +
        this.rateForm.get('month').value +
        '-' +
        this.rateForm.get('day').value;
      var body = {
        daysPerYear: Number(this.rateForm.get('daysPerYear').value),
        rateTerm: this.rateForm.get('rateTerm').value,
        effectiveRate: this.rateForm.get('effectiveRate').value,
        discountDate: new Date(date),
      };

      this.rateTermsService.createRateTerm(body).subscribe((response: any) => {
        localStorage.setItem('discountDate', body.discountDate.toString());
        var id = response.id;
        var bodyforOperation = {
          operationDate: new Date(),
          totalAmount: 0,
          tir: 0,
        };
        this.operationsService.createOperation(id, bodyforOperation).subscribe(
          (response: any) => {
            var operationId = response.id;
            this.notificationService.OpenSnackbar(
              'Continue con el siguiente paso'
            );
            this.isLoading = false;
            this.router.navigate(['invoice-detail', operationId]);
          },
          (error) => {
            this.notificationService.OpenSnackbar('Ha ocurrido un error');
            this.isLoading = false;
          }
        );
      });
    } else {
      this.notificationService.OpenSnackbar(
        'Por favor complete el formulario correctamente'
      );
    }
  }
}
