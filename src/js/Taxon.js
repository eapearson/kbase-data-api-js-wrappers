/**
 * @module Taxon
 * @author Erik Pearson
 * @version 0.1.0
 * @param {TaxonLibrary} taxon
 * @param {TriftLibrary} Thrift
 * @param {BluebirdPromise} Promise
 * @returns {Taxon_L12.factory}
 */
/*global define*/
/*jslint white: true, browser: true*/
define([
    'bluebird', 
    'taxon_service',
    'thrift',
    
    // These don't have representations. Loading them causes the Thrift module
    // to be enhanced with additional properties (typically just a single
    //  property, the new capability added.)
    'thrift_transport_xhr',
    'thrift_protocol_binary'
], function (Promise, taxon, Thrift) {
    'use strict';
    // API Implementation
    /*
     * Taxon wrapps a single instance of "taxon".
     * thrift api does not work this way, it is a set of functions
     */

    /**
     * 
     * @constructor
     * @alias module:Taxon
     */
    var Taxon = function (config) {
        var objectReference,
            dataAPIUrl,
            authToken,
            timeout;
           
        // Construction argument contract enforcement, throw useful exceptions
        if (!config) {
            throw {
                type: 'ArgumentError',
                title: 'Configuration object missing',
                suggestion: 'This is an API usage error'
            };
        }
        objectReference = config.ref;
        if (!objectReference) {
            throw {
                type: 'ArgumentError',
                title: 'Object reference "ref" missing',
                suggestion: 'The object reference is provided as in the "ref" argument property'
            };
        }
        dataAPIUrl = config.url;
        if (!dataAPIUrl) {
            throw {
                type: 'ArgumentError',
                message: 'Cannot find a url for the data api',
                suggestion: 'The url is provided as in the "url" argument property'
            };

        }
        authToken = config.token;
        if (!authToken) {
            throw {
                type: 'ArgumentError',
                message: 'No Authorization found; Authorization is required for the data api',
                suggestion: 'The authorization is provided in the "token" argument" property'
            };
        }        
        timeout = config.timeout;
        if (!timeout) {
            timeout = 30000;
        }

        /**
         * Creates and returns an instance of the Taxon Thrift client. Note that
         * this is 
         * 
         * @returns {Taxon_L22.taxon.thrift_serviceClient}
         * @private
         */
        function client() {
             try {
                var transport = new Thrift.TXHRTransport(dataAPIUrl, {timeout: timeout}),
                    protocol = new Thrift.TBinaryProtocol(transport),
                    thriftClient = new taxon.thrift_serviceClient(protocol);
                return thriftClient;
            } catch (ex) {
                throw {
                    type: 'ThriftError',
                    message: 'An error was encountered creating the thrift client objects',
                    suggestion: 'This could be a configuration or runtime error. Please consult the console for the error object',
                    errorObject: ex
                };
            }
        }


        /**
         * Get the object reference as a string
         * @returns {String}
         * @public
         */
        function getParent() {
            return Promise.resolve(client().get_parent(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Array<String>}
         */
        function getChildren() {
            return Promise.resolve(client().get_children(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Array<String>}
         */
        function getGenomeAnnotations() {
            return Promise.resolve(client().get_genome_annotations(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Array<String>}
         */
        function getScientificLineage() {
            return Promise.resolve(client().get_scientific_lineage(authToken, objectReference, true))
                .then(function (data) {
                    return data.split(';').map(function (x) {
                        return x.trim(' ');
                    });
                });
        }

        /**
         * 
         * @returns {String}
         */
        function getScientificName() {
            return Promise.resolve(client().get_scientific_name(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Number}
         */
        function getTaxonomicId() {
            return Promise.resolve(client().get_taxonomic_id(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {String}
         */
        function getKingdom() {
            return Promise.resolve(client().get_kingdom(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {String}
         */
        function getDomain() {
            return Promise.resolve(client().get_domain(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Number}
         */
        function getGeneticCode() {
            return Promise.resolve(client().get_genetic_code(authToken, objectReference, true));
        }

        /**
         * 
         * @returns {Array<String>}
         */
        function getAliases() {
            return Promise.resolve(client().get_aliases(authToken, objectReference, true));
        }

        // API
        return Object.freeze({
            getParent: getParent,
            getChildren: getChildren,
            getGenomeAnnotations: getGenomeAnnotations,
            getScientificLineage: getScientificLineage,
            getScientificName: getScientificName,
            getTaxonomicId: getTaxonomicId,
            getKingdom: getKingdom,
            getDomain: getDomain,
            getGeneticCode: getGeneticCode,
            getAliases: getAliases
        });

    };

    return Taxon;
});