import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { NameListService } from '../shared/index';
import {CacheService} from '../shared/cache/cache.service';
import {IConfig} from '../shared/config/env.config';
import {SplashComponent} from '../shared/splash/splash.component';
import {LogoComponent} from '../shared/logo/logo.component';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES, SplashComponent, LogoComponent]
})
export class HomeComponent implements OnInit {

  config: IConfig;

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService, public cache: CacheService) {
    this.config = this.cache.get('config');
    console.log('HomeComponent constructed', this);
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();

    console.log('HomeComponent Initialized', this);
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
                     .subscribe(
                       names => this.names = names,
                       error =>  this.errorMessage = <any>error
                       );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
