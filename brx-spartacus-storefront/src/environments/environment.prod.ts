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

export const environment = {
  production: true,
  netlifyEnvUrl: '',
  libConfig: {
    endpoint: '', // production endpoint
    smEndPoint: 'https://pathways.dxpapi.com/api/',
    smSuggestionEndPoint: 'https://suggest.dxpapi.com/api/',
    accountId: '', // add account Id
    domainKey: '', // add domain Key
    authKey: '', // add authKey
  },
  appConfig: {
    defaultLoadingTime: 2, // in seconds
  },
  hasMultiTenantSupport: 'true',
};
