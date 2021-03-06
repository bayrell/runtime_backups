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
var MapInterface = require('./MapInterface.js');
var CoreObject = require('../CoreObject.js');
class ContextInterface{
	/**
	 * Register module
	 */
	registerModule(module_name){
	}
	/**
	 * Register module
	 * @param string provider_name
	 * @param string factory_name
	 * @param int type
	 */
	registerProvider(provider_name, factory_name, type){
	}
	/**
	 * Returns global provider
	 *
	 * @params string provider_name
	 * @return CoreObject
	 */
	createProvider(provider_name){
	}
	/**
	 * Set application locale
	 * @params string locale
	 */
	setLocale(locale){
	}
	/**
	 * Get application locale
	 * @params string locale
	 */
	getLocale(){
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
	}
}
module.exports = ContextInterface;