import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import {
  async
} from '@angular/core/testing';
import {
  RouterModule,
  Route
} from '@angular/router';

// import {provideFakeRouter} from '../testing/router/router-testing-providers';

import { AppComponent } from './app.component';
import { HomeComponent } from './+home/home.component';

export function main() {

  describe('App component', () => {
    // Disable old forms

    let config: Route[] = [
      { path: '', component: HomeComponent },
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterModule.forRoot(config), FormsModule],
        declarations: [TestComponent, AppComponent, HomeComponent],
        providers:[
        ]
      });
    });

    it('should build without a problem',
      async( () => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>',
  directives: [AppComponent]
})

class TestComponent {
}


