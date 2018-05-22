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
var rtl = require('./Lib/rtl.js');
var CoreObject = require('./CoreObject.js');
var ContextObject = require('./ContextObject.js');
var Map = require('./Types/Map.js');
var Vector = require('./Types/Vector.js');
class NewInstanceContainer extends ContextObject{
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		this._values = new Map();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Set value
	 * @params string key - key
	 * @params mixed value - value
	 */
	set(key, value){
		this._values.set(key, value);
	}
	/**
	 * Get value by key
	 * @params string key - key
	 * @params mixed default_value - Default value if not exists
	 * @return mixed value
	 */
	get(key, default_value){
		return this._values.get(key, default_value);
	}
	/**
	 * Return true if key is exists
	 * @params string key - Key
	 * @return boolean
	 */
	has(key){
		return this._values.contains(key);
	}
}
module.exports = NewInstanceContainer;