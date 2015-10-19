/*global define*/
/*jslint white: true*/
define([], function () {
    'use strict';
    function showResult(s) {
        document.querySelector('#result').innerHTML = s;
    }
    function hideError() {
        document.querySelector('#error').style.display = 'none';
    }
    function showErrorField(err, field) {
        if (err[field]) {
            // document.querySelector('#error  [data-field="' + field + '"]').style.display = 'block';
            document.querySelector('#error  [data-field="' + field + '"] [data-element="value"]').innerHTML = err[field];
        } else {
            // document.querySelector('#error  [data-field="' + field + '"]').style.display = 'none';
        }
    }
    function findProp(obj, name, value) {
        var prototype = Object.getPrototypeOf(obj);
        while (prototype) {
            if (prototype.name === value) {
                return true
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        return false;
    }
    function showField(containerId, fieldName, value) {
        var container = document.querySelector('#' + containerId);
        if (!container) {
            return;
        }
        var field = container.querySelector('[data-field="' + fieldName + '"]');
        if (!field) {
            return;
        }
        field.innerHTML = String(value);
    }
    function showError(err) {
        showField('result', 'status', 'Error');
        document.querySelector('#error').style.display = 'block';
        ['type', 'title', 'reason', 'message', 'suggestions'].forEach(function (name) {
            showErrorField(err, name);
        });

        if (err.errorObject) {
            console.log('ERROR OBJECT');
            console.log(err.errorObject);
        } else {
            console.log('ERROR');
            console.log(err);
        }
    }
    return {
        showResult: showResult,
        hideError: hideError,
        showErrorField: showErrorField,
        findProp: findProp,
        showField: showField,
        showError: showError
    };
});