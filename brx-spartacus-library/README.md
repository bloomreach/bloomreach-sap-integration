# Bloomreach Spartacus Library

The Bloomreach Spartacus Library enables Bloomreach Content and Discovery capabilities with Spartacus. The Bloomreach
Spartacus Library interacts with the following:

- [Page Model API](https://documentation.bloomreach.com/content/reference/pages-endpoint)
- [Bloomreach Angular SDK](https://www.npmjs.com/package/@bloomreach/ng-sdk)
- [Spartacus Storefront](https://www.npmjs.com/package/@spartacus/storefront)
- [Spartacus Core Library](https://www.npmjs.com/package/@spartacus/core)
- [Spartacus Assets](https://www.npmjs.com/package/@spartacus/assets)
- [Spartacus Styles](https://www.npmjs.com/package/@spartacus/styles)

## Installation

Before installing, make sure you have met the following requirements:
- Angular 14
- Spartacus 5
- @bloomreach/spa-sdk 22 or later
- @bloomreach/ng-sdk 22 or later

It's assumed that you already have working app with @bloomreach/spa-sdk, @bloomreach/ng-sdk and Spartacus installed.
If you haven't set up Bloomreach SPA SDK in your app yet, please follow the instructions provided [here](https://github.com/bloomreach/spa-sdk).
To set up Spartacus 5, you can refer to [this guide](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/cfcf687ce2544bba9799aa6c8314ecd0/5de67850bd8d487181fef9c9ba59a31d.html?version=5.0#loio5de67850bd8d487181fef9c9ba59a31d). 

For installing the brx-spartacus-library run following command

```bash
npm install @bloomreach/brx-spartacus-library 
```

Be aware! For Spartacus to track router events, it's important to use `<router-outlet></router-outlet>` in the App.tsx file.
Routes that include parameters in Spartacus configuration should be copied to Routing module in Angular. 
Here is an example: 

Spartacus configuration in `spartacus-configuration.module.ts`.
```bash
ConfigModule.withConfig({
  routing: {
    routes: {
        product: { paths: ['product/:productCode'] },
        category: { paths: ['category/:categoryCode', 'category'] },
        search: { paths: ['search/:query', 'search'] },
        login: { paths: ['sign-in'] },
        forgotPassword: { paths: ['forgot-password'] },
        resetPassword: { paths: ['sign-in/pw/change'] },
        register: { paths: ['register'] },
    },
  },
}),
```
Routes `product/:productCode`, `search/:query`, and `category/:categoryCode` contain parameters should be copied to Routing module. Product details route should have `canActivate: [CmsPageGuard]` as it shown below:
```bash
const routes: Routes = [
  { path: 'search/:query', component: BrxComponent },
  { path: 'product/:productCode', canActivate: [CmsPageGuard], component: BrxComponent },
  { path: 'category/:categoryCode', component: BrxComponent },
  { path: '**', component: BrxComponent },
];
```

In `BrPage.tsx`, add Spartacus components from the brx-spartacus-library to mapping as following:

```bash
  import {
    BannerComponent,
    SpartacusBannerComponent,
    SpartacusLoginFormComponent,
    ...
  } from '@bloomreach/brx-spartacus-library';
  
  mapping = {
    Banner: BannerComponent,
    SpartacusBanner: SpartacusBannerComponent,
    SpartacusLogin: SpartacusLoginFormComponent,
    ...
  }
```

See brx-spartacus-storefront as reference [here](https://github.com/bloomreach/bloomreach-sap-integration/tree/main/brx-spartacus-storefront).

## Components present in integration

- Category highlight
- Pathways & Recommendations
- Spartacus banner
- Spartacus paragraph
- Spartacus product carousel
- Spartacus product details
- Spartacus product list
- Banner
- Spartacus breadcrumb
- Spartacus cart coupon
- Spartacus cart details
- Spartacus cart quick order form
- Spartacus cart totals
- Spartacus checkout order summary
- Spartacus checkout progress
- Spartacus checkout progress mobile bottom
- Spartacus checkout progress mobile top
- Spartacus checkout review order
- Spartacus delivery mode
- Spartacus forget password
- Spartacus login
- Spartacus login register
- Spartacus mini cart
- Spartacus order confirmation items
- Spartacus order confirmation totals
- Spartacus order confirmation thank you message
- Spartacus order detail shipping
- Spartacus payment method
- Spartacus place order
- Spartacus product facet navigation
- Spartacus register
- Spartacus search box
- Spartacus shipping address
- Spartacus user greet
- Spartacus wish list
- User my account

### Prerequisites

Your development environment should include the following:

- Node.js: 16.x.x or later
- NPM: version 8 or later

### Install dependencies and build

In the root directory of your project run the following commands using [NPM](https://docs.npmjs.com/cli/npm):

```bash
npm ci
npm run build
```

### Releasing a new version

Releasing a new version follows the standard angular appraoch for releasing libraries.

- Make sure the pipelines are green and the library is tested to work.
- Use `npm version` to set a new version in the package.json
- Run `npm run build` to create the package build in `dist/`
- Inside `dist/` run `npm publish`

### Development

If developing this in tandem with the [storefront](../brx-spartacus-storefront) we suggest to use
[yalc](https://github.com/wclr/yalc) to publish from the `dist/` folder to your local system and `yalc link` it in the
storefront app.

## License

Published under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) license.
