import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'jp-social-share',
	templateUrl: './social-share.component.html',
	styleUrls: [ './social-share.component.css' ]
})
export class SocialShareComponent implements OnInit {
	fbUrl: SafeResourceUrl;

	@Input() url: string;

	constructor(public sanitizer: DomSanitizationService) {	}

	ngOnInit() {
		this.fbUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
			'https://www.facebook.com/plugins/share_button.php?href=' +
			this.url +
			'&layout=button_count&mobile_iframe=false&width=88&height=20&appId'
		);
	}
}
