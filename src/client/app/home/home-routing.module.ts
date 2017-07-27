import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeGuard } from './home.guard';
import { ConfigGuard } from '../shared/core/config/config.guard';
import { BlogComponent } from '../shared/blog/blog.component';
import { BlogGuard } from '../shared/blog/blog.guard';
import { BlogsComponent } from '../shared/blog/blogs.component';
import { BlogsGuard } from '../shared/blog/blogs.guard';
import { PrivacyComponent } from '../shared/privacy/privacy.component';
import { ProjectComponent } from '../shared/project/project.component';
import { ProjectGuard } from '../shared/project/project.guard';
import { ScrollToComponent } from '../shared/core/components/scroll/scroll-to.component';
import { SubscribeComponent } from '../shared/core/forms/subscribe/subscribe.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      canActivate: [ConfigGuard, HomeGuard],
      component: HomeComponent,
      children: [
        { path: 'blogs', component: BlogsComponent, data: { returnTo: '/home' }, canActivate: [BlogsGuard] },
        { path: 'blogs/:slug', component: BlogComponent, data: { returnTo: '/home' }, canActivate: [BlogGuard] },
        { path: 'work/:slug', component: ProjectComponent, data: { returnTo: '/home' }, canActivate: [ProjectGuard] },
        { path: 'privacy', component: PrivacyComponent, data: { returnTo: '/home', title: 'Privacy Policy' } },
        { path: 'subscribe', component: SubscribeComponent, data: { returnTo: '/home', title: 'Subscribe' } },
        { path: ':selector', component: ScrollToComponent },
        { path: '', component: ScrollToComponent }
      ],
      data: { title: 'Home' }
    }])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

