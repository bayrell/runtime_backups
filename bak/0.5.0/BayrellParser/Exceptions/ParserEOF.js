"use strict;"
/*!
 *  Bayrell Parser Library.
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Utils = require('bayrell-runtime-nodejs').Utils;
var ParserError = require('./ParserError.js');
var ParserConstant = require('../ParserConstant.js');
class ParserEOF extends ParserError{
	getClassName(){return "BayrellParser.Exceptions.ParserEOF";}
	static getParentClassName(){return "ParserError";}
	constructor(context, prev){
		if (prev == undefined) prev=null;
		if (context == null){
			context = Utils.globalContext();
		}
		super(context, context.translate("ERROR_PARSER_EOF"), ParserConstant.ERROR_PARSER_EOF, prev);
	}
}
module.exports = ParserEOF;