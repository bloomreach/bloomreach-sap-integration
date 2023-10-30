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
import { ProductActions, SearchboxService, SearchConfig } from '@spartacus/core';
import { BrxSearchConfig } from '../models/brx-search-config.model';

@Injectable({
  providedIn: 'root',
})
export class SpartacusSearchboxService extends SearchboxService {
  /**
   * dispatch the search for the search box
   */
  search(query: string, searchConfig?: SearchConfig): void {
    this.store.dispatch(
      new ProductActions.SearchProducts(
        {
          queryText: query,
          searchConfig: { ...searchConfig, type: 'suggestion' } as BrxSearchConfig,
        },
        true,
      ),
    );
  }
}
