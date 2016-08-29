import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class XhrService {
	tasks: { [key: string] : boolean } = {};

	@Output() done = new EventEmitter();
	@Output() started = new EventEmitter();

	startTracking(name: string) {
		this.tasks[name] = true;
		this.started.emit(this.tasks);
	}

	stopTracking(name: string) {
		this.tasks[name] = false;

		if ( !this.isWorking() ) {
			this.done.emit(this.tasks);
		}
	}

	isWorking() {
		for (let key in this.tasks) {
			let task = this.tasks[key];

			if (task === true) {
				return true;
			}
		}

		return false;
	}
}
