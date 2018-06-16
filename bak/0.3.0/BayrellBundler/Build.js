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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var CoreObject = require('BayrellRtl').CoreObject;
var Bundler = require('./Bundler.js');
var BundlerPipe = require('./BundlerPipe.js');
class Build{
	static taskTranslateLib(folder, lang, callback){
		if (callback == undefined) callback=null;
		var source = folder + "/bay";
		var dest = folder + "/" + lang;
		return (new BundlerPipe()).then(Bundler.getFiles(source)).then(Bundler.filter((new Vector()).push("\\.bay$"))).then(Bundler.readFiles()).then(Bundler.translate(lang, callback)).then(Bundler.makeRelativePath(source)).then(Bundler.saveFiles(dest));
	}
}
module.exports = Build;