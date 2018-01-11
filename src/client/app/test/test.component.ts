import { Component, AfterViewInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'jp-test',
	templateUrl: './test.component.html',
	styleUrls: [ './test.component.css' ]
})
export class TestComponent implements AfterViewInit {
	ngAfterViewInit() {
		const int = setInterval(() => {
		  const bootstrapping = document.getElementById('bootstrapping');
		  const style = window.getComputedStyle(bootstrapping);
		  if (+style.opacity === 0) {
		    bootstrapping.parentNode.removeChild(bootstrapping);
		    clearInterval(int);
		  }
		}, 1000);
	}
}
