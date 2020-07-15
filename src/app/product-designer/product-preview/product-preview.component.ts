import { Component, OnInit } from '@angular/core';
import { FeedThroughService } from 'src/app/services/feedthrough.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  constructor(private feedThroughService: FeedThroughService) { }

  ngOnInit(): void {
  }

}
