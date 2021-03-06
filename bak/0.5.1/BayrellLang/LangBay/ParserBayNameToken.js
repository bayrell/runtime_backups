"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
var rs = require('bayrell-runtime-nodejs').rs;
var ParserToken = require('bayrell-parser-nodejs').ParserToken;
var ParserEOF = require('bayrell-parser-nodejs').Exceptions.ParserEOF;
var ParserExpected = require('bayrell-parser-nodejs').Exceptions.ParserExpected;
var EndOfStringExpected = require('../Exceptions/EndOfStringExpected.js');
class ParserBayNameToken extends ParserToken{
	getClassName(){return "BayrellLang.LangBay.ParserBayNameToken";}
	static getParentClassName(){return "ParserToken";}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_.", rs.strtolower(ch)) !== -1;
	}
}
ParserBayNameToken.TOKEN_NONE = "none";
ParserBayNameToken.TOKEN_BASE = "base";
module.exports = ParserBayNameToken;