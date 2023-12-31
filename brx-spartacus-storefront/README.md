# BrxSpartacus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). Please check the documentation
for all the configuration and CLI commands.

## Getting started

### Install dependencies and run the app as follows:

```bash
npm ci
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. For more
on components and environment varaibles check out the Bloomreach Spartacus Library
[documentation](https://www.npmjs.com/package/@bloomreach/brx-spartacus-library).

## Development

If developing this in tandem with the [library](../brx-spartacus-library) we suggest to use
[yalc](https://github.com/wclr/yalc) to publish from the library's `dist/` folder to your local system and `yalc link` it in the
storefront app.

### Set Environment Variables

Configure environment variables in src > environments.ts file

```typescript
export const environment = {
  production: true / false,
  netlifyEnvUrl: 'https://..../.netlify/functions/get-env-variables',
  libConfig: {
    endpoint: 'https://...../pages',
    smEndPoint: 'https://....',
    smSuggestionEndPoint: 'https://suggest.xyzz.com/api/',
    accountId: '1234',
    domainKey: 'abc_123',
    authKey: 'etdr235dfh',
  },
  appConfig: {
    defaultLoadingTime: 2, // in seconds
  },
};
```

## Production build

### Environment Variables

Configure environment variables(as [here](#set-environment-variables)) in src > environments.prod.ts file

### Accessing Environment Variables from Netlify

- Deploy Netlify function along with App distribution to Netlify
- Netlify provides an endpoint of the deployed function to access the environment variables
- Copy the endpoint URL from Netlify functions dashboard and add it to "netlifyEnvUrl" property in the environment file
  as shown above
- Use 'brx\_' as prefix while setting ENV variables names in Netlify (Eg: brx_endpoint)
- If adding/editing environment variables in Netlify, you'll need to rebuild and re-deploy the App to get the latest
  value of environment variables

## Other links

- [Bloomreach Spartacus NPM Library](https://www.npmjs.com/package/@bloomreach/brx-spartacus-library)
- [Bloomreach Spartacus Storefront demo](https://brx-spartacus-latest.netlify.app/)
- [Bloomreach Spartacus documentation](https://documentation.bloomreach.com/content/docs/sap-spartacus)
- [brX instance](https://spartacus-sandbox.bloomreach.io/cms/?0)
- [Spartacus Github](https://github.com/SAP/spartacus)
- [Spartacus docs](https://sap.github.io/spartacus-docs)
