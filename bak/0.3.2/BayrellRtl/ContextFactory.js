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
var Context = require('./Context.js');
var CoreObject = require('./CoreObject.js');
var rtl = require('./Lib/rtl.js');
var Vector = require('./Types/Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
class ContextFactory extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns new Instance
	 */
	newInstance(){
		var context = new Context();
		/* Register modules */
		for (var i = 0; i < this._modules.count(); i++){
			context.registerModule(this._modules.item(i));
		}
		/* Init context */
		context.init();
		return context;
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		this._modules.push(module_name);
		return this;
	}
	/**
	 * Register global interface
	 * @params Vector<string> modules
	 * @return ContextInterface
	 */
	static createContext(modules){
		var factory = new ContextFactory();
		modules.each((module) => {
			factory.registerModule(module);
		});
		var context = factory.newInstance();
		return context;
	}
	/**
	 * Register global interface
	 * @params Vector<string> modules
	 * @return ContextInterface
	 */
	static registerGlobalContext(modules){
		var context = ContextFactory.createContext(modules);
		rtl.setGlobalContext(context);
		return context;
	}
}
module.exports = ContextFactory;