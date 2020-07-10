import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-fields',
  templateUrl: './product-fields.component.html',
  styleUrls: ['./product-fields.component.css']
})
export class ProductFieldsComponent implements OnInit {

  public productForm: FormGroup;
  public feedThroughTypes = [];
  public wireGauges = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createProductForm();
    // this.feedThroughTypes = this.getFeedThroughTypes();
    of(this.getFeedThroughTypes()).subscribe(feedThroughTypes => {
      this.feedThroughTypes = feedThroughTypes;
    });
    of(this.getWireGauges()).subscribe(wireGauges => {
      this.wireGauges = wireGauges;
    });
  }

  createProductForm() {
    this.productForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(0), Validators.max(1000)]],
      feedThroughType: [, [Validators.required]],
      wireGauges: ['', [Validators.required]]
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
