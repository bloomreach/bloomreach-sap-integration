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

import { Injectable } from '@angular/core';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  Page,
  PageLinkService,
  ProductPageMetaResolver,
  ProductService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpartacusProductPageMetaResolver extends ProductPageMetaResolver {
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    protected basePageMetaResolver: BasePageMetaResolver,
    protected pageLinkService: PageLinkService,
  ) {
    super(routingService, productService, translation, basePageMetaResolver, pageLinkService);
  }

  /**
   * Modified from /product/services/product-page-meta.resolver.ts
   * of SAP Spartacus Core Library project.
   *
   * Resolves breadcrumbs for the Product Detail Page. The breadcrumbs are driven by
   * a static home page crumb and a crumb for each category.
   *
   * The category URL is modified to use the category code only.
   */
  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([this.product$.pipe(), this.translation.translate('common.home')]).pipe(
      map(([product, label]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label, link: '/' });
        (product?.categories ?? []).forEach(({ name, code }) => {
          const url = `/category/${code}`;
          breadcrumbs.push({
            label: name || code,
            link: url,
          } as BreadcrumbMeta);
        });
        return breadcrumbs;
      }),
    );
  }

  /**
   * Ensure this resolver is always getting picked over the default one.
   */
  getPriority(page: Page): number {
    return this.getScore(page) + 1;
  }
}
