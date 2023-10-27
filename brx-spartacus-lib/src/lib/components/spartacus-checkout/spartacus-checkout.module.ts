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
import { SpartacusCheckoutOrderSummaryComponent } from './spartacus-checkout-order-summary/spartacus-checkout-order-summary.component';
import { SpartacusCheckoutOrderSummaryDirective } from './spartacus-checkout-order-summary/spartacus-checkout-order-summary.directive';
import { SpartacusCheckoutProgressMobileTopDirective } from './spartacus-checkout-progress/spartacus-checkout-progress-mobile-top/spartacus-checkout-progress-mobile-top.directive';
import { SpartacusCheckoutProgressMobileTopComponent } from './spartacus-checkout-progress/spartacus-checkout-progress-mobile-top/spartacus-checkout-progress-mobile-top.component';
import { SpartacusCheckoutProgressMobileBottomDirective } from './spartacus-checkout-progress/spartacus-checkout-progress-mobile-bottom/spartacus-checkout-progress-mobile-bottom.directive';
import { SpartacusCheckoutProgressMobileBottomComponent } from './spartacus-checkout-progress/spartacus-checkout-progress-mobile-bottom/spartacus-checkout-progress-mobile-bottom.component';
import { SpartacusCheckoutProgressComponent } from './spartacus-checkout-progress/spartacus-checkout-progress.component';
import { SpartacusCheckoutProgressDirective } from './spartacus-checkout-progress/spartacus-checkout-progress.directive';
import { SpartacusShippingAddressComponent } from './spartacus-shipping-address/spartacus-shipping-address.component';
import { SpartacusShippingAddressDirective } from './spartacus-shipping-address/spartacus-shipping-address.directive';
import { SpartacusDeliveryModeComponent } from './spartacus-delivery-mode/spartacus-delivery-mode.component';
import { SpartacusDeliveryModeDirective } from './spartacus-delivery-mode/spartacus-delivery-mode.directive';
import { SpartacusReviewSubmitComponent } from './spartacus-review-submit/spartacus-review-submit.component';
import { SpartacusReviewSubmitDirective } from './spartacus-review-submit/spartacus-review-submit.directive';
import { SpartacusPlaceOrderComponent } from './spartacus-place-order';
import { SpartacusPlaceOrderDirective } from './spartacus-place-order/spartacus-place-order.directive';
import { SpartacusPaymentMethodDirective } from './spartacus-payment-method/spartacus-payment-method.directive';
import { SpartacusPaymentMethodComponent } from './spartacus-payment-method';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SpartacusCheckoutProgressComponent,
    SpartacusCheckoutProgressDirective,
    SpartacusCheckoutProgressMobileTopComponent,
    SpartacusCheckoutProgressMobileTopDirective,
    SpartacusCheckoutProgressMobileBottomComponent,
    SpartacusCheckoutProgressMobileBottomDirective,
    SpartacusShippingAddressComponent,
    SpartacusShippingAddressDirective,
    SpartacusCheckoutOrderSummaryComponent,
    SpartacusCheckoutOrderSummaryDirective,
    SpartacusDeliveryModeComponent,
    SpartacusDeliveryModeDirective,
    SpartacusPaymentMethodComponent,
    SpartacusPaymentMethodDirective,
    SpartacusReviewSubmitComponent,
    SpartacusReviewSubmitDirective,
    SpartacusPlaceOrderComponent,
    SpartacusPlaceOrderDirective,
  ],
  exports: [
    SpartacusCheckoutProgressComponent,
    SpartacusCheckoutProgressMobileTopComponent,
    SpartacusCheckoutProgressMobileBottomComponent,
    SpartacusShippingAddressComponent,
    SpartacusCheckoutOrderSummaryComponent,
    SpartacusDeliveryModeComponent,
    SpartacusPaymentMethodComponent,
    SpartacusReviewSubmitComponent,
    SpartacusPlaceOrderComponent,
  ],
})
export class SpartacusCheckoutModule {}
