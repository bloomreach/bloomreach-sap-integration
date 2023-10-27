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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrxEndpointService } from './brx-endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class BrxCategoryService {
  constructor(protected http: HttpClient, protected brxEndpoints: BrxEndpointService) {}

  getAllCategoriesList(): Observable<any> {
    return this.http.get(this.brxEndpoints.buildSearchUrl()).pipe(map((data: any) => data?.category_map ?? {}));
  }
}
