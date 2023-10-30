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

import { Breadcrumb, Facet } from '@spartacus/core';

/**
 * UI model that holds the full list of facet and active facets for
 * the product list.
 *
 * Copied from cms-components/product/product-list/product-facet-navigation/facet.model.ts
 * of SAP Spartacus Storefront project.
 */
export interface FacetList {
  facets: Facet[];
  activeFacets?: Breadcrumb[];
}

export interface FacetCollapseState {
  /**
   * Indicates whether the facet is toggled to expand or collapse the facet values.
   * Whether the toggle results in an expanded or collapsed state, depends on the
   * experience, which is controlled in CSS.
   */
  toggled?: FacetGroupCollapsedState;

  /**
   * The top number of facet values that will be visible.
   */
  topVisible?: number;

  /**
   * The max number of facet values which will be visible. This includes
   * the top visible number.
   */
  maxVisible?: number;
}

export enum FacetGroupCollapsedState {
  EXPANDED = 'EXPANDED',
  COLLAPSED = 'COLLAPSED',
}
