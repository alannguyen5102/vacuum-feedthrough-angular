import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { FeedThroughService } from 'src/app/services/feedthrough.service';

@Component({
  selector: 'app-product-fields',
  templateUrl: './product-fields.component.html',
  styleUrls: ['./product-fields.component.scss']
})
export class ProductFieldsComponent implements OnInit {

  public productForm: FormGroup;
  public feedThroughTypes = [];
  public wireGauges = [];
  constructor(private fb: FormBuilder, private feedThroughService: FeedThroughService) { }

  ngOnInit(): void {

    this.createProductForm();

    of(this.getFeedThroughTypes()).subscribe(feedThroughTypes => {
      this.feedThroughTypes = feedThroughTypes;
      this.productForm.controls.feedThroughType.patchValue(this.feedThroughTypes[0].id);
    });
    of(this.getWireGauges()).subscribe(wireGauges => {
      this.wireGauges = wireGauges;
      this.productForm.controls.wireGauge.patchValue(this.wireGauges[0].wireID.toString());
    });
    console.log(this.productForm.value);
    // this.feedThroughTypes = this.getFeedThroughTypes();
    this.feedThroughService.getTest();
    this.feedThroughService.formValues$ = this.productForm.valueChanges;
    this.feedThroughService.subbing();
  
  }

  createProductForm() {
    this.productForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(0), Validators.max(1000)]],
      feedThroughType: ['', [Validators.required]],
      wireGauge: ['', [Validators.required]]
    });
  }
  getFeedThroughTypes() {
    return [
      { id: 'kf', name: 'KF Flange' },
      { id: 'cf', name: 'CF Flange' },
      { id: 'npt', name: 'Hex Head Fittings'}
    ];
  }

  getWireGauges() {
    return [{
      wireName: "26 AWG",
      wireID: 26,
      outerDiameter: 0.039
    }, {
      wireName: "24 AWG",
      wireID: 24,
      outerDiameter: 0.044
    }, {
      wireName: "22 AWG",
      wireID: 22,
      outerDiameter: 0.05
    }, {
      wireName: "20 AWG",
      wireID: 20,
      outerDiameter: 0.058
    }, {
      wireName: "18 AWG",
      wireID: 18,
      outerDiameter: 0.068
    }, {
      wireName: "16 AWG",
      wireID: 16,
      outerDiameter: 0.078
    }, {
      wireName: "14 AWG",
      wireID: 14,
      outerDiameter: 0.092
    }, {
      wireName: "12 AWG",
      wireID: 12,
      outerDiameter: 0.121
    }];
  }
}
