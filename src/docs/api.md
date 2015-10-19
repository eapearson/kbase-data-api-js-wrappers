# Taxon API

## Overview

## Module

## Usage

```
var objectRef = '993/329/2';
var taxonUrl = 'http://test.kbase.us/taxon';
var token = myFunctionToGetAToken();
var timeout = 10000;
var taxon = Taxon({
    ref: objectRef,
    url: taxonUrl,
    token: token,
    timeout: timeout
});
var name = taxon.getScientificName();
```

## Factory

## Methods



### getParent



### getChildren

### getGenomeAnnotations

### getScientificLineage

### getScientificName

### getTaxonomicId

### getKingdom

### getDomain

### getGeneticCode

### getAliases
