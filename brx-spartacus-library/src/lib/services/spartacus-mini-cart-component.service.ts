/*
 * Copyright 2024 Hippo B.V. (http://www.onehippo.com)
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
import { AuthService, EventService, SiteContextParamsService, StatePersistenceService } from '@spartacus/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { MiniCartComponentService } from '@spartacus/cart/base/components/mini-cart';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpartacusMiniCartComponentService extends MiniCartComponentService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected authService: AuthService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService,
    protected eventService: EventService,
  ) {
    super(activeCartFacade, authService, statePersistenceService, siteContextParamsService, eventService);
  }

  getQuantity(): Observable<number> {
    return this.activeCartRequired().pipe(
      switchMap((activeCartRequired) => {
        if (activeCartRequired) {
          return this.activeCartFacade.getActive().pipe(
            startWith({ totalUnitCount: 0, deliveryItemsQuantity: 0 }),
            map((cart) => cart.totalUnitCount || cart.deliveryItemsQuantity || 0),
          );
        }
        return of(0);
      }),
    ) as Observable<number>;
  }
}
