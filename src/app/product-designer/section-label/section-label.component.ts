import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  templateUrl: './section-label.component.html',
  styleUrls: ['./section-label.component.scss']
})
export class SectionLabelComponent implements OnInit {
  
  @Input() public sectionName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
