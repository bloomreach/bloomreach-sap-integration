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
import { LoginFormComponent, LoginFormComponentService } from '@spartacus/user/account/components';
import { SpartacusLoginFormComponentService } from '../../services/spartacus-login-form-component.service';
import { SpartacusLoginFormDirective } from './spartacus-login-form.directive';

@Component({
  selector: 'brx-spartacus-login-form',
  templateUrl: './spartacus-login-form.component.html',
})
export class SpartacusLoginFormComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusLoginFormDirective, { static: true })
  wrappedComponent!: SpartacusLoginFormDirective;

  constructor(private readonly loginFormComponentService: SpartacusLoginFormComponentService) {}

  ngOnInit(): void {
    this.renderWrappedLoginForm();
  }

  renderWrappedLoginForm(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: LoginFormComponentService,
          useValue: this.loginFormComponentService,
        },
      ],
    });

    viewContainerRef.createComponent(LoginFormComponent, { index: 0, injector: componentInjector });
  }
}
