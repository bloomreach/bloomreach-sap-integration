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

import { Component, OnInit, ComponentFactoryResolver, ViewChild, Injector, Input } from '@angular/core';
import { ContainerItem, getContainerItemContent, Page } from '@bloomreach/spa-sdk';
import { CmsProductCarouselComponent, ProductService } from '@spartacus/core';
import { CmsComponentData, ProductCarouselComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { SpartacusProductHighlightDirective } from './spartacus-product-highlight.directive';

interface ProductHighlightCompound {
  title: string;
  connectorid: { selectionValues: [{ key: string; label: string }] };
  commerceProductCompound?: [{ productid: string; variantid: string }];
}

@Component({
  selector: 'brx-spartacus-product-highlight',
  templateUrl: './spartacus-product-highlight.component.html',
})
export class SpartacusProductHighlightComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  @ViewChild(SpartacusProductHighlightDirective, { static: true })
  wrappedComponent!: SpartacusProductHighlightDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.renderWrappedBanner();
  }

  renderWrappedBanner(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductCarouselComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const products = getContainerItemContent<ProductHighlightCompound>(this.component, this.page);

    const productCodes = products?.commerceProductCompound?.map(({ productid, variantid }) => {
      const selectedId = variantid?.length ? variantid : productid;
      const [, , code] = selectedId.match(/id=([\w\d._=-]+[\w\d=]?)?;code=([\w\d._=/-]+[\w\d=]?)?/i) ?? [];
      return code;
    });

    const componentProperties: CmsProductCarouselComponent = {
      title: products?.title,
      productCodes: productCodes?.join(' '),
    };

    const componentInjector = Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: { data$: of(componentProperties) },
        },
        {
          provide: ProductService,
          useValue: this.productService,
        },
      ],
    });

    viewContainerRef.createComponent<ProductCarouselComponent>(componentFactory, 0, componentInjector);
  }
}
