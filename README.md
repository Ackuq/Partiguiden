# Partiguiden - Party information and parliament data made accessible

Partiguiden is a website created with the purpose of making information about the political climate in Sweden as accessible as possible.

## Table of contents

1. [Tools used](#tools-used)
2. [Development](#development)
   1. [Prerequisites](#prerequisites)
   2. [Environment variables](#environment-variables)
   3. [Running](#running)
   4. [Linting and formatting](#linting-and-formatting)
3. [CI/CD](#cicd)
   1. [Continuos integration](#continuos-integration)
   2. [Continuos deployment](#continuos-deployment)
4. [Deployment environments](#deployment-environments)

## Tools used

- [React.js](https://reactjs.org/) - Javascript framework for developing web apps.
- [Next.js](https://nextjs.org/) - React.js framework for developing server rendered apps.
- [Vercel](https://vercel.com/) - For deployments

## Development

In this section, information on how to set up and contribute to the project will be presented.

### Prerequisites

- [yarn](https://yarnpkg.com) - Package manager
- [vercel-cli](https://vercel.com/docs/cli) - (optional) Used for interacting with the vercel project

### Environment variables

To easily get started with the bare minimum environment variables to get started, a file `.env.example` is provided in this project. This configuration allows you to interact with the beta version of the backend. To copy this config, run:

```sh
cp .env.example .env
```

Alternatively, if have an authenticated vercel-cli and have access to the project, you can get a complete copy of the development environment configuration by running:

```sh
vercel env pull
```

### Running

If you have access to the vercel project, you may use the following command to make use of serverless functionality:

```sh
yarn start # Runs the command `vercel dev` (https://vercel.com/docs/cli#commands/dev)
```

If you don't have access to the vercel project, you can run using Next's development mode using:

```sh
yarn start-dev # Runs the command `next dev` (https://nextjs.org/docs/api-reference/cli#development)
```

### Linting and formatting

This project uses [ESLint](https://eslint.org) and [Prettier](https://prettier.io) for code linting and formatting. The configuration for ESLint can be found in the file [.eslintrc](./.eslintrc) and for Prettier in the file [.prettierrc](./.prettierrc). To check linting and formatting of the project, run the command:

```sh
yarn lint # Will run the commands `tsc` for type checking and `eslint` for linting and code formatting
```

## CI/CD

This project used Github Actions for continuos integration and a Vercel integration for continuos deployment.

### Continuos integration

The Github Actions workflows can be found in the directory [.github/workflows/](./.github/workflows/). The purpose of these workflows is to run tests and ensure that the files abide by the linting and code formatting configurations.

### Continuos deployment

This project uses Vercel for continuos deployment. Beside from the production and beta environment, deployments are also made for every incoming PR, these will be deployed to a separate automatic generated domain using Vercel's Preview configuration. New features should be tested within the preview environment before added to the beta branch.

## Deployment environments

| Environment | Branch      | Domain                                             | Notes                                                                                                   |
| ----------- | ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Production  | `main`      | [partiguiden.nu](https://partiguiden.nu)           | User facing version of the website                                                                      |
| Beta        | `develop`   | [beta.partiguiden.nu](https://beta.partiguiden.nu) | Environment for testing new features / improvements                                                     |
| Preview     | PR branches | -                                                  | Environment that is used for incoming PR's, will deploy to an automatic generated url, hosted on Vercel |
