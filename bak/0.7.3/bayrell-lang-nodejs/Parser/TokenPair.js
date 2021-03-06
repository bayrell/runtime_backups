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
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var ParserToken = require('./ParserToken.js');
class TokenPair extends CoreObject{
	/**
	 * Current token
	 */
	/**
	 * Next token
	 */
	/**
	 * Constructor
	 */
	constructor(current_token, next_token){
		if (current_token == undefined) current_token=null;
		if (next_token == undefined) next_token=null;
		super();
		this.current_token = current_token;
		this.next_token = next_token;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.Parser.TokenPair";}
	static getCurrentNamespace(){return "BayrellLang.Parser";}
	static getCurrentClassName(){return "BayrellLang.Parser.TokenPair";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.current_token = null;
		this.next_token = null;
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = TokenPair;