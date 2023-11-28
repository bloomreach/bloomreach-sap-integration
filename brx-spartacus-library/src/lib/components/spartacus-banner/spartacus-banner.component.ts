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
import { ContainerItem, Document, getContainerItemContent, ImageSet, Page } from '@bloomreach/spa-sdk';
import { CmsBannerComponent } from '@spartacus/core';
import { BannerComponent, CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { BannerCompound } from '../../models/common-types.model';
import { SpartacusBannerDirective } from './spartacus-banner.directive';

@Component({
  selector: 'brx-spartacus-banner',
  templateUrl: './spartacus-banner.component.html',
})
export class SpartacusBannerComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  @ViewChild(SpartacusBannerDirective, { static: true })
  wrappedComponent!: SpartacusBannerDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderWrappedBanner();
  }

  async renderWrappedBanner(): Promise<void> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BannerComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const banner = getContainerItemContent<BannerCompound>(this.component, this.page);
    const image = banner?.image && this.page.getContent<ImageSet>(banner.image);
    const link = banner?.link && this.page.getContent<Document>(banner.link);
    const content = await this.page.rewriteLinks(banner?.content?.value ?? '');

    const componentProperties: CmsBannerComponent = {
      headline: banner?.title,
      content,
      media: {
        url: image?.getOriginal()?.getUrl(),
      },
      urlLink: link?.getUrl(),
      styleClasses: banner?.styleClasses,
    };

    const componentInjector = Injector.create({
      providers: [{ provide: CmsComponentData, useValue: { data$: of(componentProperties) } }],
    });

    viewContainerRef.createComponent<BannerComponent>(componentFactory, 0, componentInjector);
  }
}
