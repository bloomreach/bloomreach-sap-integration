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

import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { asapScheduler, BehaviorSubject, interval, Observable, of } from 'rxjs';
import { delayWhen, observeOn, switchMap } from 'rxjs/operators';
import { ICON_TYPE, BreakpointService } from '@spartacus/storefront';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';
import { FacetService } from './services/facet.service';

/*
 * Inspired by cms-components/product/product-list/product-facet-navigation/product-facet-navigation.component.ts
 * of SAP Spartacus Storefront project.
 */
interface SpartacusProductFacetNavigationComponentParams {
  filters?: string;
  topVisible?: number;
}

@Component({
  selector: 'brx-product-facet-navigation',
  templateUrl: './spartacus-product-facet-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpartacusProductFacetNavigationComponent implements OnInit {
  @Input() component!: BrComponent;

  @Input() page!: Page;

  iconTypes = ICON_TYPE;

  /**
   * We delay the removal of DOM so that animations can finish playing before the
   * DOM is removed. Removing the DOM, as hidding is not enough to stop elements
   * to be focused.
   */
  protected CLOSE_DELAY = 300;

  /**
   * Used to open the facet navigation in a dialog. The usage of the dialog depends
   * on the availability of the trigger element, which is driven by CSS.
   *
   * The reference is also used to refocus the trigger after the dialog is closed.
   */
  @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;

  protected open$ = new BehaviorSubject(false);

  /**
   * Emits the open state that indicates whether the facet list should be rendered.
   * This is either done instantly, or after the user triggers this by using the trigger
   * button. This driven by the visiibility of the trigger, so that the CSS drives
   * the behaviour. This can differ per breakpoint.
   *
   * There's a configurable delay for the closed state, so that the DOM is not removed
   * before some CSS animations are done.
   */
  isOpen$: Observable<boolean> = this.breakpointService.breakpoint$.pipe(
    // deffer emitting a new value to the next micro-task to ensure that the `hasTrigger`
    // method represents the actual UI state.
    observeOn(asapScheduler),
    switchMap(() => (this.hasTrigger ? this.open$ : of(true))),
    delayWhen((launched) => interval(launched ? 0 : this.CLOSE_DELAY)),
  );

  /**
   * Emits the active state that indicates whether the facet list is activated. Activation
   * is related to the css, so that a animation or transition can visualize opening/closing
   * the list (i.e. dialog).
   */
  isActive$ = this.open$.pipe(
    // deffer emitting a new value to the next micro-task to ensure the active class is
    //  applied after the DOM is created
    observeOn(asapScheduler),
  );

  constructor(protected breakpointService: BreakpointService, protected facetService: FacetService) {}

  ngOnInit(): void {
    this.facetService.defaultTopFacets = this.topVisible;
  }

  launch(): void {
    this.open$.next(true);
  }

  close(): void {
    this.open$.next(false);
    this.trigger.nativeElement.focus();
  }

  /**
   * Indicates that the facet navigation should be open explicitely by a trigger.
   * This is fully controlled by CSS, where the trigger button can be hidden
   * (display:none) for certain screen sizes.
   */
  get hasTrigger(): boolean {
    return this.trigger.nativeElement.offsetParent !== null;
  }

  get params(): SpartacusProductFacetNavigationComponentParams {
    return this.component.getParameters<SpartacusProductFacetNavigationComponentParams>();
  }

  get allowedFilters(): string[] {
    return (
      this.params.filters
        ?.split(';')
        .map((filter) => filter.trim())
        .filter(Boolean) ?? []
    );
  }

  get topVisible(): number {
    return this.params.topVisible ?? 0;
  }
}
