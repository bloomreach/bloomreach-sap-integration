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
import {
  CmsComponentData,
  PageLayoutService,
  ProductListComponent,
  ProductListComponentService,
  ProductListRouteParams,
  ViewConfig,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { PRODUCT_LIST_COMPONENT_PARAMS, SpartacusProductListComponentService } from '../../services';
import { SelectionType } from '../../models/common-types.model';
import { SpartacusProductListDirective } from './spartacus-product-list.directive';

interface ProductListParams {
  pagesize: number;
  infinitescrollActive: boolean;
  infinitescrollLimit?: number;
  infinitescrollMore?: boolean;
}

interface ProductGridCompound {
  searchtype: SelectionType;
  query?: string;
  category?: { categoryid: string };
}

@Component({
  selector: 'brx-spartacus-product-list',
  templateUrl: './spartacus-product-list.component.html',
})
export class SpartacusProductListComponent implements OnInit {
  @Input() component!: ContainerItem;

  @Input() page!: Page;

  @ViewChild(SpartacusProductListDirective, { static: true })
  wrappedComponent!: SpartacusProductListDirective;

  constructor(private pageLayoutService: PageLayoutService, private injector: Injector) {}

  ngOnInit(): void {
    this.renderWrappedProductList();
  }

  renderWrappedProductList(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const { pagesize, infinitescrollActive, infinitescrollLimit, infinitescrollMore } =
      this.component.getParameters<ProductListParams>();

    const { searchtype, query, category } =
      getContainerItemContent<ProductGridCompound>(this.component, this.page) ?? {};

    const searchType = searchtype?.selectionValues[0].key;
    const componentParams: ProductListRouteParams =
      searchType === 'category' ? { categoryCode: category?.categoryid } : { query };

    const scrollConfig: ViewConfig = {
      view: {
        defaultPageSize: pagesize,
        infiniteScroll: {
          active: infinitescrollActive,
          productLimit: infinitescrollLimit,
          showMoreButton: infinitescrollMore,
        },
      },
    };

    const componentProperties = {
      composition: {
        inner: ['ProductAddToCartComponent'],
      },
    };

    const componentInjector = Injector.create({
      providers: [
        { provide: PageLayoutService, useValue: this.pageLayoutService },
        { provide: ViewConfig, useValue: scrollConfig },
        { provide: PRODUCT_LIST_COMPONENT_PARAMS, useValue: componentParams },
        { provide: ProductListComponentService, useClass: SpartacusProductListComponentService },
        { provide: CmsComponentData, useValue: { data$: of(componentProperties) } },
      ],
      parent: this.injector,
    });

    viewContainerRef.createComponent(ProductListComponent, { index: 0, injector: componentInjector });
  }
}
