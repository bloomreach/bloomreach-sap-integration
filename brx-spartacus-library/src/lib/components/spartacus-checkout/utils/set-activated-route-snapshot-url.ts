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

import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Page } from '@bloomreach/spa-sdk';

/**
 * Since we are using brX, the activatedRoute will have empty snapshot url.
 * Here we manually set it to the current URL so the checkout steps can function correctly.
 */
export function setActivatedRouteSnapshotUrl(page: Page, activatedRoute: ActivatedRoute, router: Router): void {
  activatedRoute.snapshot.url = router.parseUrl(page.getUrl() ?? '/').root.children[PRIMARY_OUTLET].segments;
  // console.log('[setActivatedRouteSnapshotUrl]: activatedRoute.snapshot.url: ', activatedRoute.snapshot.url);
}
