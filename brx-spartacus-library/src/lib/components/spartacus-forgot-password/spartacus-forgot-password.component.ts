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
import { ForgotPasswordComponent, ForgotPasswordComponentService } from '@spartacus/user/profile/components';
import { SpartacusForgotPasswordComponentService } from '../../services/spartacus-forgot-password-component.service';
import { SpartacusForgotPassswordDirective } from './spartacus-forgot-password.directive';

@Component({
  selector: 'brx-spartacus-forgot-password',
  templateUrl: './spartacus-forgot-password.component.html',
  styleUrls: ['./spartacus-forgot-password.component.scss'],
})
export class SpartacusForgotPasswordComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusForgotPassswordDirective, { static: true })
  wrappedComponent!: SpartacusForgotPassswordDirective;

  constructor(private fpservice: SpartacusForgotPasswordComponentService) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ForgotPasswordComponentService,
          useValue: this.fpservice,
        },
      ],
    });
    viewContainerRef.createComponent(ForgotPasswordComponent, { index: 0, injector: componentInjector });
  }
}
