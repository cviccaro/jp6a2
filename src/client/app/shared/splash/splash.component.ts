import {Component, Input, OnInit, HostListener} from '@angular/core';
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

  @HostListener('window:resize')
  onResize() {
    this.elHeight = window.innerHeight+'px';
  }

  constructor(public sanitizer: DomSanitizationService) { }

  ngOnInit() {
    this.bgStyle = this.sanitizer.bypassSecurityTrustStyle(`url('${this.splashUrl}')`);
  }
}
