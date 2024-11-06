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
import { ContainerItem, getContainerItemContent, Page } from '@bloomreach/spa-sdk';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData, ParagraphComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ParagraphCompound } from '../../models/common-types.model';
import { SpartacusParagraphDirective } from './spartacus-paragraph.directive';

@Component({
  selector: 'brx-spartacus-paragraph',
  templateUrl: './spartacus-paragraph.component.html',
})
export class SpartacusParagraphComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  @ViewChild(SpartacusParagraphDirective, { static: true })
  wrappedComponent!: SpartacusParagraphDirective;

  ngOnInit(): void {
    this.renderWrappedBanner();
  }

  renderWrappedBanner(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const paragraph = getContainerItemContent<ParagraphCompound>(this.component, this.page) ?? {};
    const componentProperties: CmsParagraphComponent = {
      title: paragraph?.title,
      content: paragraph?.text?.value ?? '',
    };

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

    viewContainerRef.createComponent(ParagraphComponent, { index: 0, injector: componentInjector });
  }
}
