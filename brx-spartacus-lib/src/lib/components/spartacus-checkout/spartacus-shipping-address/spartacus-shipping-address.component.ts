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
import { ShippingAddressComponent } from '@spartacus/checkout/components';
import { setActivatedRouteSnapshotUrl } from '../utils/set-activated-route-snapshot-url';
import { SpartacusShippingAddressDirective } from './spartacus-shipping-address.directive';

@Component({
  selector: 'brx-spartacus-shipping-address',
  templateUrl: './spartacus-shipping-address.component.html',
})
export class SpartacusShippingAddressComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusShippingAddressDirective, { static: true })
  wrappedComponent!: SpartacusShippingAddressDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    setActivatedRouteSnapshotUrl(this.page, this.activatedRoute, this.router);
    this.renderWrappedShippingAddress();
  }

  renderWrappedShippingAddress(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ShippingAddressComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();
    viewContainerRef.createComponent<ShippingAddressComponent>(componentFactory, 0);
  }
}
