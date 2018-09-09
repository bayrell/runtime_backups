"use strict;"
/*!
 *  Bayrell Bundler
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
var CloneableInterface = require('BayrellRuntime').Interfaces.CloneableInterface;
class BundleFile extends CoreObject{
	getClassName(){return "BayrellBundler.BundleFile";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.path = "";
		this.content = "";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(CloneableInterface);
	}
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new BundleFile();
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof BundleFile){
			this.path = obj.path;
			this.content = obj.content;
		}
		super.assign(obj);
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		this.assign(obj);
	}
	/**
	 * Constructor
	 */
	constructor(path, content){
		if (path == undefined) path="";
		if (content == undefined) content="";
		super();
		this.path = path;
		this.content = content;
	}
}
BundleFile.__static_implements__ = [];
BundleFile.__static_implements__.push(CloneableInterface)
module.exports = BundleFile;