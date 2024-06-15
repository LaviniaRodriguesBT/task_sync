import { Routes } from '@angular/router';
import { SignInComponent } from './views/account/sign-in/sign-in.component';
import { SignUpComponent } from './views/account/sign-up/sign-up.component';
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


export const routes: Routes = [
    {
        path: 'account/sign-in',
        component: SignInComponent,

    },

    {
        path: 'account/sign-up',
        component: SignUpComponent,

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
                ]
            },
            {
                path: '**',
                component: NotFoundComponent,

            }


        ]
    }

];
