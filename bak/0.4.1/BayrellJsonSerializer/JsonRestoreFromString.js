"use strict;"
/*!
 *  Bayrell Json Serializer
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
var CoreObject = require('BayrellRuntime').CoreObject;
var SerializeInterface = require('BayrellRuntime').Interfaces.SerializeInterface;
class JsonRestoreFromString extends CoreObject{
	getClassName(){return "BayrellJsonSerializer.JsonRestoreFromString";}
	/**
	 * Restore object from string
	 * @param string s
	 */
	restoreFromString(s){
	}
}
module.exports = JsonRestoreFromString;