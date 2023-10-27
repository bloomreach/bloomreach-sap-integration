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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Facet, FacetValue } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE, FocusDirective } from '@spartacus/storefront';
import { Page } from '@bloomreach/spa-sdk';
import { FacetCollapseState } from '../facet.model';
import { FacetService } from '../services/facet.service';

/*
 * Inspired by cms-components/product/product-list/product-facet-navigation/facet/facet.component.ts
 * of SAP Spartacus Storefront project.
 */
@Component({
  selector: 'brx-facet',
  templateUrl: './facet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetComponent {
  protected _facet!: Facet;

  state$?: Observable<FacetCollapseState>;

  /** configurable icon that is used to collapse the facet group  */
  @Input() expandIcon: ICON_TYPE = ICON_TYPE.EXPAND;

  @Input() collapseIcon: ICON_TYPE = ICON_TYPE.COLLAPSE;

  @HostBinding('class.multi-select') isMultiSelect?: boolean;

  @ViewChildren('facetValue') values?: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(FocusDirective) keyboardFocus?: FocusDirective;

  @Input()
  set facet(value: Facet) {
    this._facet = value;
    this.isMultiSelect = !!value.multiSelect;
    this.state$ = this.facetService.getState(value);
  }

  get facet(): Facet {
    return this._facet;
  }

  @Input() page!: Page;

  constructor(
    protected facetService: FacetService,
    protected elementRef: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
  ) {}

  /**
   * Handles clicking the heading of the facet group, which means toggling
   * the visibility of the group (collapse / expand) and optionally focusing
   * the group.
   */
  toggleGroup(event: UIEvent): void {
    const host: HTMLElement = this.elementRef.nativeElement;
    const isLocked = this.keyboardFocus?.isLocked;

    this.facetService.toggle(this.facet, this.isExpanded);

    if (!isLocked || this.isExpanded) {
      host.focus();
      // we stop propagating the event as otherwise the focus on the host will trigger
      // an unlock event from the LockFocus directive.
      event.stopPropagation();
    }
  }

  get isExpanded(): boolean {
    return this.values?.first.nativeElement.offsetParent !== null;
  }

  openLink(event: Event): void {
    (event.target as HTMLElement).click();
    event.preventDefault();
  }

  /**
   * Increases the number of visible values for the facet. This is delegated
   * to `facetService.increaseVisibleValues`.
   */
  increaseVisibleValues(): void {
    this.facetService.increaseVisibleValues(this.facet);
  }

  /**
   * Decreases the number of visible values for the facet. This is delegated
   * to `facetService.decreaseVisibleValues`.
   */
  decreaseVisibleValues(): void {
    this.facetService.decreaseVisibleValues(this.facet);
  }

  getLinkParams(value: FacetValue): Record<string, string> {
    return this.facetService.getLinkParams(value.query?.query?.value);
  }

  getMoreFacetValues(facet: Facet, state: FacetCollapseState): FacetValue[] | undefined {
    return facet.values?.slice(state.topVisible, state.maxVisible);
  }
}
