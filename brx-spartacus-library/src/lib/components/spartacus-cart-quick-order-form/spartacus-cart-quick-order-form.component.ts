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

import { Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { FormBuilder } from '@angular/forms';
import { ActiveCartService, EventService, GlobalMessageService } from '@spartacus/core';
import { CartQuickOrderFormComponent } from '@spartacus/cart/quick-order/components';
import { SpartacusCartQuickOrderFormDirective } from './spartacus-cart-quick-order-form.directive';

@Component({
  selector: 'brx-spartacus-cart-quick-order-form',
  templateUrl: './spartacus-cart-quick-order-form.component.html',
  styleUrls: ['./spartacus-cart-quick-order-form.component.scss'],
})
export class SpartacusCartQuickOrderFormComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusCartQuickOrderFormDirective, { static: true })
  wrappedComponent!: SpartacusCartQuickOrderFormDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected formBuilder: FormBuilder,
    protected globalMessageService: GlobalMessageService,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CartQuickOrderFormComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartService,
          useValue: this.activeCartService,
        },
        {
          provide: EventService,
          useValue: this.eventService,
        },
        {
          provide: FormBuilder,
          useValue: this.formBuilder,
        },
        {
          provide: GlobalMessageService,
          useValue: this.globalMessageService,
        },
      ],
    });

    viewContainerRef.createComponent<CartQuickOrderFormComponent>(componentFactory, 0, componentInjector);
  }
}
