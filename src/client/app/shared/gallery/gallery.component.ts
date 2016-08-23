import { Component, Input, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ManagedImageSlide, BackgroundDirective } from '../index';
import { GalleryItemDirective } from '../gallery/gallery-item.directive';
import { PagerComponent } from '../pager/pager.component';

declare var dynamics: any;
declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'jp-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: [ './gallery.component.css' ],
	directives: [ BackgroundDirective, PagerComponent, GalleryItemDirective ]
})
export class GalleryComponent implements OnInit, AfterViewInit {
	animationOptions = {
	    type: dynamics.spring,
	    friction: 500,
	    frequency: 20,
	    duration: 1000
	};

	current = 1;
	ready = false;

	@Input() images: ManagedImageSlide[] = [];
	@ViewChildren(GalleryItemDirective) public items: QueryList<GalleryItemDirective>;

	ngOnInit() {
		if (this.images.length) this.images[0].active = true;
	}

	ngAfterViewInit() {
		console.log('GalleryComponent View Initialized. ', this);
		setTimeout(() => this.ready = true, 250);
	}

	switch(num: number) {
		console.log('switch to ' + num);

		const prevNum = this.current - 1;

		// Determine direction of animation, amount of pixels to animate
		const direction = num < this.current ? -1 : 1;
		const offsetX = window.innerWidth;

		// Get DOM elements using elem property set by link()
		let $currentImage: = jQuery(this.items.toArray()[this.current - 1].el.nativeElement);
		let $nextImage = jQuery(this.items.toArray()[num - 1].el.nativeElement);

		// Set active property on item animating-out to false by extending
		// animation options
		let exitOptions = Object.assign({}, this.animationOptions);

		exitOptions.complete = () => {
			setTimeout(() => this.images[prevNum].active = false);
		};

		// Prepare image that will animate in
		dynamics.css($nextImage[0], { translateX: -direction * offsetX});

		// Animate current image out
		dynamics.animate($currentImage[0], { translateX: direction * offsetX }, exitOptions);

		// Animate new image in after small delay
		setTimeout(() => {
			dynamics.animate($nextImage[0], { translateX: 0 }, this.animationOptions);
		},50);

		// Set currentItem and active property on image animating in
		this.current = num;
		this.images[num-1].active = true;

	}
}
