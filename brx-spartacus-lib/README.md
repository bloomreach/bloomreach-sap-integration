# Bloomreach Spartacus Library

The Bloomreach Spartacus Library enables Bloomreach Content and Discovery capabilities with Spartacus.
The Bloomreach Spartacus Library interacts with the following: 
- [Page Model API](https://documentation.bloomreach.com/api-reference/content/delivery/page-delivery-api/page-delivery-api.html)
- [Bloomreach Angular SDK](https://www.npmjs.com/package/@bloomreach/ng-sdk)
- [Spartacus Storefront](https://www.npmjs.com/package/@spartacus/storefront)
- [Spartacus Core Library](https://www.npmjs.com/package/@spartacus/core)
- [Spartacus Assets](https://www.npmjs.com/package/@spartacus/assets)
- [Spartacus Styles](https://www.npmjs.com/package/@spartacus/styles)

## Components

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


## Getting Started
- Clone the demo app [here](https://github.com/bloomreach/bloomreach-spartacus-storefront)
### Prerequisites
Your Angular development environment should include the following:

- Angular CLI: Version 12.2.x or later.
- Node.js: The most recent 12.14.x or later.
- Yarn: Version 1.15 or later / npm: Version 6.x or later
### Install dependencies and start
Before starting the SPA, 
- Configure the environemnt variables as [here](#environment-variables)
- Set the Spartacus OCC config in *src/app/spartacus/spartacus-configuration.module.ts* as [here](https://sap.github.io/spartacus-docs/building-the-spartacus-storefront-from-libraries-4-x/#checking-spartacus-configurationmodulets-for-base-url-and-other-settings)


In the root directory of your project run the following commands using [NPM](https://docs.npmjs.com/cli/npm):

```bash
npm ci
npm start
```

Or with [Yarn](https://yarnpkg.com) (Recommended):

```bash
yarn
yarn start 
```
- Local instance of SPA can be viewed in http://localhost:3000/

### Environment variables

The Enviroment Variables are to be configured as follows:

| Property                | Required | Description                                                                                     |
| ----------------------- | :------: | ----------------------------------------------------------------------------------------------- |
| `endpoint` |   _yes_   | The Bloomreach Content endpoint.                                                         |
| `smEndPoint` |   _yes_   | The Bloomreach Discovery endpoint.                                               |
| `smSuggestionEndPoint`   |   _yes_   | The Bloomreach Discovery Suggestion endpoint. |
| `accountId`                  |   _yes_   | The Bloomreach Discovery account ID.                                 |
| `domainKey`             |   _yes_   | The Bloomreach Discovery domain key.                          |
| `authKey`              |   _yes_   | The Bloomreach Discovery auth key.
| `defaultLoadingTime`              |   _yes_   | Default spinner loading time.
| `netlifyEnvUrl`              |   _optional_   | Endpoint of Netlify function to get environment variables. 
### Example
```typescript
export const environment = {
  production: true,
  netlifyEnvUrl: "https://..../.netlify/functions/get-env-variables",
  libConfig: {
    endpoint: 'https://...../pages',
    smEndPoint: 'https://....',
    smSuggestionEndPoint: 'https://suggest.xyzz.com/api/',
    accountId : "1234",
    domainKey : "abc_123",
    authKey : "etdr235dfh"
  },
  appConfig: {
    defaultLoadingTime: 2 // in seconds
  }
};
```
## Accessing Environment Variables from Netlify
- Deploy Netlify function along with App distribution to Netlify
- Netlify provides an endpoint of the deployed function to access the environment variables
- Copy the endpoint URL from Netlify functions dashboard and add it to "netlifyEnvUrl" property in the environment file as shown above
- Use 'brx_' as prefix while setting ENV variables names in Netlify (Eg: brx_endpoint)
- If adding/editing environment variables in Netlify, you'll need to rebuild and re-deploy the App to get the latest value of environment variables

## Info
- Know more about Bloomreach SAP Spartacus [here](https://documentation.bloomreach.com/content/docs/sap-spartacus)
- The environment variables must be configured at build time since Angular does not support configuring them in runtime from the hosting provider.
## License

Published under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) license.
