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
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import {
  ActiveCartService,
  AuthService,
  CartVoucherService,
  CustomerCouponService,
  RoutingService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { AddToSavedCartComponent } from '@spartacus/cart/saved-cart/components';
import { SpartacusAddToSavedCartDirective } from './spartacus-add-to-saved-cart.directive';

@Component({
  selector: 'brx-spartacus-add-to-saved-cart',
  templateUrl: './spartacus-add-to-saved-cart.component.html',
  styleUrls: ['./spartacus-add-to-saved-cart.component.scss'],
})
export class SpartacusAddToSavedCartComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  @ViewChild(SpartacusAddToSavedCartDirective, { static: true })
  wrappedComponent!: SpartacusAddToSavedCartDirective;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    protected activeCartService: ActiveCartService,
    protected authService: AuthService,
    protected routingService: RoutingService,
    protected vcr: ViewContainerRef,
    protected launchDialogService: LaunchDialogService,
  ) {}

  ngOnInit(): void {
    this.renderWrapper();
  }

  renderWrapper(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddToSavedCartComponent);
    const { viewContainerRef } = this.wrappedComponent;
    viewContainerRef.clear();

    const componentInjector = Injector.create({
      providers: [
        {
          provide: ActiveCartService,
          useValue: this.activeCartService,
        },
        {
          provide: AuthService,
          useValue: this.authService,
        },
        {
          provide: RoutingService,
          useValue: this.routingService,
        },
        {
          provide: ViewContainerRef,
          useValue: this.vcr,
        },
        {
          provide: LaunchDialogService,
          useValue: this.launchDialogService,
        },
      ],
    });

    viewContainerRef.createComponent<AddToSavedCartComponent>(componentFactory, 0, componentInjector);
  }
}
