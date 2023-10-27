/*
 * Copyright 2022-2023 BloomReach (https://www.bloomreach.com/)
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

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { SavedCartFormDialogComponent } from '@spartacus/cart/saved-cart/components';

export const defaultSavedCartFormLayoutConfig: LayoutConfig = {
  launch: {
    SAVED_CART: {
      inline: true,
      component: SavedCartFormDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
