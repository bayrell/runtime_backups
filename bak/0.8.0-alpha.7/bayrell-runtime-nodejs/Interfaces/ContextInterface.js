"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
class ContextInterface{
	/**
	 * Register module
	 */
	registerModule(module_name){
	}
	/**
	 * Returns provider
	 * @params string provider_name
	 * @return CoreStruct
	 */
	getProvider(provider_name){
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
	/*string translate(string message, Map params = null, string locale = "");*/
	/**
	 * For current context
	 * @return ContextInterface
	 */
	fork(){
	}
	/**
	 * Realease context resources
	 */
	release(){
	}
}
module.exports = ContextInterface;