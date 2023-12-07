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

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrxSpartacusLibModule } from '@bloomreach/brx-spartacus-library';
import { I18nModule } from '@spartacus/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrxModule } from './brx/brx.module';
import { SpartacusModule } from './spartacus/spartacus.module';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { EnvConfigService } from './services/env-config.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, NewsPageComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    I18nModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    BrowserTransferStateModule,
    BrxModule,
    BrxSpartacusLibModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private envConfigService: EnvConfigService) {
    // Initilize Environemnt variables
    this.envConfigService.initilizeConfigFromNetlify();
  }
}
