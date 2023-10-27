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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --configuration=production` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  netlifyEnvUrl: '', // https://brx-spartacus-latest.netlify.app/.netlify/functions/get-env-variables
  libConfig: {
    endpoint: '', // Local Development Endpoint - 'http://localhost:8080/delivery/site/v1/channels/spartacus/pages'
    smEndPoint: 'https://pathways.dxpapi.com/api/',
    smSuggestionEndPoint: 'https://suggest.dxpapi.com/api/',
    accountId: '',  // add account Id
    domainKey: '', // add domain Key
    authKey: '', // add authKey
  },
  appConfig: {
    defaultLoadingTime: 2 // in seconds
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
