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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { CheckoutOrderSummaryComponent } from '@spartacus/checkout/base/components';
import { SpartacusCheckoutOrderSummaryDirective } from './spartacus-checkout-order-summary.directive';

@Component({
  selector: 'brx-spartacus-checkout-order-summary',
  templateUrl: './spartacus-checkout-order-summary.component.html',
})
export class SpartacusCheckoutOrderSummaryComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCheckoutOrderSummaryDirective, { static: true })
  wrappedComponent!: SpartacusCheckoutOrderSummaryDirective;

  ngOnInit(): void {
    this.renderWrappedCheckoutOrderSummary();
  }

  renderWrappedCheckoutOrderSummary(): void {
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent(CheckoutOrderSummaryComponent, { index: 0 });
  }
}
