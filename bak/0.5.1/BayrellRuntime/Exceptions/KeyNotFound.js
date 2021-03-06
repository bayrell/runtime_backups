"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('../rtl.js');
var RuntimeConstant = require('../RuntimeConstant.js');
var RuntimeUtils = require('../RuntimeUtils.js');
var RuntimeException = require('./RuntimeException.js');
var ContextInterface = require('../Interfaces/ContextInterface.js');
class KeyNotFound extends RuntimeException{
	getClassName(){return "Runtime.Exceptions.KeyNotFound";}
	static getParentClassName(){return "RuntimeException";}
	constructor(key, context, prev){
		if (context == undefined) context=null;
		if (prev == undefined) prev=null;
		/* RuntimeUtils::translate("ERROR_KEY_NOT_FOUND", null, "", context),  */
		super("Key '"+rtl.toString(key)+"' not found", RuntimeConstant.ERROR_KEY_NOT_FOUND, context, prev);
	}
}
module.exports = KeyNotFound;