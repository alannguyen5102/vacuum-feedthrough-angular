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
  //public vacuumFeedThroughForm: FormGroup;

  //Select Options arrays
  public feedThroughTypes = [];
  public feedThroughSizes = [];
  public wireGauges = [];

  constructor(private fb: FormBuilder, private feedThroughService: FeedThroughService) { }

  ngOnInit(): void {

    //Calls to create the product form
    this.createProductForm();

    //FeedThrough Types Subscription
    //Also defaults the first select option to the first value of the array
    of(this.getFeedThroughTypes()).subscribe(feedThroughTypes => {
      this.feedThroughTypes = feedThroughTypes;
      this.productForm.patchValue({ vacuumFeedThroughForm: { feedThroughType: this.feedThroughTypes[0].id } });
    });

    //Wire Gauge Subscription
    //Also defaults the first select option to the first value of the array
    of(this.getWireGauges()).subscribe(wireGauges => {
      this.wireGauges = wireGauges;
      this.productForm.patchValue({ vacuumFeedThroughForm: { wireGauge: this.wireGauges[0].wireID.toString() } });
    });

    //FeedThrough Size Subscription
    //Also defaults the first select option to the first value of the array
    of(this.getFeedThroughSizes("kf")).subscribe(feedThroughSizes => {
      this.feedThroughSizes = feedThroughSizes;
      this.productForm.patchValue({ vacuumFeedThroughForm: { feedThroughSize: this.feedThroughSizes[0].partID.toString() } });
    });

    
    //Sends vacuumFeedThroughForm Observable to the feedThroughService
    this.feedThroughService.formValues$ = this.productForm.get('vacuumFeedThroughForm').valueChanges;
    this.feedThroughService.subbing();

    //FeedThrough Size Subscription
    //Also defaults the first select option to the first value of the array
    //Will detect changes to vacuumFeedThroughForm.feedThroughType and update 
    //feedThroughSizes based on it
    this.productForm.get('vacuumFeedThroughForm.feedThroughType').valueChanges.subscribe( 
      value => (of(this.getFeedThroughSizes(value)).subscribe(feedThroughSizes => {
        this.feedThroughSizes = feedThroughSizes;
        this.productForm.patchValue({ vacuumFeedThroughForm: { feedThroughSize: this.feedThroughSizes[0].partID.toString() } });
      }))
    );
  
  }

  //Creates the ProductForm
  createProductForm() {
    this.productForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(0), Validators.max(1000)]],
      vacuumFeedThroughForm: this.fb.group({
        feedThroughType: ['', [Validators.required]],
        feedThroughSize: ['', [Validators.required]],
        wireGauge: ['', [Validators.required]],
        leadCount: [1, [Validators.required, Validators.min(0)]],
        leadLengthVacuum: [30, [Validators.required, Validators.min(30), Validators.max(120)]],
        leadLengthAtmosphere: [30, [Validators.required, Validators.min(30), Validators.max(120)]],
      }),
    });
  }

  //Returns the JSON of FeedThroughType select options
  getFeedThroughTypes() {
    return [
      { id: 'kf', name: 'KF Flange' },
      { id: 'cf', name: 'CF Flange' },
      { id: 'npt', name: 'Hex Head Fittings'}
    ];
  }

  //Returns the JSON of FeedThroughSize select options
  //Based on the passed in FeedThroughType
  getFeedThroughSizes(selectedFeedThroughType) {
    switch (selectedFeedThroughType) {
      case 'kf':
        return [{
          partName: "KF 16",
          partID: "kf16",
        }, {
          partName: "KF 25",
          partID: "kf25",
        }, {
          partName: "KF 40",
          partID: "kf40",
        }, {
          partName: "KF 50",
          partID: "kf50",
        }];
      case 'cf':
        return [{
          partName: "1.33 CF",
          partID: "cf0133",
        }, {
          partName: "2.12 CF",
          partID: "cf0212",
        }, {
          partName: "2.75 CF",
          partID: "cf0275",
        }, {
          partName: "3.38 CF",
          partID: "cf0337",
        }];
      case 'npt':
        return [{
          partName: "3/4\" MNPT",
          partID: "3/4MNPT",
        }, {
          partName: "1\" MNPT",
          partID: "1MNPT",
        }, {
          partName: "1-1/2\" MNPT",
          partID: "1-1/2MNPT",
        }, {
          partName: "2-1/2\" MNPT",
          partID: "2-1/2MNPT",
        }];
      default:
        return [{
          partName: "",
          partID: "-1",
        }];
    }
  }

  //Returns the JSON of WireGauges select options
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
