require([
    'bluebird',
    'kb_data_taxon',
    'kb_common_session',
    'yaml!config/config.yml'
], function (Promise, fTaxonApi, fSession, config) {
    'use strict';
    function showField(field, value) {
        var displayValue;
        if (value === undefined) {
            displayValue = '* undefined *';
        } else if (value === null) {
            displayValue = '* null * ';
        } else if (value.pop) {
            if (value.length === 0) {
                displayValue = '* empty array *';
            } else {
                displayValue = '<ol>' + value.map(function (x) {
                    return '<li>' + x + '</li>';
                }).join('\n') + '</ol>';
            }
        } else if (value === '') {
            displayValue = '* empty string *';
        } else {
            displayValue = value;
        }
        var node = document.querySelector('#result [data-field="' + field + '"]');
        if (node) {
            node.querySelector('[data-element="label"]').innerHTML = field;
            node.querySelector('[data-element="value"]').innerHTML = displayValue;
            node.querySelector('[data-element="type"]').innerHTML = (typeof value);
        }
    }
    function showStatus(msg) {
        document.querySelector('#status').innerHTML = msg;
    }
    function showError(err) {
        if (err.type) {
            document.querySelector('#error > [data-field="type"]').innerHTML = err.type;
        }
        if (err.title) {
            document.querySelector('#error > [data-field="title"]').innerHTML = err.title;
        }
        if (err.message) {
            document.querySelector('#error > [data-field="message"]').innerHTML = err.message;
        }
        if (err.suggestion) {
            document.querySelector('#error > [data-field="suggestion"]').innerHTML = err.suggestion;
        }
        if (err.errorObject) {
            console.log('ERROR OBJECT');
            console.log(err.errorObject);
        }
    }
    var methods = [
        'getParent',
        'getChildren',
        'getGenomeAnnotations',
        'getScientificLineage',
        'getScientificName',
        'getTaxonomicId',
        'getKingdom',
        'getDomain',
        'getGeneticCode',
        'getAliases'
    ];
    var content = '<table border="1">' + methods.map(function (method) {
        return '<tr data-field="' + method + '">' +
            '<td data-element="label"></td>' +
            '<td data-element="value"></td>' +
            '<td data-element="type"></td>' +
            '</tr>';
    }).join('\n') + '</table>';
    document.querySelector('#result').innerHTML = content;
    try {
        showStatus('Starting...');
        var session = fSession.make({
            cookieName: config.cookieName,
            loginUrl: config.loginUrl
        });
        showStatus('Logging in...');
        session.login({
            username: config.username,
            password: config.password
        })
            .then(function (kbSession) {
                return fTaxonApi({
                    ref: '993/329/2',
                    url: config.taxonUrl,
                    token: kbSession.token
                });
            })
            .then(function (taxon) {
                showStatus('Building methods to test...');
                var promises = methods.map(function (method) {
                    return new Promise(function (resolve, reject) {
                        taxon[method]()
                            .then(function (value) {
                                showField(method, value);
                                resolve();
                            })
                            .catch(function (err) {
                                showField(method, '* ERROR *');
                                console.log('ERROR in ' + method);
                                console.log(err);
                                //resolve();
                                reject(err);
                            });
                    });
                });
                showStatus('Running methods...');
                // return Promise.each(promises, function () { return true;});
                return Promise.settle(promises);
            })
            .then(function () {
                showStatus('done');
            })
            .catch(function (err) {
                showStatus('done, with error');
                showError({
                    type: 'Unknown', 
                    title: 'An unknown error',
                    suggestion: 'Check the console for the error object', 
                    errorObject: err
                });
            });
    } catch (ex) {
        showError(ex);
    }
});