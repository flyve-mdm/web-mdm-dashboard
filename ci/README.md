# Continuous Integration script

Here is placed the bash script required to build, test and deploy the app.

## Workflow description

### On develop and feature branch

- Build: install dependencies, configure, pull and push Transifex translations
- Test: install dependencies, start server in background, run unit, end to end, sonarwhal tests, validate html.

### On release branch

- Build: install dependencies, configure, pull and push Transifex translations
- Test: install dependencies, start server in background, run unit, end to end, sonarwhal tests, validate html.
- Screenshots: install dependencies, configure git, create screenshots
- Documentation: install dependencies, configure git, create documentation
- Coverage: install dependencies, configure git, create code coverage
- Release: install dependencies, configure git, create zip, create GitHub release

## Environment variables

On this project we use the following variables:

- API_LINK             -> Link to glpi apirest
- BUGSNAG_KEY          -> Key for Bugsnag
- DEMO_TOKEN           -> Token for demo plugin
- GITHUB_EMAIL         -> GitHub Email
- GITHUB_USER          -> GitHub User
- GITHUB_TOKEN         -> GitHub Token
- PLUGIN_TOKEN         -> GLPI User Token
- TRANSIFEX_USER       -> User of Transifex
- TRANSIFEX_API_TOKEN  -> API Token of Transifex

## Libraries

We use the following:

- [conventional-github-releaser](https://github.com/conventional-changelog/releaser-tools)
- [gh-pages](https://github.com/tschaub/gh-pages)
- [node-github-releaser](https://github.com/miyajan/node-github-release)
- [standard-version](https://github.com/conventional-changelog/standard-version)