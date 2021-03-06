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
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
class OpValue2 extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(value1, value2){
		if (value1 == undefined) value1=null;
		if (value2 == undefined) value2=null;
		super();
		this.value1 = value1;
		this.value2 = value2;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpValue2";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_value2";
		this.value1 = null;
		this.value2 = null;
	}
	assignObject(obj){
		if (obj instanceof OpValue2){
			this.op = rtl._clone(obj.op);
			this.value1 = rtl._clone(obj.value1);
			this.value2 = rtl._clone(obj.value2);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = rtl.correct(value,"string","op_value2","");
		else if (variable_name == "value1")this.value1 = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else if (variable_name == "value2")this.value2 = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "value1") return this.value1;
		else if (variable_name == "value2") return this.value2;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("value1");
			names.push("value2");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpValue2;