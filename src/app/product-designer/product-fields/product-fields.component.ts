import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
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

  //Form Accessors
  public formQuantity: AbstractControl;
  
  public formFeedThroughType: AbstractControl;
  public formFeedThroughSize: AbstractControl;
  public formWireGauge: AbstractControl;
  public formLeadCount: AbstractControl;
  public formLeadLengthVacuum: AbstractControl;
  public formLeadLengthAtmosphere: AbstractControl;

  public formMinOperatingTemperature: AbstractControl;
  public formMaxOperatingTemperature: AbstractControl;
  public formMaxFeedThroughExposureTemperature: AbstractControl;
  public formDurationFeedThroughExposureTemperature: AbstractControl;

  public maxLeadOutput: number;

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
    this.updateLeadCountMax(6);
    this.feedThroughService.customerVacuumFeedThrough.maxLeadChanged.subscribe((value: number) => this.updateLeadCountMax(value));
  }

  //Creates the ProductForm
  createProductForm() {
    this.productForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],

      vacuumFeedThroughForm: this.fb.group({
        feedThroughType: ['', [Validators.required]],
        feedThroughSize: ['', [Validators.required]],
        wireGauge: ['', [Validators.required]],
        leadCount: [1, [Validators.required, Validators.min(1)]],
        leadLengthVacuum: [30, [Validators.required, Validators.min(30), Validators.max(120)]],
        leadLengthAtmosphere: [30, [Validators.required, Validators.min(30), Validators.max(120)]],
      }),
      temperatureForm: this.fb.group({
        minOperatingTemperature: ['', [Validators.required]],
        maxOperatingTemperature: ['', [Validators.required]],
        maxFeedThroughExposureTemperature: ['', [Validators.required]],
        durationFeedThroughExposureTemperature: ['', [Validators.required]],

      }),
      notesForm: this.fb.group({
        applicationNotes: [''],
        customerNotes: ['']
      }),
      contactForm: this.fb.group({
        telephone: [''],
        email: ['']
      })
    });

    this.formQuantity = this.productForm.get('quantity');

    this.formFeedThroughType = this.productForm.get('vacuumFeedThroughForm.feedThroughType');
    this.formFeedThroughSize = this.productForm.get('vacuumFeedThroughForm.feedThroughSize');
    this.formWireGauge = this.productForm.get('vacuumFeedThroughForm.wireGauge');
    this.formLeadCount = this.productForm.get('vacuumFeedThroughForm.leadCount');
    this.formLeadLengthVacuum = this.productForm.get('vacuumFeedThroughForm.leadLengthVacuum');
    this.formLeadLengthAtmosphere = this.productForm.get('vacuumFeedThroughForm.leadLengthAtmosphere');

    this.formMinOperatingTemperature = this.productForm.get('temperatureForm.minOperatingTemperature');
    this.formMaxOperatingTemperature = this.productForm.get('temperatureForm.maxOperatingTemperature');
    this.formMaxFeedThroughExposureTemperature = this.productForm.get('temperatureForm.maxFeedThroughExposureTemperature');
    this.formDurationFeedThroughExposureTemperature = this.productForm.get('temperatureForm.durationFeedThroughExposureTemperature');
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

  checkPhoneOrEmail(){
    // if ($('#email').val() === "" && $('#tel').val() === "") {
    //   alert("Email or Phone Number required");
    //   return false;
    //   }
    //   return true;
    console.log("Submit: ", this.productForm.value);
  }
  
  updateLeadCountMax(value: number): void {
    this.productForm.get('vacuumFeedThroughForm.leadCount').setValidators([Validators.required, Validators.min(1), Validators.max(value)]);
    this.productForm.get('vacuumFeedThroughForm.leadCount').updateValueAndValidity({onlySelf: true, emitEvent: false});
    this.maxLeadOutput = value;
  }
  
}
