/*
 * Copyright 2022-2023 BloomReach (https://www.bloomreach.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { APP_CONFIG, LibConfig } from './app.config';

function bootstrapApp(config: LibConfig): void {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

document.addEventListener('DOMContentLoaded', () => {
  // Get the ENV variables from netlify
  if (environment.netlifyEnvUrl) {
    fetch(environment.netlifyEnvUrl)
      .then((res) => res.json())
      .then((config) => {
        bootstrapApp(config);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const config = {} as LibConfig;
    bootstrapApp(config);
  }
});
