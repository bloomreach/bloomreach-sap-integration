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

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { userAccountTranslationChunksConfig, userAccountTranslations } from '@spartacus/user/account/assets';
import { UserAccountRootModule, USER_ACCOUNT_FEATURE } from '@spartacus/user/account/root';
import { userProfileTranslationChunksConfig, userProfileTranslations } from '@spartacus/user/profile/assets';
import { UserProfileRootModule, USER_PROFILE_FEATURE } from '@spartacus/user/profile/root';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () => import('@spartacus/user/account').then((m) => m.UserAccountModule),
        },
      },
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: userAccountTranslations,
        chunks: userAccountTranslationChunksConfig,
      },
    } as I18nConfig),
    provideConfig({
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () => import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
    } as CmsConfig),
    provideConfig({
      i18n: {
        resources: userProfileTranslations,
        chunks: userProfileTranslationChunksConfig,
      },
    } as I18nConfig),
  ],
})
export class UserFeatureModule {}
