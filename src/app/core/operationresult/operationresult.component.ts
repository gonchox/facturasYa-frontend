import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/model/Invoice';
import { NotificationService } from 'src/app/services/notification.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-operationresult',
  templateUrl: './operationresult.component.html',
  styleUrls: ['./operationresult.component.scss'],
})
export class OperationresultComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private operationsService: OperationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  invoices = [];
  rateTerm: any;
  initialCosts = [];
  finalCosts = [];
  operation: any;
  operationId: number;
  difDays: number;
  TE: number;
  d: number;
  sumOfFinalCosts: number = 0;
  sumOfInitalCosts: number = 0;
  sumOfRecievedAmount = 0;
  IGV = 0;

  ngOnInit(): void {
    this.operationId = this.route.snapshot.params.id;
    this.initialize();
  }
  initialize() {
    this.operationsService
      .getOperationById(this.operationId)
      .subscribe((response: any) => {
        this.operation = response;
        this.operationsService
          .getRateTermById(this.operation.rateTermId)
          .subscribe((response: any) => {
            this.rateTerm = response;
            this.operationsService.getIvoices().subscribe((response: any) => {
              var invoicesJson: Invoice[] = response.content;
              invoicesJson.forEach((element) => {
                if (element.operationId == this.operationId) {
                  this.invoices.push(element);
                }
              });

              this.invoices.forEach((element: Invoice) => {
                const date1: any = new Date(this.rateTerm.discountDate);
                const date2: any = new Date(element.paymentDay);
                const diffTime = Math.abs(date2 - date1);
                element.difDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                element.Te =
                  (Math.pow(
                    1 + this.rateTerm.effectiveRate / 100,
                    element.difDays / 360
                  ) -
                    1) *
                  100;

                element.d = (element.Te / 100 / (1 + element.Te / 100)) * 100;
                element.discount = (element.d / 100) * element.total;
                element.netoValue = element.total - element.discount;
                element.recibidoValue =
                  element.netoValue -
                  element.retention -
                  element.total * this.sumOfInitalCosts;
                console.log(this.sumOfInitalCosts);
                element.entregadoValue =
                  element.netoValue +
                  element.total * this.sumOfInitalCosts +
                  element.discount -
                  element.retention;
                element.tcea =
                  (Math.pow(
                    element.entregadoValue / element.recibidoValue,
                    this.rateTerm.daysPerYear / element.difDays
                  ) -
                    1) *
                  100;
                //IGV
                this.IGV += element.discount - element.discount * 0.18;
                this.sumOfRecievedAmount += element.recibidoValue;
              });
              console.log(this.invoices);
            });
          });

        //Final Costs
        this.operationsService.getFinalCosts().subscribe((response: any) => {
          let finalCostsJson = response.content;

          finalCostsJson.forEach((element) => {
            if (element.operationId == this.operationId) {
              this.finalCosts.push(element);
            }
          });

          this.finalCosts.forEach((element) => {
            this.sumOfFinalCosts += element.expressedValue;
          });
          this.sumOfFinalCosts = this.sumOfFinalCosts / 100;
        });

        ////Initial Costs
        this.operationsService.getInitialCosts().subscribe((response: any) => {
          let InitialCostsJson = response.content;

          InitialCostsJson.forEach((element) => {
            if (element.operationId == this.operationId) {
              this.initialCosts.push(element);
            }
          });
          this.initialCosts.forEach((element) => {
            this.sumOfInitalCosts += element.expressedValue;
          });
          this.sumOfInitalCosts = this.sumOfInitalCosts / 100;
        });
      });
  }
  endOperation() {
    var body = {
      operationDate: this.operation.operationDate,
      totalAmount: this.sumOfRecievedAmount,
      tir: this.invoices[0].tcea,
    };
    this.operationsService
      .editOperation(this.operationId, 5, this.rateTerm.id, body)
      .subscribe((response) => {
        this.router.navigate(['home']);
      });
  }
}
