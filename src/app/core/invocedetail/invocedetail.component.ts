import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-invocedetail',
  templateUrl: './invocedetail.component.html',
  styleUrls: ['./invocedetail.component.scss'],
})
export class InvocedetailComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private operationsService: OperationsService,
    private router: Router
  ) {}
  invoiceForm: FormGroup;
  discountDate: Date;
  isLoading = false;
  ngOnInit(): void {
    this.discountDate = new Date(localStorage.getItem('discountDate'));
    this.invoiceForm = new FormGroup({
      issueDate: new FormControl('', [Validators.required]),
      paymentDay: new FormControl('', [Validators.required]),
      total: new FormControl(0, [Validators.required]),
      retention: new FormControl(0, [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      debtorRUC: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      debtorName: new FormControl('', [Validators.required]),
    });
  }
  changeCurrency(e) {
    this.invoiceForm.get('currency').setValue(e.target.value);
  }
  nextStep() {
    if (this.invoiceForm.valid) {
      this.isLoading = true;

      var date1 = this.invoiceForm.get('paymentDay').value;
      var date2 = this.invoiceForm.get('issueDate').value;
      var body = {
        issueDate: new Date(date2.toString() + ' '),
        paymentDay: new Date(date1.toString() + ' '),
        total: Number(this.invoiceForm.get('total').value),
        retention: Number(this.invoiceForm.get('retention').value),
        currency: this.invoiceForm.get('currency').value,
        debtorRUC: Number(this.invoiceForm.get('debtorRUC').value),
        debtorName: this.invoiceForm.get('debtorName').value,
      };

      if (body.paymentDay > this.discountDate) {
        let id = this.route.snapshot.params.id;
        this.operationsService
          .createInvoiceByOperationId(id, body)
          .subscribe((response: any) => {
            this.notificationService.OpenSnackbar(
              'Agregó la factura correctamente'
            );
            var operationId = id;
            this.router.navigate(['costs', operationId]);
            this.isLoading = false;
          });
      } else {
        this.notificationService.OpenSnackbar(
          'La fecha de pago debe ser mayor a la fecha de descuento'
        );
        this.isLoading = false;
      }
    } else {
      this.notificationService.OpenSnackbar('Por favor rellene el formulario');
    }
  }
}
