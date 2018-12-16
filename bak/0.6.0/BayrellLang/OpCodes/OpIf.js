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
var OpIfElse = require('./OpIfElse.js');
class OpIf extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(condition, if_true, if_false, if_else){
		if (condition == undefined) condition=null;
		if (if_true == undefined) if_true=null;
		if (if_false == undefined) if_false=null;
		super();
		this.condition = condition;
		this.if_true = if_true;
		this.if_false = if_false;
		this.if_else = if_else;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpIf";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_if";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
		this.if_else = null;
	}
	assignObject(obj){
		if (obj instanceof OpIf){
			this.op = rtl._clone(obj.op);
			this.condition = rtl._clone(obj.condition);
			this.if_true = rtl._clone(obj.if_true);
			this.if_false = rtl._clone(obj.if_false);
			this.if_else = rtl._clone(obj.if_else);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_if", "");
		else if (variable_name == "condition") this.condition = rtl.correct(value, "BayrellLang.OpCodes.BaseOpCode", null, "");
		else if (variable_name == "if_true") this.if_true = rtl.correct(value, "Vector", null, "BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "if_false") this.if_false = rtl.correct(value, "Vector", null, "BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "if_else") this.if_else = rtl.correct(value, "Vector", null, "BayrellLang.OpCodes.OpIfElse");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "if_true") return this.if_true;
		else if (variable_name == "if_false") return this.if_false;
		else if (variable_name == "if_else") return this.if_else;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("op");
		names.push("condition");
		names.push("if_true");
		names.push("if_false");
		names.push("if_else");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpIf;