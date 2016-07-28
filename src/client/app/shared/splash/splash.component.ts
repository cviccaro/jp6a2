import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {DomSanitizationService, SafeStyle} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'jp-splash',
  templateUrl: './splash.component.html',
  styleUrls: [ './splash.component.css' ]
})
export class SplashComponent implements OnInit {
  public bgStyle: SafeStyle;

  @Input() splashUrl: string;

  constructor(public sanitizer: DomSanitizationService, public el: ElementRef) { }

  ngOnInit() {
    this.bgStyle = this.sanitizer.bypassSecurityTrustStyle(`url('${this.splashUrl}')`);
    this.el.nativeElement.style.height = window.innerHeight+'px';
  }
}
