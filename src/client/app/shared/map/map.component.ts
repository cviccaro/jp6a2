import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_ICON_DIRECTIVES} from '@angular2-material/icon';

import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS, LatLngLiteral, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import {MapControlComponent} from './map-control.component';
import {GeolocateService} from './geolocate.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

declare var google: any;
declare var jQuery: any;

@Component({
	selector: 'jp-map',
	moduleId: module.id,
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
	directives: [
		// GOOGLE_MAPS_DIRECTIVES,
		// MapControlComponent,
		// MD_BUTTON_DIRECTIVES,
		// MD_INPUT_DIRECTIVES,
		// MD_TOOLBAR_DIRECTIVES,
		// MD_ICON_DIRECTIVES
	],
	//providers: [GOOGLE_MAPS_PROVIDERS, GoogleMapsAPIWrapper, GeolocateService]
})
export class MapComponent {
	address = '108 Commerce Blvd, Lawrence, PA 15055';
	addressFormatted = 'JP Enterprises<br />108 Commerce Blvd.<br />Lawrence, PA 15055';
	directionsDisplay: any;
	directionsOrigin = new FormControl();
	directionsMarkerStart: any;
	directionsResult: any;
	directionsService: any;
	directionsShowing = false;
	infoWindowOpen = false;
	latitude = 40.3115483;
	longitude = -80.1245562;
	map: any = null;
	mapShowing = false;
	markerArray: any[] = [];
	title = 'JP Enterprises';
	zoom = 15;

	constructor(private _wrapper: GoogleMapsAPIWrapper, private _geolocate: GeolocateService) {
		this.directionsOrigin.valueChanges
			.debounceTime(500)
			.distinctUntilChanged()
			.subscribe((term) => this.getDirections(term));
	}

	clearMarkers() {
		this.markerArray.forEach(marker => marker.setMap(null));
		this.markerArray = [];
	}

	closeMap() {
		this.mapShowing = false;
		jQuery('#directions').removeClass('expanded');
		jQuery('#map').removeClass('fadeIn').addClass('fadeOut');
	}

	getDirections(latlng: any) {
		this.directionsService.route({
			origin: latlng,
			destination: this.address,
			travelMode: google.maps.TravelMode.DRIVING
		}, (result: any, status: any) => {
			if (status === google.maps.DirectionsStatus.OK) {
				this.directionsMarkerStart = new google.maps.Marker({
					map: this.map,
					position: <LatLngLiteral>result.routes[0].legs[0].start_location,
					zIndex: 10
				});
				this.directionsResult = result;
				this.directionsDisplay.setDirections(result);
				this.directionsShowing = true;
				window.dispatchEvent(new Event('resize'));
				this.showDirectionsSteps(result);
			}
		});
	}

	locateMe() {
		this._geolocate.locate()
			.subscribe((position) => {
				let latlng = <LatLngLiteral>{ lat: position.coords.latitude, lng: position.coords.longitude };
				this.getDirections(latlng);
			});
	}

	openMap() {
		jQuery('#directions').addClass('expanded');
		jQuery('#map').removeClass('fadeOut').addClass('fadeIn');
		this.mapShowing = true;
		setTimeout(() => this.setupMap.call(this), 500);
	}

	mapLoaded(m: any) {
		this.map = m;
		this.directionsService = new google.maps.DirectionsService();
		this.directionsDisplay = new google.maps.DirectionsRenderer();
		this.directionsDisplay.setMap(this.map);
		this.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
	}

	openDirectionsExternally() {
	  let saddr = 'My Location';
	  if (this.directionsOrigin && this.directionsOrigin.value) {
		  saddr = this.directionsOrigin.value;
	  }

	  window.open('https://www.google.com/maps?saddr=' + saddr + '&daddr=' + this.address);
	}

	setupMap() {
		window.dispatchEvent(new Event('resize'));
		let latlng = <LatLngLiteral>{ lat: this.latitude, lng: this.longitude };
		this.map.setCenter(latlng);
		this.map.setZoom(this.zoom);
		setTimeout(() => this.infoWindowOpen = true, 100);
	}

	showDirectionsSteps(result: any) {
		this.clearMarkers();
		let stepDisplay = new google.maps.InfoWindow();
		let myRoute = result.routes[0].legs[0];
		for (var i = 0; i < myRoute.steps.length; i++) {
			let marker = this.markerArray[i] = this.markerArray[i] || new google.maps.Marker();
			marker.setMap(this.map);
			marker.setLabel((i+1).toString());
			marker.setPosition(myRoute.steps[i].start_location);
			if (i === 0) {
				marker.setZIndex(1);
			}
		  	let text = myRoute.steps[i].instructions;
		  	google.maps.event.addListener(marker, 'click', () => {
		  	  stepDisplay.setContent(text);
		  	  stepDisplay.open(this.map, marker);
		  	});
		}
	}
}
