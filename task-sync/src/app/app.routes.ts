import { Routes } from '@angular/router';
import { SignInComponent } from './views/account/sign-in/sign-in.component';
import { MainComponent } from './views/app/main/main.component';
import { authenticationGuard } from './services/security/guard/authentication.guard';
import { HomeComponent } from './views/app/home/home.component';
import { HelpComponent } from './views/app/help/help.component';
import { MyProfileComponent } from './views/account/my-profile/my-profile.component';
import { EventCreateComponent } from './views/app/event/event-create/event-create.component';
import { EventListComponent } from './views/app/event/event-list/event-list.component';
import { EventEditComponent } from './views/app/event/event-edit/event-edit.component';
import { EventDetailComponent } from './views/app/event/event-detail/event-detail.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TaskCreateComponent } from './views/app/task/task-create/task-create.component';
import { TaskListComponent } from './views/app/task/task-list/task-list.component';
import { TaskDetailComponent } from './views/app/task/task-detail/task-detail.component';
import { TaskEditComponent } from './views/app/task/task-edit/task-edit.component';
import { UserCreateComponent } from './views/app/user/user-create/user-create.component';
import { UserDetailComponent } from './views/app/user/user-detail/user-detail.component';
import { UserEditComponent } from './views/app/user/user-edit/user-edit.component';
import { UserListComponent } from './views/app/user/user-list/user-list.component';
import { SchedulingCreateComponent } from './views/app/event/scheduling/scheduling-create/scheduling-create.component';
import { SchedulingDetailComponent } from './views/app/event/scheduling/scheduling-detail/scheduling-detail.component';
import { SchedulingEditComponent } from './views/app/event/scheduling/scheduling-edit/scheduling-edit.component';
import { SchedulingListComponent } from './views/app/event/scheduling/scheduling-list/scheduling-list.component';

export const routes: Routes = [
  {
    path: 'account/sign-in',
    component: SignInComponent,
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
      {
        path: 'account/my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'event',
        children: [
          {
            path: 'create',
            component: EventCreateComponent,
          },
          {
            path: 'list',
            component: EventListComponent,
          },
          {
            path: 'edit/:id',
            component: EventEditComponent,
          },
          {
            path: 'detail/:id',
            component: EventDetailComponent,
          },
          {
            path: 'scheduling',
            children: [
              {
                path: 'create',
                component: SchedulingCreateComponent,
              },
              {
                path: 'list',
                component: SchedulingListComponent,
              },
              {
                path: 'edit/:id',
                component: SchedulingEditComponent,
              },
              {
                path: 'detail/:id',
                component: SchedulingDetailComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'task',
        children: [
          {
            path: 'create',
            component: TaskCreateComponent,
          },
          {
            path: 'list',
            component: TaskListComponent,
          },
          {
            path: 'edit/:id',
            component: TaskEditComponent,
          },
          {
            path: 'detail/:id',
            component: TaskDetailComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'create',
            component: UserCreateComponent,
          },
          {
            path: 'list',
            component: UserListComponent,
          },
          {
            path: 'edit/:id',
            component: UserEditComponent,
          },
          {
            path: 'detail/:id',
            component: UserDetailComponent,
          },
        ],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
