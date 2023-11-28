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
import { CheckoutProgressComponent } from '@spartacus/checkout/base/components';
import { SpartacusCheckoutProgressDirective } from './spartacus-checkout-progress.directive';

@Component({
  selector: 'brx-spartacus-checkout-progress',
  templateUrl: './spartacus-checkout-progress.component.html',
})
export class SpartacusCheckoutProgressComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCheckoutProgressDirective, { static: true })
  wrappedComponent!: SpartacusCheckoutProgressDirective;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderWrappedCheckoutProgress();
  }

  renderWrappedCheckoutProgress(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckoutProgressComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent<CheckoutProgressComponent>(componentFactory, 0);
  }
}
