/*
 * Copyright 2020-2021 Hippo B.V. (http://www.onehippo.com)
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

import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { AuthService } from '@spartacus/core';
import { LoginComponent } from '@spartacus/user/account/components';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { SpartacusLoginDirective } from './spartacus-login.directive';

@Component({
  selector: 'brx-spartacus-login',
  templateUrl: './spartacus-login.component.html',
})
export class SpartacusLoginComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusLoginDirective, { static: true })
  wrappedComponent!: SpartacusLoginDirective;

  constructor(
    private auth: AuthService,
    private userAccount: UserAccountFacade,
  ) { }

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: AuthService,
          useValue: this.auth,
        },
        {
          provide: UserAccountFacade,
          useValue: this.userAccount,
        },
      ],
    });

    viewContainerRef.createComponent(LoginComponent, { index: 0, injector: componentInjector });
  }
}
