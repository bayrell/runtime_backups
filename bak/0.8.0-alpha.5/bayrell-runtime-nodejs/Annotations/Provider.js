"use strict;"
var use = require('bayrell').use;
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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Annotations == 'undefined') Runtime.Annotations = {};
Runtime.Annotations.Provider = function()
{
	use("Runtime.Annotations.Entity").apply(this, arguments);
};
Runtime.Annotations.Provider.prototype = Object.create(use("Runtime.Annotations.Entity").prototype);
Runtime.Annotations.Provider.prototype.constructor = Runtime.Annotations.Provider;
Object.assign(Runtime.Annotations.Provider.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Annotations.Provider"))
		{
		}
		use("Runtime.Annotations.Entity").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		use("Runtime.Annotations.Entity").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Annotations.Entity").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Annotations.Provider";
	},
});
Object.assign(Runtime.Annotations.Provider, use("Runtime.Annotations.Entity"));
Object.assign(Runtime.Annotations.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Annotations.Entity";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Annotations.Provider",
			"name": "Runtime.Annotations.Provider",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.Annotations.Provider);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.Provider = Runtime.Annotations.Provider;