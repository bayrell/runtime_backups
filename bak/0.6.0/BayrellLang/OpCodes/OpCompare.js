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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
class OpCompare extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(condition, value1, value2){
		if (condition == undefined) condition="";
		if (value1 == undefined) value1=null;
		if (value2 == undefined) value2=null;
		super();
		this.condition = condition;
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
	getClassName(){return "BayrellLang.OpCodes.OpCompare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_compare";
		this.condition = "";
		this.value1 = null;
		this.value2 = null;
	}
	assignObject(obj){
		if (obj instanceof OpCompare){
			this.op = rtl._clone(obj.op);
			this.condition = rtl._clone(obj.condition);
			this.value1 = rtl._clone(obj.value1);
			this.value2 = rtl._clone(obj.value2);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_compare","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "condition"){this.condition = rtl.correct(value,"string","","");this.assignValueAfter("condition",value,sender);}
		else if (variable_name == "value1"){this.value1 = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("value1",value,sender);}
		else if (variable_name == "value2"){this.value2 = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("value2",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "value1") return this.value1;
		else if (variable_name == "value2") return this.value2;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("condition");
			names.push("value1");
			names.push("value2");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpCompare;