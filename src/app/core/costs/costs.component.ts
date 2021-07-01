import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss'],
})
export class CostsComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private operationsService: OperationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  initialcostForm: FormGroup;
  finalcostForm: FormGroup;
  initialcost: any[] = [];
  finalcost: any[] = [];
  operationId: number;
  isLoading = false;
  ngOnInit(): void {
    this.operationId = this.route.snapshot.params.id;
    this.initialcostForm = new FormGroup({
      reason: new FormControl('', [Validators.required]),
      expressedName: new FormControl('', [Validators.required]),
      expressedValue: new FormControl(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });

    this.finalcostForm = new FormGroup({
      reason: new FormControl('', [Validators.required]),
      expressedName: new FormControl('', [Validators.required]),
      expressedValue: new FormControl(0, [Validators.required]),
    });
  }

  changeExpressedName(e) {
    this.initialcostForm.get('expressedName').setValue(e.target.value);
  }
  changeExpressedName2(e) {
    this.finalcostForm.get('expressedName').setValue(e.target.value);
  }
  addCost() {
    if (this.initialcostForm.valid) {
      var addingCost = {
        reason: this.initialcostForm.get('reason').value,
        expressedName: this.initialcostForm.get('expressedName').value,
        expressedValue: this.initialcostForm.get('expressedValue').value,
      };
      this.initialcost.push(addingCost);
      this.initialcostForm.reset();
    } else {
      this.notificationService.OpenSnackbar('No ha completado los campos');
    }
  }
  addCostFinal() {
    if (this.finalcostForm.valid) {
      var addingCost2 = {
        reason: this.finalcostForm.get('reason').value,
        expressedName: this.finalcostForm.get('expressedName').value,
        expressedValue: this.finalcostForm.get('expressedValue').value,
      };
      this.finalcost.push(addingCost2);
      this.finalcostForm.reset();
    } else {
      this.notificationService.OpenSnackbar('No ha completado los campos');
    }
  }
  deleteInitialCost() {
    this.initialcost.pop();
  }
  deleteFinalCost() {
    this.finalcost.pop();
  }

  createNewInvoice() {
    this.submitCosts();
    this.router.navigate(['invoice-detail', this.operationId]);
  }

  endFlow() {
    this.submitCosts();
    this.router.navigate(['result', this.operationId]);
  }

  submitCosts() {
    console.log(this.finalcost);
    console.log(this.initialcost);
    this.isLoading = true;
    this.finalcost.forEach((singlefinalCost) => {
      this.operationsService
        .createFinalCostByOperationId(this.operationId, singlefinalCost)
        .subscribe((response) => {
          this.isLoading = false;
        });
    });

    this.initialcost.forEach((singleInitialCost) => {
      this.operationsService
        .createInitialCostByOperationId(this.operationId, singleInitialCost)
        .subscribe((response) => {
          this.isLoading = false;
        });
    });

    this.notificationService.OpenSnackbar('se han agregado los gastos');
  }
}
