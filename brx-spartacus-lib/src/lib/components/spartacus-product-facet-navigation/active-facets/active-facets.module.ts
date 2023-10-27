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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { CustomPipesModule } from '../../../pipes/custom-pipes.module';
import { ActiveFacetsComponent } from './active-facets.component';

/*
 * Copied from cms-components/product/product-list/product-facet-navigation/active-facets/active-facets.module.ts
 * of SAP Spartacus Storefront project.
 */
@NgModule({
  imports: [CommonModule, RouterModule, I18nModule, IconModule, KeyboardFocusModule, CustomPipesModule],
  declarations: [ActiveFacetsComponent],
  exports: [ActiveFacetsComponent],
})
export class ActiveFacetsModule {}
