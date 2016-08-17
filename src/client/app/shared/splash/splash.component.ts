import {Component, Input, OnInit, HostListener, HostBinding } from '@angular/core';
import {DomSanitizationService, SafeStyle} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'jp-splash',
  templateUrl: './splash.component.html',
  styleUrls: [ './splash.component.css' ]
})
export class SplashComponent implements OnInit {
  public bgStyle: SafeStyle;
  public elHeight: string = window.innerHeight+'px';

  @Input() splashUrl: string;

  @HostBinding('style.height') get heightStyle() {
    return this.elHeight;
  }

  @HostListener('window:resize')
  onResize() {
    this.setHeight();
  }

  constructor(public sanitizer: DomSanitizationService) { }

  setHeight() {
    let h = window.innerHeight > 558 ? window.innerHeight : 558;
    this.elHeight = h+'px';
  }

  ngOnInit() {
    this.bgStyle = this.sanitizer.bypassSecurityTrustStyle(`url('${this.splashUrl}')`);
    this.setHeight();
  }
}
