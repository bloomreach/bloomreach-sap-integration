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
import { ActivatedRoute, Router } from '@angular/router';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { CheckoutDeliveryModeComponent } from '@spartacus/checkout/base/components';
import { setActivatedRouteSnapshotUrl } from '../utils/set-activated-route-snapshot-url';
import { SpartacusDeliveryModeDirective } from './spartacus-delivery-mode.directive';

@Component({
  selector: 'brx-spartacus-delivery-mode',
  templateUrl: './spartacus-delivery-mode.component.html',
})
export class SpartacusDeliveryModeComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusDeliveryModeDirective, { static: true })
  wrappedComponent!: SpartacusDeliveryModeDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    setActivatedRouteSnapshotUrl(this.page, this.activatedRoute, this.router);
    this.renderWrappedDeliveryMode();
  }

  renderWrappedDeliveryMode(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckoutDeliveryModeComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    viewContainerRef.createComponent<CheckoutDeliveryModeComponent>(componentFactory, 0);
  }
}
