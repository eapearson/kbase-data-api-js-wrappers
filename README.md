# Javascript API Wrappers for the Data API

## Usage

- clone the repo
- update dependencies
    - bower install or bower update
    - npm install
- build it
    - grunt build
- update the runtime/config/test.yml file:
    - add your own preferred username + password for testing
    - point to the taxon data api server of your choice
    - etc.
- run grunt build again to copy the new config file into the build
    - subsequent builds will not touch the edited runtime/config/test.hml file
- if you need to, stand up a taxon service somewhere and point your config to it, rebuild.
