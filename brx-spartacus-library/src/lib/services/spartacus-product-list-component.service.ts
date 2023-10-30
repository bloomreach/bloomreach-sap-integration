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

import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService, LanguageService, RoutingService } from '@spartacus/core';
import { ProductListComponentService, ProductListRouteParams, SearchCriteria, ViewConfig } from '@spartacus/storefront';
import { SpartacusProductSearchService } from './spartacus-product-search.service';

export const PRODUCT_LIST_COMPONENT_PARAMS = new InjectionToken<ProductListRouteParams>(
  'brX SpartacusProductListComponent Parameters',
);

@Injectable({
  providedIn: 'root',
})
export class SpartacusProductListComponentService extends ProductListComponentService {
  constructor(
    protected productSearchService: SpartacusProductSearchService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected router: Router,
    protected config: ViewConfig,
    @Inject(PRODUCT_LIST_COMPONENT_PARAMS) @Optional() protected componentParams?: ProductListRouteParams,
  ) {
    super(productSearchService, routing, activatedRoute, currencyService, languageService, router, config);
    // console.log('[SpartacusProductListComponentService]: ViewConfig: ', config);
    // console.log('[SpartacusProductListComponentService]: ProductListRouteParams: ', componentParams);
  }

  /**
   * Expose the `SearchCriteria`. The search criteria are driven by the route parameters.
   *
   * This search route configuration is not yet configurable
   * (see https://github.com/SAP/spartacus/issues/7191).
   */
  protected getCriteriaFromRoute(routeParams: ProductListRouteParams, queryParams: SearchCriteria): SearchCriteria {
    return {
      query:
        queryParams.query ||
        this.getQueryFromComponentParams(this.componentParams ?? {}) ||
        this.getQueryFromRouteParams(routeParams),
      pageSize: queryParams.pageSize || this.config.view?.defaultPageSize,
      currentPage: queryParams.currentPage,
      sortCode: queryParams.sortCode,
    };
  }

  /**
   * Resolves the search query from the given component parameters.
   */
  protected getQueryFromComponentParams({ query, categoryCode }: ProductListRouteParams): string | undefined {
    if (query) {
      return query;
    }

    if (categoryCode) {
      return this.RELEVANCE_ALLCATEGORIES + categoryCode;
    }

    return undefined;
  }
}
