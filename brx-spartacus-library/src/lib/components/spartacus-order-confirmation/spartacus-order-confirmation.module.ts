/* eslint-disable max-len */
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
import { SpartacusOrderConfirmationThankYouMessageComponent } from './spartacus-order-confirmation-thank-you-message';
import { SpartacusOrderConfirmationThankYouMessageDirective } from './spartacus-order-confirmation-thank-you-message/spartacus-order-confirmation-thank-you-message.directive';
import { SpartacusOrderConfirmationTotalsDirective } from './spartacus-order-confirmation-totals/spartacus-order-confirmation-totals.directive';
import { SpartacusOrderConfirmationTotalsComponent } from './spartacus-order-confirmation-totals';
import { SpartacusOrderConfirmationItemsComponent } from './spartacus-order-confirmation-items';
import { SpartacusOrderConfirmationItemsDirective } from './spartacus-order-confirmation-items/spartacus-order-confirmation-items.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SpartacusOrderConfirmationThankYouMessageComponent,
    SpartacusOrderConfirmationThankYouMessageDirective,
    SpartacusOrderConfirmationTotalsComponent,
    SpartacusOrderConfirmationTotalsDirective,
    SpartacusOrderConfirmationItemsComponent,
    SpartacusOrderConfirmationItemsDirective,
  ],
  exports: [
    SpartacusOrderConfirmationThankYouMessageComponent,
    SpartacusOrderConfirmationTotalsComponent,
    SpartacusOrderConfirmationItemsComponent,
  ],
})
export class SpartacusOrderConfirmationModule {}
