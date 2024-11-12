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
import { UntypedFormBuilder } from '@angular/forms';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthConfigService,
  GlobalMessageService,
  RoutingService,
} from '@spartacus/core';
import { RegisterComponent, RegisterComponentService } from '@spartacus/user/profile/components';
import { SpartacusRegisterDirective } from './spartacus-register.directive';
import { SpartacusRegisterComponentService } from '../../services/spartacus-register-component.service';

@Component({
  selector: 'brx-spartacus-register',
  templateUrl: './spartacus-register.component.html',
})
export class SpartacusRegisterComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusRegisterDirective, { static: true })
  wrappedComponent!: SpartacusRegisterDirective;

  constructor(
    private registerComponentService: SpartacusRegisterComponentService,
    protected globalMessageService: GlobalMessageService,
    protected fb: UntypedFormBuilder,
    protected router: RoutingService,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected anonymousConsentsConfig: AnonymousConsentsConfig,
    protected authConfigService: AuthConfigService,
  ) {}

  ngOnInit(): void {
    this.renderWrappedRegister();
    this.anonymousConsentsService.loadTemplates();
  }

  renderWrappedRegister(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: GlobalMessageService,
          useValue: this.globalMessageService,
        },
        {
          provide: UntypedFormBuilder,
          useValue: this.fb,
        },
        {
          provide: RoutingService,
          useValue: this.router,
        },
        {
          provide: AnonymousConsentsService,
          useValue: this.anonymousConsentsService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: this.anonymousConsentsConfig,
        },
        {
          provide: AuthConfigService,
          useValue: this.authConfigService,
        },
        {
          provide: RegisterComponentService,
          useValue: this.registerComponentService,
        },
      ],
    });
    viewContainerRef.createComponent(RegisterComponent, { index: 0, injector: componentInjector });
  }
}
