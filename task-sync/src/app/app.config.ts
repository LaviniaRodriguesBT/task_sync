import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from "@angular/platform-browser/animations";
import { authInterceptor } from './interceptor/authToken.interceptor';
export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([authInterceptor])
		),
		provideToastr(),
		provideAnimations()
	]
};
