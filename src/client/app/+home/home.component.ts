import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_RIPPLE_DIRECTIVES } from '@angular2-material/core';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';

import {
  IconButtonComponent,
  NavbarComponent,
  CacheService,
  IConfig,
  SplashComponent,
  LogoComponent,
  WorkService,
  StaffService,
  CardComponent,
  BackgroundDirective,
  GlassSquareComponent,
  BlogService,
  PostComponent,
  SocialIconsComponent,
  ClientService,
  MapComponent
} from '../shared/index';

import { ContactFormComponent } from './contact-form/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    SplashComponent,
    LogoComponent,
    IconButtonComponent,
    NavbarComponent,
    CardComponent,
    BackgroundDirective,
    GlassSquareComponent,
    MD_RIPPLE_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    PostComponent,
    SocialIconsComponent,
    ContactFormComponent,
    MapComponent
  ]
})
export class HomeComponent implements OnInit {
  blogs: any[];
  config: IConfig;
  clients: any[];
  staff: any[];
  wowEnabled = true;
  work: any[];
  workLimit = 6;
  year = new Date().getFullYear();

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(
    public cache: CacheService,
    public workService: WorkService,
    public staffService: StaffService,
    public blogService: BlogService,
    public clientService: ClientService
  ) {
    this.config = this.cache.get('config');
    this.fetchAll();
    console.log('HomeComponent constructed', this);
  }

  fetchAll() {
    this.workService.recent(0, this.workLimit)
      .subscribe(res => {
        this.work = res;
        console.log('fetched work: ', this.work);
      });

    this.staffService.all()
      .subscribe(res => {
        this.staff = res;
        console.log('fetched staff: ', this.staff);
      });

    this.blogService.recent()
      .subscribe(res => {
        this.blogs = res;
        console.log('fetch blogs: ', this.blogs);
      });

    this.clientService.featured()
      .subscribe(res => {
        this.clients = res;
        console.log('fetch clients: ', this.clients);
      });

  }

  /**
   * OnInit
   */
  ngOnInit() {
    console.log('HomeComponent Initialized', this);
  }

  formSubmitSuccess(submission: any) {
    console.log('submitted contact form!', submission);
  }
}
