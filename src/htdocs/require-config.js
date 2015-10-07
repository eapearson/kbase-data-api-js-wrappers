'use strict';

require.config({
    baseUrl: '/',
    catchError: true,
    onError: function (err) {
        alert("RequireJS Error:" + err);
    },
    paths: {
        // External Dependencies
        // ----------------------
        jquery: 'bower_components/jquery/jquery',
        bluebird: 'bower_components/bluebird/bluebird',
        thrift: 'bower_components/thrift/thrift',

        text: 'bower_components/requirejs-text/text',
        yaml: 'bower_components/require-yaml/yaml',
        'js-yaml': 'bower_components/js-yaml/js-yaml',

        // NB the taxon thrift libraries are generated, wrapped, and installed
        // by grunt tasks.
        taxon_types: 'js/thrift/taxon_types',
        taxon: 'js/thrift/TaxonService',
        
        // The main productd
        kb_data_taxon: 'js/Taxon',
        
        kb_common_cookie: 'bower_components/kbase-common-js/cookie',
        kb_common_logger: 'bower_components/kbase-common-js/logger',
        kb_common_session: 'bower_components/kbase-common-js/session'
    },
    shim: {
    },
    map: {
        '*': {
            'promise': 'bluebird'
        }
    }
});

