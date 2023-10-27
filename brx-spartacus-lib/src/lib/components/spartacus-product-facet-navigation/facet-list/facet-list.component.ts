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
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Facet } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusConfig, ICON_TYPE } from '@spartacus/storefront';
import { Page } from '@bloomreach/spa-sdk';
import { FacetGroupCollapsedState, FacetList } from '../facet.model';
import { FacetComponent } from '../facet/facet.component';
import { FacetService } from '../services/facet.service';

/*
 * Inspired by cms-components/product/product-list/product-facet-navigation/facet-list/facet-list.component.ts
 * of SAP Spartacus Storefront project.
 */
@Component({
  selector: 'brx-facet-list',
  templateUrl: './facet-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetListComponent {
  private _isDialog!: boolean;

  /**
   * Indicates that the facet navigation is rendered in dialog.
   */
  @Input()
  set isDialog(value: boolean) {
    this._isDialog = value;
    if (value) {
      this.renderer.addClass(document.body, 'modal-open');
    }
  }

  get isDialog(): boolean {
    return this._isDialog;
  }

  @Input()
  allowedFilters?: string[];

  /** Emits when the list must close */
  @Output() closeList = new EventEmitter();

  /** The list of all facet and values related to the products in the list */
  facetList$: Observable<FacetList> = this.facetService.facetList$.pipe(
    map((facetList) => {
      const allowedFiltersCopy = [...(this.allowedFilters ?? [])];
      const caseSensitiveResult: Facet[] = [];
      // console.log('[FacetListComponent, allowedFilters]: ', allowedFiltersCopy);
      facetList.facets = facetList.facets
        .filter((facet) => {
          if (!facet.name) {
            return false;
          }
          const index = allowedFiltersCopy.indexOf(facet.name);
          if (index >= 0) {
            caseSensitiveResult.push(facet);
            allowedFiltersCopy.splice(index, 1);
            return false;
          }
          return true;
        })
        .filter((facet) => !!allowedFiltersCopy.find((af) => af.toLowerCase() === facet.name?.toLowerCase()))
        .concat(caseSensitiveResult);
      // console.log('[FacetListComponent, facets]: ', facetList.facets);

      return facetList;
    }),
  );

  iconTypes = ICON_TYPE;

  dialogFocusConfig: FocusConfig = {
    trap: true,
    block: true,
    focusOnEscape: true,
    autofocus: 'brx-facet',
  };

  @HostListener('click') handleClick(): void {
    this.close();
  }

  @Input() page!: Page;

  constructor(protected facetService: FacetService, protected elementRef: ElementRef, protected renderer: Renderer2) {}

  /**
   * Toggles the facet group in case it is not expanded.
   */
  expandFacetGroup(facet: Facet, ref: FacetComponent): void {
    if (!ref.isExpanded) {
      this.facetService.toggle(facet, ref.isExpanded);
    }
  }

  /**
   * Indicates that the facet group has been expanded.
   */
  isExpanded(facet: Facet): Observable<boolean> {
    return this.facetService.getState(facet).pipe(map((value) => value.toggled === FacetGroupCollapsedState.EXPANDED));
  }

  /**
   * Indicates that the facet group has been collapsed.
   */
  isCollapsed(facet: Facet): Observable<boolean> {
    return this.facetService.getState(facet).pipe(map((value) => value.toggled === FacetGroupCollapsedState.COLLAPSED));
  }

  close(event?: boolean): void {
    this.renderer.removeClass(document.body, 'modal-open');
    this.closeList.emit(event);
  }

  block(event?: MouseEvent): void {
    event?.stopPropagation();
  }
}
