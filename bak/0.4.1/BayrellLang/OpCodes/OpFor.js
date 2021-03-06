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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var BaseOpCode = require('./BaseOpCode.js');
class OpFor extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpFor";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_for";
		this.loop_condition = null;
		this.loop_init = null;
		this.loop_inc = null;
		this.childs = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = value;
		else if (variable_name == "loop_condition") this.loop_condition = value;
		else if (variable_name == "loop_init") this.loop_init = value;
		else if (variable_name == "loop_inc") this.loop_inc = value;
		else if (variable_name == "childs") this.childs = value;
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "loop_condition") return this.loop_condition;
		else if (variable_name == "loop_init") return this.loop_init;
		else if (variable_name == "loop_inc") return this.loop_inc;
		else if (variable_name == "childs") return this.childs;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("loop_condition");
		names.push("loop_init");
		names.push("loop_inc");
		names.push("childs");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpFor";
	}
	/**
	 * Constructor
	 */
	constructor(loop_condition, loop_init, loop_inc, childs){
		if (loop_condition == undefined) loop_condition=null;
		if (loop_init == undefined) loop_init=null;
		if (loop_inc == undefined) loop_inc=null;
		if (childs == undefined) childs=null;
		super();
		this.loop_condition = loop_condition;
		this.loop_init = loop_init;
		this.loop_inc = loop_inc;
		this.childs = childs;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpFor;