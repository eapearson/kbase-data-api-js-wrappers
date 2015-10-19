/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * A string containing a reference to an object. 
 * 
 * The object reference points to a specific data object within a KBase runtime.
 * Note that the object reference is only operational within a specific runtime,
 * such as Dev, CI, Staging, or Production.
 * 
 * The KBase object reference can take two forms:
 * workspace/id
 * workspace/id/version
 * 
 * The canonical refeference format is the latter, in that it maps to a specific
 * object. The first form maps to the "most recent" version of an object. The
 * object may be inspected through the data api to determine the specific
 * version.
 * 
 * @typedef {String} ObjectReference
 */
