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
class OpTryCatchChilds extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(op_type, op_ident, childs){
		if (op_type == undefined) op_type=null;
		if (op_ident == undefined) op_ident=null;
		if (childs == undefined) childs=null;
		super();
		this.op_type = op_type;
		this.op_ident = op_ident;
		this.childs = childs;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpTryCatchChilds";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_try_catch_childs";
		this.op_type = null;
		this.op_ident = null;
		this.childs = null;
	}
	assignObject(obj){
		if (obj instanceof OpTryCatchChilds){
			this.op = rtl._clone(obj.op);
			this.op_type = rtl._clone(obj.op_type);
			this.op_ident = rtl._clone(obj.op_ident);
			this.childs = rtl._clone(obj.childs);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_try_catch_childs","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "op_type"){this.op_type = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("op_type",value,sender);}
		else if (variable_name == "op_ident"){this.op_ident = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("op_ident",value,sender);}
		else if (variable_name == "childs"){this.childs = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.BaseOpCode");this.assignValueAfter("childs",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "op_type") return this.op_type;
		else if (variable_name == "op_ident") return this.op_ident;
		else if (variable_name == "childs") return this.childs;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("op_type");
			names.push("op_ident");
			names.push("childs");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpTryCatchChilds;