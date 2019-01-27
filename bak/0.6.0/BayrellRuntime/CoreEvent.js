"use strict;"
/*!
 *  Bayrell Runtime Library
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
var CoreObject = require('./CoreObject.js');
var CoreStruct = require('./CoreStruct.js');
var rtl = require('./rtl.js');
var CloneableInterface = require('./Interfaces/CloneableInterface.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
class CoreEvent extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreEvent";}
	static getParentClassName(){return "CoreStruct";}
	_init(){
		super._init();
		this.sender = null;
	}
	assignObject(obj){
		if (obj instanceof CoreEvent){
			this.sender = rtl._clone(obj.sender);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "sender"){this.sender = rtl.correct(value,"Runtime.CoreObject",null,"");this.assignValueAfter("sender",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "sender") return this.sender;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("sender");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = CoreEvent;