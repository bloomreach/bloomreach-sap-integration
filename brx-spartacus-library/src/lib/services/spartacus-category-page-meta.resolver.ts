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
  Breadcrumb,
  BreadcrumbMeta,
  CategoryPageMetaResolver,
  CmsService,
  Page,
  ProductSearchPage,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { SpartacusProductSearchService } from '.';

@Injectable({
  providedIn: 'root',
})
export class SpartacusCategoryPageMetaResolver extends CategoryPageMetaResolver {
  constructor(
    protected productSearchService: SpartacusProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService,
    protected basePageMetaResolver: BasePageMetaResolver,
  ) {
    super(productSearchService, cms, translation, basePageMetaResolver);
  }

  resolveTitle(): Observable<string> {
    return (<Observable<ProductSearchPage>>this.searchPage$).pipe(
      filter((page: ProductSearchPage) => !!page.pagination),
      switchMap((p: ProductSearchPage) =>
        this.translation.translate('pageMetaResolver.category.title', {
          count: p.pagination?.totalResults,
          query: p.breadcrumbs?.reduce<Breadcrumb | undefined>(
            (prev, curr) => (curr.facetCode === 'category' || curr.facetCode === 'allCategories' ? curr : prev),
            undefined,
          )?.facetValueName,
        }),
      ),
    );
  }

  /**
   * Modified from /product/services/category-page-meta.resolver.ts
   * of SAP Spartacus Core Library project.
   *
   * Resolves breadcrumbs for the Category Page. The breadcrumbs are driven by
   * a static home page crumb and a crumb for each category.
   */
  protected resolveBreadcrumbData(page: ProductSearchPage, label: string): BreadcrumbMeta[] {
    const breadcrumbs: BreadcrumbMeta[] = [];
    breadcrumbs.push({ label, link: '/' });

    (page.breadcrumbs ?? []).forEach((br) => {
      if (br.facetValueName) {
        if (br.facetCode === 'category' || br.facetCode === 'allCategories') {
          breadcrumbs.push({
            label: br.facetValueName,
            link: `/category/${br.facetValueCode}`,
          });
        }
      }
    });
    return breadcrumbs;
  }

  /**
   * Ensure this resolver is always getting picked over the default one.
   */
  getPriority(page: Page): number {
    return this.getScore(page) + 1;
  }
}
