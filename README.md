# Javascript API Wrappers for the Data API

## Docs

- install local service
- generated api docs
- examples

## Usage

These notes may be a bit out of date, hang on.

- prepare dev env
    - git
    - nodejs
    - bower
    - thrift
    
- clone the repo
- update dependencies
    - npm install
    - bower install or bower update
- build it
    - grunt build
- update the runtime/config/test.yml file:
    - add your own preferred username + password for testing
    - point to the taxon data api server of your choice
    - etc.
- run grunt build again to copy the new config file into the build
    - subsequent builds will not touch the edited runtime/config/test.hml file
- if you need to, stand up a taxon service somewhere and point your config to it, rebuild.
