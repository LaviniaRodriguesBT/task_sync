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
import { SchedulingCardComponent } from './views/app/event/scheduling/scheduling-card/scheduling-card.component';

export const routes: Routes = [
  {
    path: 'account/sign-in',
    component: SignInComponent,
    title: 'Task Sync - Login',
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Task Sync - Página Inicial',
      },
      {
        path: 'help',
        component: HelpComponent,
        title: 'Task Sync - Ajuda',
      },
      {
        path: 'account/my-profile',
        component: MyProfileComponent,
        title: 'Task Sync - Meu perfil',
      },
      {
        path: 'event',
        children: [
          {
            path: 'create',
            component: EventCreateComponent,
            title: 'Task Sync - Criar evento',
          },
          {
            path: 'list',
            component: EventListComponent,
            title: 'Task Sync - Listar eventos',
          },
          {
            path: 'edit/:id',
            component: EventEditComponent,
            title: 'Task Sync - Edita evento',
          },
          {
            path: 'detail/:id',
            component: EventDetailComponent,
            title: 'Task Sync - Detalhes do evento',
          },
          {
            path: 'scheduling',
            title: 'Task Sync - Cronograma',
            children: [
              {
                path: 'create',
                component: SchedulingCreateComponent,
                title: 'Task Sync - Criar cronograma',
              },
              {
                path: 'list',
                component: SchedulingListComponent,
                title: 'Task Sync - Listar cronograma',
              },
              {
                path: 'edit/:id',
                component: SchedulingEditComponent,
                title: 'Task Sync - Editar cronograma',
              },
              {
                path: 'detail/:id',
                component: SchedulingDetailComponent,
                title: 'Task Sync - Detalhes do cronograma',
              },
              {
                path: 'card',
                component: SchedulingCardComponent,
                title: 'Task Sync - Conjunto de eventos',
              }
            ],
          },
        ],
      },
      {
        path: 'task',
        title: 'Task Sync - Atividades',
        children: [
          {
            path: 'create',
            component: TaskCreateComponent,
            title: 'Task Sync - Criar atividade',

          },
          {
            path: 'list',
            component: TaskListComponent,
            title: 'Task Sync - Lista de atividades',
          },
          {
            path: 'edit/:id',
            component: TaskEditComponent,
            title: 'Task Sync - Editar atividades',
          },
          {
            path: 'detail/:id',
            component: TaskDetailComponent,
            title: 'Task Sync - Destalhes da atividade',
          },
        ],
      },
      {
        path: 'user',
        title: 'Task Sync - Usuarios',
        children: [
          {
            path: 'create',
            component: UserCreateComponent,
            title: 'Task Sync - Criar novo usuario',
          },
          {
            path: 'list',
            component: UserListComponent,
            title: 'Task Sync - Listar usuarios',
          },
          {
            path: 'edit/:id',
            component: UserEditComponent,
            title: 'Task Sync - Editar usuario',
          },
          {
            path: 'detail/:id',
            component: UserDetailComponent,
            title: 'Task Sync - Detalhes do usuario',
          },
        ],
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: 'Task Sync - Pagina nao encontrada',
      },
    ],
  },
];
