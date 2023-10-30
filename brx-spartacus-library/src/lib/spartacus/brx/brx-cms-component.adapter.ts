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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CmsComponent,
  CMS_COMPONENT_NORMALIZER,
  ConverterService,
  OccCmsComponentAdapter,
  OccEndpointsService,
  PageContext,
  PageType,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrxDeliveryTabService } from '../../services/brx-delivery-tab.service';

@Injectable({
  providedIn: 'root',
})
export class BrxCmsComponentAdapter extends OccCmsComponentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
    protected deliveryTabService: BrxDeliveryTabService,
  ) {
    super(http, occEndpoints, converter);
  }

  findComponentsByIds(ids: string[], pageContext: PageContext): Observable<CmsComponent[]> {
    // console.log('[ProductDetailsTabComponentAdapter.ids]: ', ids);
    if (pageContext?.type === PageType.PRODUCT_PAGE) {
      return this.generateProductDetailTabs(ids);
    }

    return super.findComponentsByIds(ids, pageContext);
  }

  generateProductDetailTabs(ids: string[]): Observable<CmsComponent[]> {
    if (!ids?.length) {
      return of<CmsComponent[]>([]);
    }
    const tabs: Observable<any>[] = ids.map((id) => {
      if (id !== 'deliveryTab') {
        return of({
          uid: id,
          flexType: id,
        });
      }

      return this.deliveryTabService.getContent().pipe(
        map((content) => ({
          uid: 'deliveryTab',
          typeCode: 'CMSTabParagraphComponent',
          content: `<div class="tab-delivery">${content}</div>`,
        })),
      );
    });

    return combineLatest(tabs).pipe(this.converter.pipeableMany(CMS_COMPONENT_NORMALIZER));
  }
}
