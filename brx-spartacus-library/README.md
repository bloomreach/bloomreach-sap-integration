# Bloomreach Spartacus Library

The Bloomreach Spartacus Library enables Bloomreach Content and Discovery capabilities with Spartacus. The Bloomreach
Spartacus Library interacts with the following:

- [Page Model API](https://documentation.bloomreach.com/content/reference/pages-endpoint)
- [Bloomreach Angular SDK](https://www.npmjs.com/package/@bloomreach/ng-sdk)
- [Spartacus Storefront](https://www.npmjs.com/package/@spartacus/storefront)
- [Spartacus Core Library](https://www.npmjs.com/package/@spartacus/core)
- [Spartacus Assets](https://www.npmjs.com/package/@spartacus/assets)
- [Spartacus Styles](https://www.npmjs.com/package/@spartacus/styles)

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
- Spartacus order confirmation overview
- Spartacus order confirmation thank you message
- Spartacus payment method
- Spartacus place order
- Spartacus product facet navigation
- Spartacus register
- Spartacus search box
- Spartacus shipping address
- Spartacus user greet
- Spartacus wish list
- User my account

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
