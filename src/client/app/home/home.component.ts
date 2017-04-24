import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Modal } from 'angular2-modal';
import {
  BlogService,
  CacheService,
  ContactFormComponent,
  ClientService,
  ContactFormSubmission,
  RegistersSubscribers,
  ScrollService,
  StaffService,
  ProjectService,
  Config,
  NavbarService,
  Staff,
  StaffModalComponent,
  StaffModalComponentData,
  TitleService
} from '../shared/index';

declare var dynamics: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, RegistersSubscribers, OnDestroy {
  blogs: any[];
  config: any;
  clientCols = 6;
  clients: any[];
  divisions:any[] = ['creative', 'interactive', 'mdm', 'publishing'];
  links: any = {};
  rssBlogFeedUrl: string = `${Config.API}/rss/blogs`;
  staff: any[];
  wowEnabled = true;
  work: any[];
  workIndex = 1;
  workLimit = 6;
  workTotal = 0;

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
    public navbarService: NavbarService,
    public scrollService: ScrollService,
    public staffService: StaffService,
    public projectService: ProjectService,
    public modal: Modal,
    public title: TitleService
  ) {
    this.config = this.cache.get('config');
    const onProdServer = window.location.hostname.match(/\.jpenterprises\.com$/) !== null;
    const host =  onProdServer ? 'jpenterprises.com' : 'jpedev.com';

    this.divisions.forEach((division:string) => {
      this.links[division] = `${window.location.protocol}//${division}.${host}`;
    });
  }

  ngOnInit() {
    this.blogs = this.cache.get('blogs');
    this.clients = this.cache.get('clients');
    this.staff = this.cache.get('staff');
    this.work = this.cache.get('projects');

    this.mobileConstraints();

    this.title.setTitle('Home');
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
    let work: any = this.work;

    if (window.innerWidth < Config.desktopWidth) {
      this.workLimit = 1;
      this.clientCols = 2;
      this.workTotal = Math.min(Math.round(work['total'] / this.workLimit), 6);
    } else {
      this.workLimit = 6;
      this.clientCols = 6;
      this.workTotal = Math.round(work['total'] / this.workLimit);
    }
  }

  fetchWork(num: number) {
    let direction = num > this.workIndex ? -1 : 1;

    this.workIndex = num;

    let sub = this.projectService.recent((num-1) * this.workLimit, this.workLimit)
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
            let matrix: string[] = window.getComputedStyle(elem).transform.split(',');

            let x = (matrix[12] === undefined) ? +matrix[4] : +matrix[12];

            if (!changed && Math.abs(x) >= (offsetX - 1)) {
                // ...set a flag...
                changed = true;

                // ...and change the work collection in scope.
                that.work = res;

                // Total number of pages of work
                if (window.innerWidth < Config.desktopWidth) {
                  that.workTotal = Math.min(Math.round(res.total / that.workLimit), 6);
                } else {
                  that.workTotal = Math.round(res.total / that.workLimit);
                }

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
            elem.style.height = '';
        }
      });

      this.registerSubscriber(sub);
  }

  formSubmitSuccess(submission: ContactFormSubmission) {
    this.registerSubscriber(
      this.contactForm.postToServer()
        .subscribe((res: any) => {
          let modal: any = this.modal.alert();

          modal
            .size('sm')
            .showClose(true)
            .title('Thanks!')
            .dialogClass('modal-dialog success')
            .body('<p>Your form submission has been sent.  We will reply as soon as possible.</p>')
            .open();
        })
    );
  }

  navLinkClicked(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const target = <HTMLElement>e.target;
    let href:string;

    if (target.tagName === 'SPAN') {
      href = (<HTMLAnchorElement>target.parentElement).href;
    } else {
      href = (<HTMLAnchorElement>target).href;
    }

    if (href) {
      let selector = href.replace(`${window.location.protocol}//${window.location.hostname}`, '').replace('/','')
      this.scrollService.scrollToElementAnimated('#' + selector);
    }
  }

  swipeLeftProjects(e: any) {
    if (this.workIndex !== this.workTotal) {
      this.fetchWork(this.workIndex + 1);
    }
  }

  swipeRightProjects(e: any) {
    if (this.workIndex > 0) {
      this.fetchWork(this.workIndex - 1);
    }
  }

  scrollToFold() {
    //this.scrollService.scrollToElementAnimated(this.contentStartEl.nativeElement, 1000, 0, 60);
    this.scrollService.scrollToElementAnimated(this.contentStartEl.nativeElement);
  }

  launchStaffModal(person: Staff) {
    // console.log('Launch Staff Modal: ', person);
    this.modal.open(StaffModalComponent, {
      context: new StaffModalComponentData(person)
    });
  }

  /**
   * Utilities and end-of-lifecycle
   */

  registerSubscriber(sub: Subscription) {
    this._subscriptions.push(sub);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
