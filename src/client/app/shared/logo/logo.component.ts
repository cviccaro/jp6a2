import {Component} from '@angular/core';
import {CacheService} from '../cache/cache.service';

@Component({
  moduleId: module.id,
  selector: 'jp-logo',
  template: '<img [src]="logo.url" [alt]="logo.description" />'
})
export class LogoComponent {
  logo: { [key: string] : any };

  constructor(public cache: CacheService) {
    this.logo= this.cache.get('config').main_site_logo;
  }
}
