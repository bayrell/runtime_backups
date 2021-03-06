"use strict;"
/*!
 *  Bayrell Template Engine
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
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
class OpComponent extends BaseOpCode{
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpChilds){
			this.name = rtl._clone(obj.name);
			this.alias = rtl._clone(obj.alias);
			this.args = rtl._clone(obj.args);
		}
		super.assign(obj);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpComponent";
	}
	/**
	 * Constructor
	 */
	constructor(name, alias, args){
		if (name == undefined) name="";
		if (alias == undefined) alias="";
		if (args == undefined) args=null;
		super();
		this.name = name;
		this.alias = alias;
		this.args = args;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellTemplate.OpCodes.OpComponent";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_component";
		this.name = "";
		this.alias = "";
		this.args = null;
	}
	assignObject(obj){
		if (obj instanceof OpComponent){
			this.op = rtl._clone(obj.op);
			this.name = rtl._clone(obj.name);
			this.alias = rtl._clone(obj.alias);
			this.args = rtl._clone(obj.args);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_component","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "name"){this.name = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode","","");this.assignValueAfter("name",value,sender);}
		else if (variable_name == "alias"){this.alias = rtl.correct(value,"string","","");this.assignValueAfter("alias",value,sender);}
		else if (variable_name == "args"){this.args = rtl.correct(value,"Map",null,"string");this.assignValueAfter("args",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "alias") return this.alias;
		else if (variable_name == "args") return this.args;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("name");
			names.push("alias");
			names.push("args");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpComponent;