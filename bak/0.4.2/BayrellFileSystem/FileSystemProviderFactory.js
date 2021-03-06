"use strict;"
/*!
 *  Bayrell File System Provider
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
var ContextObject = require('BayrellRuntime').ContextObject;
var ContextInterface = require('BayrellRuntime').Interfaces.ContextInterface;
var FactoryInterface = require('BayrellRuntime').Interfaces.FactoryInterface;
var FileSystemProvider = require('./FileSystemProvider.js');
class FileSystemProviderFactory extends ContextObject{
	getClassName(){return "BayrellFileSystem.FileSystemProviderFactory";}
	static getParentClassName(){return "ContextObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
	}
	/**
	 * Returns new Instance
	 */
	newInstance(context){
		var obj = new FileSystemProvider(context);
		return obj;
	}
}
FileSystemProviderFactory.__static_implements__ = [];
FileSystemProviderFactory.__static_implements__.push(FactoryInterface)
module.exports = FileSystemProviderFactory;