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

import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ContainerItem, getContainerItemContent, Page } from '@bloomreach/spa-sdk';
import { CmsService, CMSTabParagraphContainer } from '@spartacus/core';
import { CmsComponentData, TabParagraphContainerComponent } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionType, DocumentContent } from '../../models/common-types.model';
import { BrxDeliveryTabService } from '../../services/brx-delivery-tab.service';
import { SpartacusTabParagraphContainerDirective } from './spartacus-tab-paragraph-container.directive';

interface SpartacusProductDetailTabsCompound {
  tabs: SelectionType;
  shipping?: DocumentContent;
}

@Component({
  selector: 'brx-spartacus-product-details',
  templateUrl: './spartacus-product-details.component.html',
})
export class SpartacusProductDetailsComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  @ViewChild(SpartacusTabParagraphContainerDirective, { static: true })
  wrappedTabParagraphContainer!: SpartacusTabParagraphContainerDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private deliveryTabService: BrxDeliveryTabService,
    private cmsService: CmsService,
  ) {}

  summaryComponents$: Observable<any[]> = this.cmsService.getContentSlot('Summary').pipe(
    map((slot) => {
      const components = slot?.components ?? [];
      // console.log('[SpartacusProductDetailsComponent: components]: ', components);
      return components;
    }),
  );

  ngOnInit(): void {
    this.renderWrappedTabParagraphContainer();
  }

  renderWrappedTabParagraphContainer(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabParagraphContainerComponent);
    const { viewContainerRef } = this.wrappedTabParagraphContainer;
    viewContainerRef.clear();

    const { tabs, shipping } =
      getContainerItemContent<SpartacusProductDetailTabsCompound>(this.component, this.page) ?? {};
    const componentProperties: CMSTabParagraphContainer = {
      components: tabs?.selectionValues
        .map(({ key }) => {
          return key;
        })
        .join(' '),
      uid: 'TabPanelContainer',
    };

    if (shipping?.value) {
      this.deliveryTabService.setContent(this.page.rewriteLinks(shipping.value));
    }

    const componentInjector = Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: { data$: of(componentProperties) },
        },
      ],
    });

    viewContainerRef.createComponent<TabParagraphContainerComponent>(componentFactory, 0, componentInjector);
  }
}
