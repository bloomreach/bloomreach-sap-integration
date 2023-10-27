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

/*
 * Copied from cms-components/product/product-list/product-facet-navigation/services/index.ts
 * of SAP Spartacus Storefront project.
 */
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ActivatedRouterStateSnapshot, Breadcrumb, PageType, ProductSearchPage, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap } from 'rxjs/operators';
import { FacetList } from '../facet.model';
import { SpartacusProductListComponentService } from '../../../services';

/**
 * Provides access to all the facets and active facets for the Product Listing Page.
 *
 * Inspired by cms-components/product/product-list/product-facet-navigation/services/product-facet.service.ts
 * of SAP Spartacus Storefront project.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class ProductFacetService {
  constructor(
    protected routing: RoutingService,
    protected productListComponentService: SpartacusProductListComponentService,
  ) {}

  protected readonly routeState$ = this.routing.getRouterState().pipe(pluck('state'));

  /**
   * Returns the search results for the current page.
   */
  protected readonly searchResult$: Observable<ProductSearchPage> = this.routeState$.pipe(
    switchMap((state) =>
      this.productListComponentService.model$.pipe(
        filter((page) => this.filterForPage(state, page)),
        map((page) => ({
          ...page,
          breadcrumbs: this.filterBreadcrumbs(page?.breadcrumbs ?? [], state.params),
        })),
      ),
    ),
  );

  /**
   * Observes the facets and active facets for the given page. The facet data
   * is provided in a `FacetList`.
   */
  readonly facetList$: Observable<FacetList> = this.searchResult$.pipe(
    map(
      (result: ProductSearchPage) =>
        ({
          facets: result.facets,
          activeFacets: result.breadcrumbs,
        } as FacetList),
    ),
  );

  /**
   * Filters the current result by verifying if the result is related to the page.
   * This is done to avoid a combination of the next page and the current search results.
   */
  protected filterForPage(state: ActivatedRouterStateSnapshot, page: ProductSearchPage): boolean {
    // console.log('[ProductFacetService.filterForPage.page]: ', page);
    // console.log('[ProductFacetService.filterForPage.state]: ', state);
    if (!page.currentQuery?.query?.value) {
      return false;
    }
    if (state.context.type === PageType.CATEGORY_PAGE) {
      return page.currentQuery.query.value.indexOf(`allCategories:${state.context.id}`) > -1;
    }

    if (state.context.type === PageType.CONTENT_PAGE && state.context.id === 'search') {
      return page.currentQuery.query.value.startsWith(`${state.params.query}:`) || !state.params.query;
    }
    return false;
  }

  /**
   * Filter breadcrumbs which are not actively selected but coming from
   * the route navigation.
   *
   * The breadcrumbs might include the active category page code, which is not actively
   * selected by the user.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected filterBreadcrumbs(breadcrumbs: Breadcrumb[], params: Params): Breadcrumb[] {
    return breadcrumbs ? breadcrumbs.filter((breadcrumb) => breadcrumb.facetCode !== 'allCategories') : [];
  }
}
