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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var ParserError = require('bayrell-parser-nodejs').Exceptions.ParserError;
var LangConstant = require('../LangConstant.js');
class HexNumberExpected extends ParserError{
	constructor(line, col, context, prev){
		if (prev == undefined) prev=null;
		if (context == null){
			context = RuntimeUtils.globalContext();
		}
		super(context.translate("ERROR_PARSER_HEX_NUMBER_EXPECTED"), LangConstant.ERROR_PARSER_HEX_NUMBER_EXPECTED, context, prev);
		this.line = line;
		this.pos = col;
		this.buildMessage();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Exceptions.HexNumberExpected";}
	static getParentClassName(){return "ParserError";}
}
module.exports = HexNumberExpected;