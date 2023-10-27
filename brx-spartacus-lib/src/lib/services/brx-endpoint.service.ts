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

import { Inject, Injectable } from '@angular/core';
import { PaginationModel } from '@spartacus/core';
import { BrxSearchConfig } from '../models/brx-search-config.model';
import { configType } from '../models/brx-config-type.model';
import { getCookie } from '../utils/get-cookie';

@Injectable({
  providedIn: 'root',
})
export class BrxEndpointService {
  
  // Get Values Form Env
  envConfig!: configType;

  // Default parameters
  DEFAULT_PARAMS = {
    request_type: 'search',
    fl: [
      'pid',
      'title',
      'brand',
      'price',
      'sale_price',
      'promotions',
      'thumb_image',
      'sku_thumb_images',
      'sku_swatch_images',
      'sku_color_group',
      'url',
      'price_range',
      'sale_price_range',
      'description',
      'is_live',
      'score',
    ].join(','),
    realm: 'prod',
    facet: 'true',
  };

  rows = 12; // default page size as per Spartacus

  sort = '';

  currentPage = 0;

  // Still to configure
  viewId = '';

  catalogViews = '';

  constructor() {}

  buildSearchUrl(query = '', searchConfig: BrxSearchConfig = {}, facets?: string[]): string {
    // console.log('[BrxEndpointService.buildSearchUrl.query]: ', query);
    // console.log('[BrxEndpointService.buildSearchUrl.searchConfig]: ', searchConfig);
    // console.log('[BrxEndpointService.buildSearchUrl.facets]: ', facets);
    const { currentPage, sort, type } = searchConfig;
    const { accountId, domainKey, authKey, smEndPoint } = this.envConfig;
    this.sort = sort || '';
    if (this.sort === 'relevance') {
      this.sort = '';
    }
    const brUid = getCookie(document.cookie, '_br_uid_2'); // Need to grab from Cookie _br_uid_2
    const refUrl = document.referrer ?? '';
    this.currentPage = currentPage ? +currentPage : 0;
    this.rows = searchConfig.pageSize || 12;
    const start = this.currentPage * this.rows;
    let searchType = 'keyword';
    if (type === 'category') {
      searchType = 'category';
    }

    const params = new URLSearchParams({
      account_id: accountId,
      domain_key: domainKey,
      auth_key: authKey,
      view_id: '',
      request_id: Date.now().toString(),
      _br_uid_2: brUid,
      url: window.location.href,
      ref_url: refUrl,
      ...this.DEFAULT_PARAMS,
      search_type: searchType,
      rows: this.rows.toString(),
      start: start.toString(),
      q: query,
      sort: this.sort,
    });

    if (facets?.length) {
      const facetFieldsFilters = new Map<string, string[]>();
      for (let i = 0; i < facets.length; i += 2) {
        const id = facets[i];
        const value = facets[i + 1];
        if (!facetFieldsFilters.has(id)) {
          facetFieldsFilters.set(id, []);
        }
        facetFieldsFilters.get(id)?.push(value);
      }
      this.appendFacetFilterParams(params, 'fq', facetFieldsFilters);
    }

    return `${smEndPoint}v1/core/?${params.toString()}`;
  }

  getPaginationDetails(total: number): PaginationModel {
    return {
      currentPage: this.currentPage,
      pageSize: this.rows,
      sort: this.sort,
      totalPages: Math.ceil(total / this.rows),
      totalResults: total,
    };
  }

  buildSuggestionUrl(term = ''): string {
    const { accountId, domainKey, authKey, smSuggestionEndPoint } = this.envConfig;
    const brUid = getCookie(document.cookie, '_br_uid_2');
    const refUrl = document.referrer ?? '';
    const params = new URLSearchParams({
      account_id: accountId,
      auth_key: authKey,
      request_id: new Date().getTime().toString(),
      _br_uid_2: brUid,
      url: window.location.href,
      ref_url: refUrl,
      request_type: 'suggest',
      rsp_fmt: 'v2',
      q: term,
    });

    if (this.catalogViews) {
      params.append('catalog_views', this.catalogViews);
      params.append('rsp_fmt', 'v2');
      return `${smSuggestionEndPoint}v2/suggest/?${params}`;
    }

    params.append('domain_key', domainKey);
    return `${smSuggestionEndPoint}v1/suggest/?${params}`;
  }

  buildPathwaysandRecommendationsUrl(
    isPreview: boolean,
    queryParam = '',
    searchConfig: BrxSearchConfig = {},
    widgetType: string,
    widgetId: string,
    categoryId = '',
    pids: string,
  ): string {
    const { accountId, domainKey, smEndPoint } = this.envConfig;
    const DUMMY_BR_UID_2_FOR_PREVIEW = 'uid%3D0000000000000%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55';
    const brUid2 = getCookie(document.cookie, '_br_uid_2') || (isPreview ? DUMMY_BR_UID_2_FOR_PREVIEW : undefined);
    const refUrl = document.referrer ?? '';
    const size = searchConfig.pageSize || 12;
    const params = new URLSearchParams({
      account_id: accountId,
      view_id: '',
      domain_key: domainKey,
      request_id: new Date().getTime().toString(),
      _br_uid_2: brUid2 ?? '',
      item_ids: pids,
      cat_id: categoryId,
      query: queryParam ?? '',
      url: window.location.href,
      ref_url: refUrl,
      rows: size.toString(),
      fields: [
        'pid',
        'title',
        'brand',
        'price',
        'sale_price',
        'promotions',
        'thumb_image',
        'sku_thumb_images',
        'sku_swatch_images',
        'sku_color_group',
        'url',
        'price_range',
        'sale_price_range',
        'description',
        'is_live',
        'score',
      ].join(','),
    });

    // switch (widgetType) {
    //   case 'item':
    //     params.append('item_ids', pids);
    //     break;
    //   case 'category':
    //     params.append('cat_id', categoryId);
    //     break;
    //   case 'keyword':
    //   case 'personalized':
    //     params.append('query', query);
    //     break;
    //   default:
    //     params.append('query', '');
    // }
    return `${smEndPoint}v2/widgets/${widgetType}/${widgetId}?${params}`;
  }

  private appendFacetFilterParams(
    params: URLSearchParams,
    filterParamName: string,
    facetFieldsFilters: Map<string, string[]>,
  ): void {
    // console.log('[BrxEndpointService.appendFacetFilterParams]: facetFieldsFilters=', facetFieldsFilters);
    facetFieldsFilters.forEach((values, id) => {
      if (values.length > 0) {
        const filterValues = values
          .map((value) => {
            const escaped = value.replace(/"/g, '\\"');
            return `"${escaped}"`;
          })
          .join(' OR ');
        params.append(filterParamName, `${id}:${filterValues}`);
      }
    });
  }
}
