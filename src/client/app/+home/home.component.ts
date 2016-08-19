import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_RIPPLE_DIRECTIVES } from '@angular2-material/core';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';
import { ROUTER_DIRECTIVES } from '@angular/router';

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
  MapComponent,
  PagerComponent
} from '../shared/index';

import { ContactFormComponent } from './contact-form/index';

declare var jQuery: any;
declare var dynamics: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
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
    MapComponent,
    PagerComponent
  ]
})
export class HomeComponent implements OnInit {
  blogs: any[];
  config: IConfig;
  clients: any[];
  staff: any[];
  wowEnabled = true;
  work: any[];
  workIndex = 1;
  workLimit = 6;
  workTotal = 0;
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
        this.workTotal = Math.round(res.total / 6);
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

  fetchWork(num: number) {
    let direction = num > this.workIndex ? 1 : -1;

    this.workIndex = num;

    this.workService.recent((num-1) * this.workLimit, this.workLimit)
      .subscribe((res) => {
        // Prepare to animate out current work
        let changed = false;
        let elem: HTMLElement = <HTMLElement>document.getElementById('work').children[0].children[1];
        let offsetX = window.innerWidth - elem.offsetLeft;

        dynamics.css(elem,{
            translateX: 0,
            height: elem.offsetHeight // Set the height explicitly so there are no quirks when transitioning
        });

        // Animate out the current work
        dynamics.animate(elem, { translateX: direction * offsetX },
        {
            type: dynamics.spring,
            friction: 400,
            frequency: 150,
            change: animateStep,
            complete: animateComplete
        });

        var that = this;

        // As soon as the animation is off the screen...
        function animateStep() {
            let matrix: string[] = jQuery(elem).css('transform').split(',');

            if (!changed && Math.abs(+matrix[4]) >= (offsetX - 1)) {
                // ...set a flag...
                changed = true;

                // ...and change the work collection in scope.
                that.work = res;

                // Total number of pages of work
                that.workTotal = Math.round(res.total / 6);

                dynamics.css(elem, {
                    translateX: offsetX * -direction
                });
                // Then, animate the work back in
                dynamics.animate(elem, { translateX: 0 }, {
                    type: dynamics.spring,
                    friction: 400,
                    frequency: 150
                });
            }
        }

        // When the animation completes, remove the explicitly-set height.
        function animateComplete() {
            jQuery(elem).css('height', '');
        }
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
