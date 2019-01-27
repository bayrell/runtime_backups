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
var OpTryCatchChilds = require('./OpTryCatchChilds.js');
class OpTryCatch extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(op_try, childs){
		if (op_try == undefined) op_try=null;
		if (childs == undefined) childs=null;
		super();
		this.op_try = op_try;
		this.childs = childs;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpTryCatch";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_try_catch";
		this.op_try = null;
		this.childs = null;
	}
	assignObject(obj){
		if (obj instanceof OpTryCatch){
			this.op = rtl._clone(obj.op);
			this.op_try = rtl._clone(obj.op_try);
			this.childs = rtl._clone(obj.childs);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_try_catch","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "op_try"){this.op_try = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.BaseOpCode");this.assignValueAfter("op_try",value,sender);}
		else if (variable_name == "childs"){this.childs = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.OpTryCatchChilds");this.assignValueAfter("childs",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "op_try") return this.op_try;
		else if (variable_name == "childs") return this.childs;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("op_try");
			names.push("childs");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpTryCatch;