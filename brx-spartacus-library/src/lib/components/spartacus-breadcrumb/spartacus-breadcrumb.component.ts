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
import { CmsBreadcrumbsComponent } from '@spartacus/core';
import { BreadcrumbComponent, CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { SpartacusBreadcrumbDirective } from './spartacus-breadcrumb.directive';

@Component({
  selector: 'brx-spartacus-breadcrumb',
  templateUrl: './spartacus-breadcrumb.component.html',
})
export class SpartacusBreadcrumbComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusBreadcrumbDirective, { static: true })
  wrappedComponent!: SpartacusBreadcrumbDirective;

  ngOnInit(): void {
    this.renderWrappedBreadcrumb();
  }

  renderWrappedBreadcrumb(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();
    const componentProperties: CmsBreadcrumbsComponent = {};
    const componentInjector = Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: {
            data$: of(componentProperties),
          },
        },
      ],
    });

    viewContainerRef.createComponent(BreadcrumbComponent, { index: 0, injector: componentInjector });
  }
}
