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

import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
// TODO:Spartacus - // TODO:Spartacus - Class OrderConfirmationOverviewComponent has been removed and is no longer part of the public API. Use 'OrderDetailShippingComponent' instead from @spartacus/order/components
import { OrderConfirmationOverviewComponent } from '@spartacus/checkout/components';
import { SpartacusOrderConfirmationOverviewDirective } from './spartacus-order-confirmation-overview.directive';

@Component({
  selector: 'brx-spartacus-order-confirmation-overview',
  templateUrl: './spartacus-order-confirmation-overview.component.html',
})
export class SpartacusOrderConfirmationOverviewComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusOrderConfirmationOverviewDirective, { static: true })
  wrappedComponent!: SpartacusOrderConfirmationOverviewDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderWrappedOrderConfirmationTotals();
  }

  renderWrappedOrderConfirmationTotals(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OrderConfirmationOverviewComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent<OrderConfirmationOverviewComponent>(componentFactory, 0);
  }
}
