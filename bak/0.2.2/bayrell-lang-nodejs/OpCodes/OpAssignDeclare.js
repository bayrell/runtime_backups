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
var rtl = require('BayrellRtl').Lib.rtl;
var BaseOpCode = require('./BaseOpCode.js');
var OpFlags = require('./OpFlags.js');
class OpAssignDeclare extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_assign_declare";
		this.tp = null;
		this.name = null;
		this.value = null;
		this.flags = null;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpAssignDeclare){
			this.tp = rtl._clone(obj.tp);
			this.name = rtl._clone(obj.name);
			this.value = rtl._clone(obj.value);
			this.flags = rtl._clone(obj.flags);
		}
		super.assign(obj);
	}
	/**
	 * Read is Flag
	 */
	isFlag(name){
		if (this.flags == null){
			return false;
		}
		if (!OpFlags.hasFlag(name)){
			return false;
		}
		return this.flags.takeValue(name);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpAssignDeclare";
	}
	/**
	 * Constructor
	 */
	constructor(tp, name, value){
		if (tp == undefined) tp=null;
		if (name == undefined) name=null;
		if (value == undefined) value=null;
		super();
		this.tp = tp;
		this.name = name;
		this.value = value;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns name of variables to serialization
	 * @return Vector<string>
	 */
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("type");
		names.push("ident");
		names.push("value");
		names.push("flags");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "type"){
			return this.tp;
		}
		else if (variable_name == "ident"){
			return this.ident;
		}
		else if (variable_name == "value"){
			return this.value;
		}
		else if (variable_name == "flags"){
			return this.flags;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "type"){
			this.tp = value;
		}
		else if (variable_name == "ident"){
			this.ident = value;
		}
		else if (variable_name == "value"){
			this.value = value;
		}
		else if (variable_name == "flags"){
			this.flags = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
}
module.exports = OpAssignDeclare;