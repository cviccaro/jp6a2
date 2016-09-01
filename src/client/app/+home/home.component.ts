import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Modal } from 'angular2-modal';
import {
  IconButtonComponent,
  NavbarComponent,
  CacheService,
  SplashComponent,
  LogoComponent,
  WorkService,
  StaffService,
  CardComponent,
  BackgroundDirective,
  BlogService,
  PostComponent,
  SocialIconsComponent,
  ClientService,
  MapComponent,
  PagerComponent,
  ScrollService,
  EnvConfig,
  ContactFormComponent,
  FormSubmission,
  RegistersSubscribers
} from '../shared/index';

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
    SplashComponent,
    LogoComponent,
    IconButtonComponent,
    NavbarComponent,
    CardComponent,
    BackgroundDirective,
    PostComponent,
    SocialIconsComponent,
    ContactFormComponent,
    MapComponent,
    PagerComponent
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, RegistersSubscribers, OnDestroy {
  blogs: any[];
  config: EnvConfig;
  clientCols = 6;
  clients: any[];
  staff: any[];
  wowEnabled = true;
  work: any[];
  workIndex = 1;
  workLimit = 6;
  workTotal = 0;
  year = new Date().getFullYear();

  _subscriptions: Subscription[] = [];

  @ViewChild('start') public contentStartEl: ElementRef;
  @ViewChild('projects') public projectsEl: ElementRef;
  @ViewChild(ContactFormComponent) public contactForm: ContactFormComponent;

  @HostListener('window:resize')
  onWindowResize() {
    this.mobileConstraints();
  }

  constructor(
    public blogService: BlogService,
    public cache: CacheService,
    public clientService: ClientService,
    public staffService: StaffService,
    public workService: WorkService,
    public scrollService: ScrollService,
    public modal: Modal
  ) {
    this.config = this.cache.get('config');
  }

  ngOnInit() {
    this.blogs = this.cache.get('blogs');
    this.clients = this.cache.get('clients');
    this.staff = this.cache.get('staff');
    this.work = this.cache.get('projects');

    this.mobileConstraints();
    // console.log('HomeComponent initialized.', this);
  }

  ngAfterViewInit() {
    let int = setInterval(() => {
      let bootstrapping = document.getElementById('bootstrapping');
      let style = window.getComputedStyle(bootstrapping);
      if (+style.opacity === 0) {
        bootstrapping.parentNode.removeChild(bootstrapping);
        clearInterval(int);
      }
    }, 1000);
  }

  mobileConstraints() {
    if (window.innerWidth < 960) {
      this.workLimit = 1;
      this.clientCols = 3;
    } else {
      this.workLimit = 6;
      this.clientCols = 6;
    }
  }

  fetchWork(num: number) {
    let direction = num > this.workIndex ? 1 : -1;

    this.workIndex = num;

    let sub = this.workService.recent((num-1) * this.workLimit, this.workLimit)
      .subscribe((res) => {
        // Prepare to animate out current work
        let changed = false;
        let elem: HTMLElement = this.projectsEl.nativeElement;
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

            let x = (matrix[12] === undefined) ? +matrix[4] : +matrix[12];

            if (!changed && Math.abs(x) >= (offsetX - 1)) {
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

      this.registerSubscriber(sub);
  }

  formSubmitSuccess(submission: FormSubmission) {
    this.registerSubscriber(
      this.contactForm.postToServer()
        .subscribe((res: any) => {
          console.log('HomeComponent sees response from contact form post as ', res);
          this.modal.alert()
            .size('sm')
            .showClose(true)
            .title('Thanks!')
            .dialogClass('modal-dialog success')
            .body('<p>Your form submission has been sent.  We will reply as soon as possible.</p>')
            .open();
        })
    );
  }

  scrollToFold() {
    this.scrollService.scrollToElementAnimated(this.contentStartEl.nativeElement, 1000, 0, 60);
  }

  registerSubscriber(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
