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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.IndexOutOfRange = function(context, prev)
{
	var __v0 = use("Runtime.rtl");
	var __v1 = use("Runtime.RuntimeConstant");
	use("Runtime.Exceptions.RuntimeException").call(this, __v0.translate("Index out of range", null, "", context), __v1.ERROR_INDEX_OUT_OF_RANGE, context, prev);
};
Runtime.Exceptions.IndexOutOfRange.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.IndexOutOfRange.prototype.constructor = Runtime.Exceptions.IndexOutOfRange;
Object.assign(Runtime.Exceptions.IndexOutOfRange.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Exceptions.IndexOutOfRange"))
		{
		}
		use("Runtime.Exceptions.RuntimeException").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		use("Runtime.Exceptions.RuntimeException").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Exceptions.RuntimeException").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
});
Object.assign(Runtime.Exceptions.IndexOutOfRange, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.IndexOutOfRange,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.IndexOutOfRange";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.IndexOutOfRange",
			"name": "Runtime.Exceptions.IndexOutOfRange",
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
});use.add(Runtime.Exceptions.IndexOutOfRange);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.IndexOutOfRange = Runtime.Exceptions.IndexOutOfRange;