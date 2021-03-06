;
(function (){
var CH_BACKSPACE=8;
var CH_TAB=9;
var CH_ENTER=13;
var CH_SHIFT=16;
var CH_CTRL=17;
var CH_ALT=18;
var CH_PAUSE_BREAK=19;
var CH_CAPS_LOCK=20;
var CH_ESCAPE=27;
var CH_PAGE_UP=33;
var CH_PAGE_DOWN=34;
var CH_END=35;
var CH_HOME=36;
var CH_LEFT_ARROW=37;
var CH_UP_ARROW=38;
var CH_RIGHT_ARROW=39;
var CH_DOWN_ARROW=40;
var CH_INSERT=45;
var CH_DELETE=46;
var CH_0=48;
var CH_1=49;
var CH_2=50;
var CH_3=51;
var CH_4=52;
var CH_5=53;
var CH_6=54;
var CH_7=55;
var CH_8=56;
var CH_9=57;
var CH_A=65;
var CH_B=66;
var CH_C=67;
var CH_D=68;
var CH_E=69;
var CH_F=70;
var CH_G=71;
var CH_H=72;
var CH_I=73;
var CH_J=74;
var CH_K=75;
var CH_L=76;
var CH_M=77;
var CH_N=78;
var CH_O=79;
var CH_P=80;
var CH_Q=81;
var CH_R=82;
var CH_S=83;
var CH_T=84;
var CH_U=85;
var CH_V=86;
var CH_W=87;
var CH_X=88;
var CH_Y=89;
var CH_Z=90;
var CH_LEFT_WINDOW_KEY=91;
var CH_RIGHT_WINDOW_KEY=92;
var CH_SELECT_KEY=93;
var CH_NUMPAD_0=96;
var CH_NUMPAD_1=97;
var CH_NUMPAD_2=98;
var CH_NUMPAD_3=99;
var CH_NUMPAD_4=100;
var CH_NUMPAD_5=101;
var CH_NUMPAD_6=102;
var CH_NUMPAD_7=103;
var CH_NUMPAD_8=104;
var CH_NUMPAD_9=105;
var CH_MULTIPLY=106;
var CH_ADD=107;
var CH_SUBTRACT=109;
var CH_DECIMAL_POINT=110;
var CH_DIVIDE=111;
var CH_F1=112;
var CH_F2=113;
var CH_F3=114;
var CH_F4=115;
var CH_F5=116;
var CH_F6=117;
var CH_F7=118;
var CH_F8=119;
var CH_F9=120;
var CH_F10=121;
var CH_F11=122;
var CH_F12=123;
var CH_NUM_LOCK=144;
var CH_SCROLL_LOCK=145;
var CH_SEMICOLON=186;
var CH_EQUAL_SIGN=187;
var CH_COMMA=188;
var CH_DASH=189;
var CH_PERIOD=190;
var CH_FORWARD_SLASH=191;
var CH_GRAVE_ACCENT=192;
var CH_OPEN_BRACKET=219;
var CH_BACK_SLASH=220;
var CH_CLOSE_BRAKET=221;
var CH_SINGLE_QUOTE=222;
var CH_SHIFT=1000;
var CH_ALT=2000;
var CH_CTRL=4000;
function KeyAction(propagate,callback){
  var self=this;
  self.construct=function(propagate,callback){
    this.propagate=propagate;
    this.run=callback;
  };
  self.construct(propagate,callback);
  return self;
}
function KeyHandler(){
  var self=this;
  self.construct=function(){
    this.callbacks=Array();
  };
  self.addAction=function(callback,propagate,keycode){
    if(keycode!=undefined){
      var item=new KeyAction(propagate,callback);
      this.callbacks[keycode]=item;
    }else {
      alert("键盘事件函数没有定义。");
    }
  };
  self.runAction=function(keycode){
    if(keycode!=undefined){
      var action=this.callbacks[keycode];
      if(action==undefined){
        return true;
      }else {
        if(action.run){
          action.run();
        }
        return action.propagate;
      }
    }else {
      alert("键盘事件函数没有定义。");
    }
    return true;
  };
  self.keyHandler=function(e){
    e?e:e=window.event;
    var propagate=true;
    var targ=e?e:window.event;
    key=targ.keyCode?targ.keyCode:targ.charCode;
    if(targ.ctrlKey){
      key+=CH_CTRL;
    }
    if(targ.altKey){
      key+=CH_ALT;
    }
    if(targ.shiftKey){
      key+=CH_SHIFT;
    }
    propagate=self.runAction(key);
    if(!propagate){
      if(e.stopPropagation){
        e.stopPropagation();
      }else {
        e.cancelBubble=true;
      }
    }
    return propagate;
  };
  self.construct();
  return self;
}
function StyleHandler(configs){
  var self=this;
  self.loadDefaultFont=function(fontStyle){
    var defaultFont=new FontStyle(fontStyle.fontId,fontStyle.size,fontStyle.color,fontStyle.bold,fontStyle.italic,fontStyle.underline,fontStyle.align,fontStyle.valign);
    this.fontStyles[defaultFont.id]=defaultFont;
    this.fontsIds[0]=defaultFont;
  };
  self.construct=function(configs){
    this.fontStyles=new Array();
    this.fontsIds=new Array();
    this.layers=new Array();
    this.loadDefaultFont(configs.defaultFontStyle);
  };
  self.getFontName=function(fontId){
    return window.Fonts[fontId];
  };
  self.getFontStyle=function(styleId){
    var style=this.fontStyles[styleId];
    if(style==undefined){
      style=this.fontStyles[0];
    }
    return style;
  };
  self.getFontStyleById=function(index){
    var style=this.fontsIds[index];
    if(style==undefined){
      style=this.fontsIds[0];
    }
    return style;
  };
  self.getFontStyleIdByStyle=function(fontStyle){
    return this.getFontStyleId(fontStyle.font,fontStyle.size,fontStyle.color,fontStyle.bold,fontStyle.italic,fontStyle.underline,fontStyle.align,fontStyle.valign);
  };
  self.changeFontStyleProp=function(fontStyleId,prop,value){
    var fs=this.getFontStyleById(fontStyleId);
    var oldValue=fs[prop];
    fs[prop]=value;
    var newId=this.getFontStyleId(fs.font,fs.size,fs.color,fs.bold,fs.italic,fs.underline,fs.align,fs.valign);
    fs[prop]=oldValue;
    return newId;
  };
  self.addFontStyle=function(id,font,size,color,bold,italic,underline,align,valign){
    var fstyle=new FontStyle(font,size,color,bold,italic,underline,align,valign);
    this.fontStyles[fstyle.id]=fstyle;
    this.fontsIds[id]=fstyle;
  };
  self.getFontStyleId=function(font,size,color,bold,italic,underline,align,valign){
    var id=font+"|"+size+"|"+color+"|"+bold+"|"+italic+"|"+underline+"|"+align+"|"+valign;
    if(this.fontStyles[id]){
      return this.fontsIds.indexOf(this.fontStyles[id]);
    }else {
      var fstyle=new FontStyle(font,size,color,bold,italic,underline,align,valign);
      this.fontStyles[id]=fstyle;
      var newId=this.fontsIds.length;
      this.fontsIds[newId]=fstyle;
      return newId;
    }
  };
  self.getAlignName=function(align){
    switch(parseInt(align)){
    case 0:
      return "general";
      break ;
    case 1:
      return "left";
      break ;
    case 2:
      return "center";
      break ;
    case 3:
      return "right";
      break ;
    default:
      return "general";
      break ;
    }
  };
  self.getAlignId=function(alignId){
    switch(alignId){
    case "general":
      return 0;
      break ;
    case "left":
      return 1;
      break ;
    case "center":
      return 2;
      break ;
    case "right":
      return 3;
      break ;
    default:
      return 0;
      break ;
    }
  };
  self.getValignName=function(valign){
    switch(parseInt(valign)){
    case 0:
      return "bottom";
      break ;
    case 1:
      return "middle";
      break ;
    case 2:
      return "top";
      break ;
    default:
      return "bottom";
      break ;
    }
  };
  self.getValignId=function(valign){
    switch(valign){
    case "bottom":
      return 0;
      break ;
    case "middle":
      return 1;
      break ;
    case "top":
      return 2;
      break ;
    default:
      return 0;
      break ;
    }
  };
  self.getAllFontsStyles=function(){
    return this.fontsIds;
  };
  self.construct(configs);
}
function FontStyle(font,size,color,bold,italic,underline,align,valign){
  var self=this;
  self.construct=function(font,size,color,bold,italic,underline,align,valign){
    this.id=font+"|"+size+"|"+color+"|"+bold+"|"+italic+"|"+underline+"|"+align+"|"+valign;
    this.font=font;
    this.size=size;
    this.color=color;
    this.bold=bold;
    this.italic=italic;
    this.underline=underline;
    this.align=align;
    this.valign=valign;
  };
  self.construct(font,size,color,bold,italic,underline,align,valign);
  return self;
}
function LayoutStyle(bgcolor,border){
  self.contructor=function(){
  };
  return self;
}
function BlockStyle(wrap,valign,halign){
  self.contructor=function(){
    this.id=halign+"|"+valign+"|"+wrap;
    this.wrap=wrap;
    this.valign=valign;
    this.halign=halign;
  };
  return self;
}
function NameHandler(){
  var self=this;
  self.getRangeCells=function(row,col){
    if(parseInt(row)>self.maxRows){
      return undefined;
    }
    col=(col=="")?undefined:this.getColumnIndex(col);
    if(col!=undefined){
      if(col>self.maxCols){
        return undefined;
      }
    }
    row=(row=="")?undefined:row-1;
    return {row:row,col:col};
  };
  self.getSimpleRangeAddress=function(address){
    var regArray=/^([A-Z]*)(\d*)$/.exec(address);
    if(regArray){
      return this.getRangeCells(regArray[2],regArray[1]);
    }
  };
  self.getRangeAddress=function(address){
    address=address.toUpperCase();
    var ranges=address.split(":");
    var range=new Range();
    if(ranges.length>2){
      return undefined;
    }
    if(ranges.length){
      range.start=this.getSimpleRangeAddress(ranges[0]);
      if(range.start==undefined){
        return undefined;
      }
      if(ranges.length>1){
        range.end=this.getSimpleRangeAddress(ranges[1]);
        if(range.end==undefined){
          return undefined;
        }
      }
    }else {
      range.start=this.getSimpleRangeAddress(address);
      if(range.start==undefined){
        return undefined;
      }
    }
    return range;
  };
  self.getNameAddress=function(name){
    if(self.names[name]!=undefined){
      return self.names[name];
    }else {
      return self.getRangeAddress(name);
    }
  };
  self.getRangeName=function(range){
    range.normalize();
    if(range.isColumn()){
      return self.getColumnName(range.start.col)+":"+self.getColumnName(range.end.col);
    }else {
      if(range.isRow()){
        return (range.start.row+1)+":"+(range.end.row+1);
      }else {
        var name=self.getColumnName(range.start.col)+(range.start.row+1);
        if((range.start.row!=range.end.row)||(range.start.col!=range.end.col)){
          name+=":"+self.getColumnName(range.end.col)+(range.end.row+1);
        }
        return name;
      }
    }
  };
  self.existsName=function(name){
    if(self.getRangeAddress(name)!=undefined){
      return true;
    }
    return (self.names[name]!=undefined);
  };
  self.getRangeFromName=function(name){
    return self.names[name];
  };
  self.addName=function(name,range){
    if(self.getRangeAddress(name)==undefined){
      range.normalize();
      self.names[name]=range;
      return true;
    }else {
      return false;
    }
  };
  self.deleteName=function(name){
    self.names[name]=undefined;
  };
  self.getColumnName=function(index){
    var base=this.columnSequence.length;
    var name="";
    while(index>=0){
      name=this.columnSequence[parseInt(index)%base]+name;
      index=parseInt(index/base)-1;
    }
    return name;
  };
  self.getColumnIndex=function(name){
    var base=this.columnSequence.length;
    var index=0;
    len=0;
    while(len<name.length){
      index=index*base+1+parseInt(this.columnIndexes[name[len]]);
      len++;
    }
    return index-1;
  };
  self.getNames=function(){
    var names=new Array();
    for(var name in self.names){
      if(name!="remove"){
        names.push([name,self.getRangeName(self.names[name])]);
      }
    }
    return names;
  };
  self.construct=function(){
    this.names=new Array();
    this.maxRows=65536;
    this.maxCols=256;
    this.columnSequence=new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
    this.columnIndexes=new Object();
    for(var i=0;i<this.columnSequence.length;i++){
      this.columnIndexes[this.columnSequence[i]]=i;
    }
  };
  self.construct();
  window.Names=self.names;
  return self;
}
function toBool(val){
  if(val){
    return 1;
  }else {
    return 0;
  }
}
function toBoolFromString(val){
  if(parseInt(val)){
    return true;
  }else {
    return false;
  }
}
function JsonHandler(){
  var self=this;
  //chenjiabin，返回导出表格用于存与后台数据库的json，sheet参数即为Sheet类型的变量
  self.exportSheet=function(sheet){
	var formula=null;
    var json='{"cells":{';
    var cells="";
	for(var i=0;i<sheet.cells.length;i++){
      if(sheet.cells[i]){
        for(var j=0;j<sheet.cells[i].length;j++){
          if(sheet.cells[i][j]){
            formula=sheet.cells[i][j].getFormula()||'';
            if(formula==undefined||formula==""){
              formula=null;
            }else {
              formula="\""+addslashes(formula)+"\"";
            }
            value=sheet.cells[i][j].getValue();
            if(value==undefined){
              value=null;
            }else {
              value="\""+addslashes(value)+"\"";
            }
			try{
				var addressName = window.model.model.namespace.getRangeName(new Range({row:i,col:j}));
			}catch(e){
				alert('请稍后再试');
				return {};
			}
			var fontId = sheet.cells[i][j].getFontStyleId();
			var fontStyle = Styler.getFontStyleById(fontId).id;
            cells+=",\""+addressName+"\":{\"f\":"+formula+",\"fs\":\""+fontId+"|"+fontStyle+"\"}";
          }
        }
      }
    }
	json+=cells.substr(1);
	json+="}";
    json+="}";
    return json;
  };
  //chenjiabin,sheet的另一种数据格式的导出，给后台保存为xlsx文件提供数据
  self.exportReserveSheet=function(sheet){
    var formula=null;
	var sheetName = sheet.sheetName||"sheetName";
    var json="{\"sheetId\":null,\"name\":\""+sheetName+"\",\"data\":[";
    var cellsC="";
	var cellsA="";
    for(var i=0;i<sheet.cells.length;i++){
		cellsC="";
      if(sheet.cells[i]){
        for(var j=0;j<sheet.cells[i].length;j++){
          if(sheet.cells[i][j]){
            formula=sheet.cells[i][j].getFormula();
            if(formula==undefined||formula==""){
			  cellsC+=',""';
            }else {
              formula="\""+addslashes(formula)+"\"";
			  cellsC+=','+formula; 
            } 
          }else{
			cellsC+=',""';
		  }
        }
		cellsA+=',['+cellsC.substr(1)+']';
      }else{
		cellsA+=',[]';
	  }
    }
    json+=cellsA.substr(1);
    json+="]";
    json+="}";
    return json;
  };
  //chenjiabin，另一种数据格式的sheet导入方式，导如xlsx文件时使用
  self.importReserveSheet = function(data){
	var dataObj = JSON.parse(data);
	var sheet=application.activeSheet;
	var sheetId = dataObj.sheetId,
		sheetName = dataObj.sheetName,
		cells = dataObj.data,
		i = 0,j=0;
    for(i=0;i<cells.length;i++){
		for(j=0;j<cells[i].length;j++){
			sheet.setFormula(i,j,stripslashes((cells[i][j]||"").toString()),true);
		}
		
    }
  }
  //chenjiabin，其中fs也导出为一个字符串，与exportFontStyles一致
  self.exportCell = function(address){
	if(activeSheet.getCell(address.row,address.col)){
		var json = '{"cell":{"';
		var addressName = window.model.model.namespace.getRangeName(new Range(address));
		var cell = window.model.model.getCell(address.row,address.col);
		var fontStyle = Styler.getFontStyleById(cell.getFontStyleId()).id;
		var oldFontStyle = Styler.getFontStyleById(cell.getOldFontStyleId()).id;
		json+=addressName+'":{"old":{';
		json+='"f":"'+(cell.getOldFormula()||'');
		json+='","fs":"'+cell.getOldFontStyleId()+'|'+oldFontStyle;
		json+='"},"now":{';
		json+='"f":"'+(cell.getFormula()||'');
		json+='","fs":"'+cell.getFontStyleId()+'|'+fontStyle;
		json+='"}}}}';
		return json;
	}
	
  }
  //判断data存储的旧值是否与本地现有的值一致，一致则覆盖，不一致则冲突不做处理，等后端冲突消息到来在做处理。本地单元格正在编辑也不做处理。
  self.importCell = function(data){
	var sheet=application.activeSheet;
	var address=window.model.model.namespace.getNameAddress(data.key);	
	var localVal = sheet.getFormula(address.start.row,address.start.col);
	var fontStyleId = sheet.getCellFontStyleId(address.start.row,address.start.col);
	if(data.old){
		var oldVal = data.old.f;
	}
	if(address.start.row!=model.activeCell.row||address.start.col!=model.activeCell.col){
		if(!data.old||localVal==oldVal||data.old.fs.charAt(0)==fontStyleId){
			self.importFontStyles(Array(data.present.fs));
			sheet.setFormula(address.start.row,address.start.col,stripslashes(data.present.f||""),true);
			sheet.setCellFontStyleId(address.start.row,address.start.col,data.present.fs.charAt(0),true);
			var cell = window.model.model.getCell(address.start.row,address.start.col);
			cell.setOldFormula(localVal);
			cell.setOldFontStyleId(data.present.fs.charAt(0));
			window.FormulaBar.setValue(data.present.f||"");
			application.model.refresh();
		}
	}
	

  }
  // self.exportBook=function(id,book,sheet){
    // if(id==undefined){
      // id="null";
    // }
    // var json="{\"bookId\":"+id+",\"bookName\":\""+book.getName()+"\"";
    // json+=",\"bookContent\":{";
    // json+="\"sheets\":[";
    // json+=self.exportSheet(sheet);
    // json+="]";
    // json+=",\"fontStyles\":"+self.exportFontStyles();
    // json+="}";
    // json+="}";
    // return json;
  // };
  //将导出的fontStyle设置为一个字符串，字符串中用“|”分隔开各个样式参数，第一个参数为fontStyleId，接下来的参数与FontStyle类中id顺序相同
  //chenjiabin
  self.exportFontStyles=function(){
    var styles=Styler.getAllFontsStyles();
    var json='';
    for(var item in styles){
      if(item!="remove"){
        json+=','+'"'+item+'|'+styles[item].id+'"';
      }
    }
    json='['+json.substr(1)+']';
    return json;
  };
  // self.importBook=function(configs,data){
    // var book=new Book(data.bookName);
    // book.setId(data.id||data.bookId);
    // var content=data.bookContent;
    // self.importFontStyles(content.fontStyles);
    // var sheet=self.importSheet(configs,content.sheets[0]);
    // book.setSheet(sheet);
    // return book;
  // };
  
  //chenjiabin，importSheet因data格式改变修改
  self.importSheet=function(data){
    var sheet=application.activeSheet;
	sheet.fileName = data.fileName;
	var cells = data.cells;
    for(var i in cells){
		var address = window.model.model.namespace.getNameAddress(i);
		sheet.setFormula(address.start.row,address.start.col,stripslashes(cells[i].f||""),true);
		sheet.setCellFontStyleId(address.start.row,address.start.col,cells[i].fs.charAt(0),true);
		var cell = window.model.model.getCell(address.start.row,address.start.col);
		cell.setOldFormula(cells[i].f||"");
		cell.setOldFontStyleId(cells[i].fs.charAt(0));
		self.importFontStyles(Array(cells[i].fs));
    }
    return sheet;
  };
  //chenjiabin,数据格式做相应修改
  self.importFontStyles=function(data){
    var fontStyles=data;
    for(var i=0;i<fontStyles.length;i++){
		var styleArr = fontStyles[i].split('|');
		fontStyleId=parseInt(styleArr[0]||'0');
		fontId=parseInt(styleArr[1]||'1');
		fontSize=parseFloat(styleArr[2]||'10');
		fontColor=styleArr[3]||'#000000';
		fontBold=toBoolFromString(styleArr[4]||'false');
		fontItalic=toBoolFromString(styleArr[5]||'false');
		fontUnderline=toBoolFromString(styleArr[6]||'false');
		fontAlign=styleArr[7]||'general';
		fontValign=styleArr[8]||'bottom';
		Styler.addFontStyle(fontStyleId,fontId,fontSize,fontColor,fontBold,fontItalic,fontUnderline,fontAlign,fontValign);
    }
  };
}
function px(value){
  return value+"px";
}
function pt(value){
  return value+"pt";
}
function WrapFontStyle(object,fontStyleId){
  if(fontStyleId==undefined){
    fontStyleId=0;
  }
  var fontStyle=Styler.getFontStyleById(fontStyleId);
  object.style.fontFamily=Styler.getFontName(fontStyle.font);
  object.style.fontSize=pt(fontStyle.size);
  window.borrarFont=fontStyle;
  object.style.color=fontStyle.color;
  if(fontStyle.bold){
    object.style.fontWeight="bold";
  }else {
    object.style.fontWeight="normal";
  }
  if(fontStyle.italic){
    object.style.fontStyle="italic";
  }else {
    object.style.fontStyle="normal";
  }
  if(fontStyle.underline){
    object.setTextDecoration("underline");
  }else {
    object.setTextDecoration("none");
  }
  if(fontStyle.align=="general"){
    object.style.textAlign="left";
  }else {
    object.style.textAlign=fontStyle.align;
  }
  object.style.verticalAlign=fontStyle.valign;
}
function WrapStyle(obj){
  obj.setTextDecoration=function(value){
    obj.style.textDecoration=value;
  };
  obj.getTextDecoration=function(){
    return object.style.textDecoration;
  };
  obj.setTop=function(value){
    this.style.top=px(parseInt(value));
  };
  obj.getTop=function(){
    return parseInt(this.style.top);
  };
  obj.setLeft=function(value){
    this.style.left=px(parseInt(value));
  };
  obj.getLeft=function(){
    return parseInt(this.style.left);
  };
  obj.setZIndex=function(value){
    this.style.zIndex=parseInt(value);
  };
  obj.getZIndex=function(){
    return this.style.zIndex;
  };
  obj.setHeight=function(value){
    this.style.height=px(value);
  };
  obj.getHeight=function(){
    return parseInt(this.style.height);
  };
  obj.setWidth=function(value){
    this.style.width=px(value);
  };
  obj.getWidth=function(){
    return parseInt(this.style.width);
  };
  obj.getAbsoluteWidth=function(){
    if(window.isGecko){
      return parseInt(this.style.width)-parseInt(this.style.borderLeftWidth)-parseInt(this.style.borderRightWidth);
    }else {
      return parseInt(this.style.width)+parseInt(this.style.borderLeftWidth)+parseInt(this.style.borderRightWidth);
    }
  };
  obj.getAbsoluteHeight=function(){
    if(window.isGecko){
      return parseInt(this.style.height)-parseInt(this.style.borderTopWidth)-parseInt(this.style.borderBottomWidth);
    }else {
      return parseInt(this.style.height)+parseInt(this.style.borderTopWidth)+parseInt(this.style.borderBottomWidth);
    }
  };
  obj.getAbsoluteTop=function(){
    if(window.isGecko){
      return parseInt(this.style.top);
    }else {
      return parseInt(this.style.top)+parseInt(this.style.borderTopWidth);
    }
  };
  obj.getAbsoluteLeft=function(){
    if(window.isGecko){
      return parseInt(this.style.left);
    }else {
      return parseInt(this.style.height)+parseInt(this.style.borderLeftWidth);
    }
  };
}
/**
 * 对参数obj添加事件处理，events存放事件数组，register添加事件，on为事件添加对应的callback
 */
function WrapEvents(obj){
  obj.events=new Array();
  obj.register=function(eventName){
    this.events[eventName]=new Array();
  };
  obj.on=function(eventName,callback){
    if(this.events[eventName]){
      this.events[eventName].push(callback);
    }
  };
  obj.fire=function(eventName){
    var eventStack=this.events[eventName];
    if(eventStack){
      for(var i=0;i<eventStack.length;i++){
        switch(arguments.length){
        case 1:
          eventStack[i](obj);
          break ;
        case 2:
          eventStack[i](obj,arguments[1]);
          break ;
        case 3:
          eventStack[i](obj,arguments[1],arguments[2]);
          break ;
        case 4:
          eventStack[i](obj,arguments[1],arguments[2],arguments[3]);
          break ;
        }
      }
    }
  };
}
function Error(number,description){
  this.number=number;
  this.description=description;
  return this;
}
function addslashes(str){
  return (str+"").replace(/([\\])/g,"\\\\$1").replace(/(["'])/g,"\\$1").replace(/\u0000/g,"\\0");
}
function stripslashes(str){
  return str;
  return (str+"").replace(/\\(.?)/g,function(s,n1){
    switch(n1){
    case "\\":
      return "\\";
    case "0":
      return "\x00";
    case "":
      return "";
    default:
      return n1;
    }
  });
}
function trim(str,charlist){
  var whitespace,l=0,i=0;
  str+="";
  if(!charlist){
    whitespace=" \n\r\t\f\v\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  }else {
    charlist+="";
    whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1");
  }
  l=str.length;
  for(i=0;i<l;i++){
    if(whitespace.indexOf(str.charAt(i))===-1){
      str=str.substring(i);
      break ;
    }
  }
  l=str.length;
  for(i=l-1;i>=0;i--){
    if(whitespace.indexOf(str.charAt(i))===-1){
      str=str.substring(0,i+1);
      break ;
    }
  }
  return whitespace.indexOf(str.charAt(0))===-1?str:"";
}
//
function CommHandler(configs){
  var self=this;
  self.configs={url:"index.php",method:"POST"};
  for(var prop in configs){
    self.configs[prop]=configs[prop];
  }
  self.construct=function(){
    Ext.Ajax.on({"beforerequest":function(){
        Ext.getBody().mask("Loading...");
      }});
    Ext.Ajax.on({"requestcomplete":function(){
        Ext.getBody().unmask();
      }});
  };
  self.recieveRequest=function(response,param,successFn,failureFn){
    try{
      var data=Ext.util.JSON.decode(response.responseText);
      if(data.success){
        if(successFn){
          successFn(data.data);
        }
      }else {
        if(failureFn){
          failureFn(data.data);
        }else {
          Ext.MessageBox.show({title:data.type,msg:data.description,buttons:Ext.Msg.OK,icon:Ext.MessageBox.OK});
        }
      }
    }
    catch(e){
      Ext.MessageBox.show({title:"通信故障",msg:"返回的数据格式不对。"+e.toSource(),buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR});
    }
  };
  self.requestFailed=function(response){
    Ext.MessageBox.show({title:"通信故障",msg:"无返回数据。",buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR});
  };
  self.sendRequest=function(parameters,url,successFn,failureFn){
    Ext.Ajax.request({params:parameters,method:"post",waitMsg:"请稍候...",url:url,success:successFn,failure:failureFn});
  };
  //发起请求loadbook
  self.loadBook=function(bookId,callback){
    self.sendRequest({c:"Spreadsheet",m:"loadBook",param1:bookId,ogId:window.ogID||0,ogWid:window.ogWID||0},callback);
  };
  self.bookSaveServerResponse=function(data){
	var res=JSON.parse(data.responseText);
	application.activeSheet.id = res.data.fileId;
	alert("成功将新建表格保存至服务器~~");
	window.location.href = '/doc/'+ res.data.fileId;
  };
  //chenjiabin
  self.sendBook=function(name,jsonData){
	//var data = JSON.parse(jsonData);
    var params={fileName:name,data:jsonData};
    self.sendRequest(params,"/file/newFile",self.bookSaveServerResponse,function(){alert("保存失败");});
  };
  self.exportBook=function(data,format){
    if(window.submitForm!=undefined){
      var form=window.submitForm;
    }else {
      var form=document.createElement("FORM");
      window.submitForm=form;
      form.method=self.configs.method;
      form.action=self.configs.url;
      form.acceptCharset="UTF-8";
      form.target="_blank";
      var inputs=new Array();
      for(var i=0;i<5;i++){
        inputs[i]=document.createElement("INPUT");
        inputs[i].type="hidden";
        form.appendChild(inputs[i]);
      }
      document.body.appendChild(form);
    }
    form.elements[0].name="c";
    form.elements[0].value="Spreadsheet";
    form.elements[1].name="m";
    form.elements[1].value="saveBook";
    form.elements[2].name="param1";
    form.elements[2].value=data;
    form.elements[3].name="param2";
    form.elements[3].value="json";
    form.elements[4].name="param3";
    form.elements[4].value=format;
    form.submit();
  };
  self.construct();
  return self;
}
function saveBookConfirm(){
  var valid_name=/([a-zA-Z0-9_-]+)$/;
  Ext.MessageBox.prompt("另存为..","请输入文件名：",showResultText);
  function showResultText(btn,text){
    if(btn=="ok"){
      if(valid_name.test(text)){
		
        window.saveBook(text);
      }else {
        Ext.MessageBox.prompt("另存为..","请输入文件名：",showResultText);
      }
    }else {
    }
  }
}
function bold(){
  cmdSetBoldStyle();
}
function italic(){
  cmdSetItalicStyle();
}
function underline(){
  cmdSetUnderlineStyle();
}
function unformat(){
  cmdSetFontStyleId(0);
}
function setBorderLeft(){
  var cell=application.grid.activeCell;
  cell.style.borderLeft="5px solid #000000";
}
function setBorderRight(){
}
function setBorderTop(){
}
function setBorderNone(){
}
function refresh(){
  application.refresh();
}
function createToolbars(application){
  Ext.onReady(function(){
    var imgpath="themes/"+application.configs.theme+"/img/";
    var iconspath=imgpath+"icons/";
    Ext.QuickTips.init();
    var tb=new Ext.Toolbar();
    tb.render("north");
    tb.add("-",{icon:iconspath+"saveas-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("保存")+"</b><br/>"+lang("保存到服务器"),handler:function(){
        application.saveBook();
      }});
	tb.add({icon:iconspath+"new-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("新建")+"..</b><br/>"+lang("新建表格"),handler:function(){
	window.open("http://localhost:3000/", "_blank");
	}},"-");
	  //chenjiabin，这里用到的ajax忽略IE7以下
    tb.add({icon:iconspath+"pencil-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("导出为excel文件")+"..</b><br/>"+lang("导出为excel文件"),handler:function(){
        //saveBookConfirm();
		alert('开始导出了哦');
		var xhr = new XMLHttpRequest();
		var json = encodeURIComponent(JsonManager.exportReserveSheet(activeSheet));
		xhr.open('post','/transFile',false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(encodeURIComponent("data")+"="+json);
		if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
			window.open("http://localhost:3000"+xhr.responseText, "_blank");
		}else{
			alert('导出失败，请确保表格存在数据~');
		}
      }});
    
    tb.add({icon:iconspath+"open-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("导入表格")+"..</b><br/>"+lang("导入表格"),handler:function(){
		document.getElementById('transFileSelector').onchange = function(){
			Ext.Ajax.request({     
			   url: "/transLocalFile",     
			   method: "POST", 
			   form : 'transFileForm',   
			   success: function (response, option) { 
					var data = $(response.responseText).get(0).innerHTML;
					JsonManager.importReserveSheet(data);	
					window.model.refresh();
			   },     
			   failure: function () { Ext.Msg.alert("提示", "失败<br>没有捕获到异常"); }  
			}); 
		}
        document.getElementById('transFileSelector').click();
      }},"-");
    
    //导入导出需要服务器支持
    
    /*var exportMenu=new Ext.menu.Menu({id:"exportMenu",items:[{text:"PDF",icon:iconspath+"PDF-16x16.png",tooltip:"<b>"+lang("Export to")+" PDF</b><br/>"+lang("Export to")+" PDF. <br/>",handler:function(){
          application.exportBook("pdf");
        }},{text:"XLS",icon:iconspath+"XLS-16x16.png",tooltip:"<b>"+lang("Export to")+" XLS</b><br/>"+lang("Export to")+" XLS. <br/>",handler:function(){
          application.exportBook("xls");
        }},{text:"XLSX",icon:iconspath+"XLSX-16x16.png",tooltip:"<b>"+lang("Export to")+" XLSX</b><br/>"+lang("Export to")+" XLSX. <br/>",handler:function(){
          application.exportBook("xlsx");
        }},{text:"ODS",icon:iconspath+"ODS-16x16.png",tooltip:"<b>"+lang("Export to")+" ODS</b><br/>"+lang("Export to")+" ODS. <br/>",handler:function(){
          application.exportBook("ods");
        }}]});*/
    
    //tb.add({icon:iconspath+"export.png",text:lang("export"),iconCls:"bmenu",tooltip:"<b>"+lang("Export")+"</b><br/>"+lang("Export to many formats")+". <br/>",menu:exportMenu},"-");
    tb.add({icon:iconspath+"undo-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("撤销")+"</b>",handler:function(){
        application.undo();
      }});
    tb.add({icon:iconspath+"redo-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("重做")+"</b>",handler:function(){
        application.redo();
      }});
    tb.add({icon:iconspath+"bold-16x16.png",cls:"x-btn-icon",tooltip:"<b>"+lang("黑体字")+"</b>",handler:bold});
    tb.add({icon:iconspath+"italic-16x16.png",cls:"x-btn-icon",tooltip:"<i>"+lang("斜体字")+"</i>",handler:italic});
    tb.add({icon:iconspath+"underline-16x16.png",cls:"x-btn-icon",tooltip:"<u>"+lang("下划线")+"</u>",handler:underline},"-");
    tb.add({icon:iconspath+"delete-16x16.png",cls:"x-btn-icon",tooltip:"<u>"+lang("删除")+"</u>",handler:window.deleteSelection});
    tb.add({icon:iconspath+"unformat-16x16.gif",cls:"x-btn-icon",tooltip:"<u>"+lang("清除格式")+"</u>",handler:unformat},"-");
    var fontColorMenu=new Ext.menu.ColorMenu({});
    fontColorMenu.on("select",function(cm,color){
      cmdSetFontColor("#"+color);
    });
    tb.add({icon:iconspath+"font-color-16x16.png",cls:"x-btn-icon",tooltip:lang("字体颜色"),menu:fontColorMenu},"-");
    var fontItems=[];
    for(var i in application.Fonts){
      if(i!="remove"){
        fontItems.push({text:"<span style=\"font-family: "+application.Fonts[i]+" \">"+application.Fonts[i]+"</span>",index:i,handler:function(){
            cmdSetFontStyle(this.index);
          }});
      }
    }
    var fontMenu=new Ext.menu.Menu({id:"fontMenu",items:fontItems});
    tb.add({icon:iconspath+"font-16x16.png",cls:"x-btn-icon",tooltip:lang("选择字体"),menu:fontMenu});
    var fontSize=new Ext.form.ComboBox({store:[["6","6","6"],["7","7","7"],["8","8","8"],["9","9","9"],["10","10","10"],["11","11","11"],["12","12","12"],["14","14","14"],["18","18","18"],["24","24","24"],["36","36","36"]],displayField:"function_name",typeAhead:true,editable:false,mode:"local",triggerAction:"all",emptyText:"10",width:60,selectOnFocus:true,tooltip:lang("字号")});
    fontSize.on("select",function(combo,record,index){
      cmdSetFontSizeStyle(combo.getValue());
    });
    tb.addField(fontSize);
    tb.add("-");
    tb.add({disabled:false,icon:iconspath+"align_left-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("居左对齐")+"</i>",handler:function(){
        cmdSetAlignStyle("left");
      }});
    tb.add({disabled:false,icon:iconspath+"align_center-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("居中对齐")+"</i>",handler:function(){
        cmdSetAlignStyle("center");
      }});
    tb.add({disabled:false,icon:iconspath+"align_right-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("居右对齐")+"</i>",handler:function(){
        cmdSetAlignStyle("right");
      }});
    tb.add("-");
    tb.add({disabled:false,icon:iconspath+"valign_button-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("底部对齐")+"</i>",handler:function(){
        cmdSetValignStyle("bottom");
      }});
    tb.add({disabled:false,icon:iconspath+"valign_center-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("中间对齐")+"</i>",handler:function(){
        cmdSetValignStyle("middle");
      }});
    tb.add({disabled:false,icon:iconspath+"valign_top-16x16.gif",cls:"x-btn-icon",tooltip:"<i>"+lang("顶部对齐")+"</i>",handler:function(){
        cmdSetValignStyle("top");
      }});
    tb.add("-");
    tb.add({icon:iconspath+"fx-16x16.png",cls:"x-btn-icon",menu:new Ext.menu.Menu({items:[{hideLabel:true,text:"Sum",handler:function(){
            window.FormulaBar.setValue("=Sum(");
            window.FormulaBar.focus();
          }},{hideLabel:true,text:"Average",handler:function(){
            window.FormulaBar.setValue("=Average(");
            window.FormulaBar.focus();
          }},{hideLabel:true,text:"Count",handler:function(){
            window.FormulaBar.setValue("=Count(");
            window.FormulaBar.focus();
          }},{hideLabel:true,text:"Max",handler:function(){
            window.FormulaBar.setValue("=Max(");
            window.FormulaBar.focus();
          }},{hideLabel:true,text:"Min",handler:function(){
            window.FormulaBar.setValue("=Min(");
            window.FormulaBar.focus();
          }},"-",{hideLabel:true,text:lang("更多函数"),handler:formulaWizard}]})});
    tb.add({disabled:false,icon:iconspath+"show-formula.png",cls:"x-btn-icon",tooltip:"<i>"+lang("查看函数")+"</i>",handler:function(){
        application.switchViewMode(!this.pressed);
        this.toggle(!this.pressed);
      }});
    var tb2=new Ext.Toolbar();
    tb2.render("north");
    var nameSelector=new Ext.form.ComboBox({displayField:"name",store:namesStore,typeAhead:true,mode:"local",forceSelection:false,width:148,height:23,triggerAction:"all",selectOnFocus:true,enableKeyEvents:true,ctCls:"nameSelectorContainer",id:"nameSelector"});
    window.nameSelector=nameSelector;
    nameSelector.on("keydown",function(object,e){
      if(e.getKey()==e.ENTER){
        if(!text.isExpanded()){
          setTimeout(function(){
            application.nameSelectorChanged(nameSelector.getValue());
          },1);
        }
      }
    });
    nameSelector.on("select",function(){
      application.nameSelectorChanged(nameSelector.getValue());
    });
    tb2.add(nameSelector);
    tb2.add("");
    tb2.add({icon:iconspath+"fx-16x16.png",cls:"x-btn-icon",tooltip:lang("插入函数"),handler:formulaWizard});
    tb2.add("");
    var function_list=new Ext.data.SimpleStore({fields:["function_id","function_name"],data:calculator.getFunctionList()});
    function_list.sort("function_id");
    var text=new Ext.form.ComboBox({store:function_list,displayField:"function_name",typeAhead:true,mode:"local",forceSelection:false,width:460,triggerAction:"all",selectOnFocus:false,id:"FormulaBar",ctCls:"no-image",enableKeyEvents:true});
    text.on("keydown",function(object,e){
      if(e.getKey()==e.ENTER){
        if(!text.isExpanded()){
          setTimeout(function(){
            application.editActiveCell(text.getValue());
          },1);
          application.model.moveDown();
        }
      }
      setTimeout(function(){
        application.editActiveCell(text.getValue());
      },1);
      return true;
    });
    text.on("select",function(object,e){
      application.model.editActiveCell(text.getValue());
      return false;
    });
    text.on("focus",function(object,e){
      application.editActiveCell(text.getValue());
      return true;
    });
    tb2.addField(text);
    window.FormulaBar=text;
  });
}
function fontColorPalette(){
  var cp;
  var container=document.getElementById("colorPalette");
  if(!window.colorPaletteActive){
    cp=new Ext.ColorPalette({value:"993300"});
    window.colorPaletteActive=true;
    container.style.visibility="visible";
    container.style.top="25px";
    container.style.left="289px";
    container.style.borderStyle="solid";
    container.style.borderWidth="1px";
    cp.render("colorPalette");
    cp.on("select",function(palette,selColor){
      window.colorPaletteActive=false;
      cp.hide();
      container.style.visibility="hidden";
      alert("colorPalette "+selColor);
      cmdSetFontColor("#"+selColor);
    });
  }else {
  }
}
function bgColorPalette(){
  var cp;
  var container=document.getElementById("colorPalette");
  if(!window.colorPaletteActive){
    cp=new Ext.ColorPalette({value:"FFFFFF"});
    window.colorPaletteActive=true;
    container.style.visibility="visible";
    container.style.top="25px";
    container.style.left="313px";
    container.style.borderStyle="solid";
    container.style.borderWidth="1px";
    cp.render("colorPalette");
    cp.on("select",function(palette,selColor){
      window.colorPaletteActive=false;
      cp.hide();
      container.style.visibility="hidden";
      cmdSetBgColor("#"+selColor);
    });
  }else {
  }
}
var Environment={init:function(){
    this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
    this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
    this.OS=this.searchString(this.dataOS)||"an unknown OS";
  },searchString:function(data){
    for(var i=0;i<data.length;i++){
      var dataString=data[i].string;
      var dataProp=data[i].prop;
      this.versionSearchString=data[i].versionSearch||data[i].identity;
      if(dataString){
        if(dataString.indexOf(data[i].subString)!=-1){
          return data[i].identity;
        }
      }else {
        if(dataProp){
          return data[i].identity;
        }
      }
    }
  },searchVersion:function(dataString){
    var index=dataString.indexOf(this.versionSearchString);
    if(index==-1){
      return ;
    }
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
Environment.init();
/**
 * 初始化该应用，将其指向window.application并返回它。其实该应用也是window本身。应用包含
 * configs，container和JsonManager等类
 * @param  dom element 容器
 */
function Application(container){
  var self=window;
  //构造函数
  self.construct=function(container){
    var configs=loadConfigs();
    self.configs=configs;
    self.container=container;
    self.JsonManager=new JsonHandler();
    self.Fonts=loadFonts();
    self.activeBook=new Book(configs.book.defaultName);
	//sheet数组，即表格面板数组，不过这里貌似只实现了一个面板
    self.sheets=new Array();
    var sheet=new Sheet(configs.sheet);
    self.namesStore=new Ext.data.SimpleStore({fields:["name","range"]});
    self.sheets.push(sheet);
	//当前面板
    self.activeSheet=sheet;
	//存储设定的样式信息
    self.Styler=new StyleHandler(configs.style);
    self.CommManager=new CommHandler(configs.communication);
	//工具条
    createToolbars(self);
	//app的面板，主要有north工具条和center表格两块
    var dataSection=new Ext.Viewport({layout:"border",renderTo:"body",items:[{region:"north",el:"north",autoHeight:true,height:0,border:false,margins:"0 0 0 0",ctCls:"no-height"},{region:"west",el:"west",hidden:true,collapsible:true,title:"Navigation"},{region:"center",el:"center",xtype:"tabpanel",items:{title:"sheet1"}},{region:"south",el:"south",hidden:true,title:"Information",collapsible:true,html:"Information goes here",split:true,height:100,minHeight:100}]});
    var center=document.getElementById("center");
	//在self中新建一个表格grid并添加到center面板中，表格初始化
    self.grid=new Grid({width:center.offsetWidth,height:center.offsetHeight});
	//grid直接放在center中
    center.appendChild(self.grid);
    self.grid.inicialize();
	//表格在编辑时事件
    self.grid.on("EditingMode",function(){
      self.FormulaBar.focus();
    });
    self.model=new GridModel(self.grid);
	//self.activeSheet为GridModel构造数据，在Gridmodel中用model变量表示
    self.model.setDataModel(self.activeSheet);
    self.model.on("Error",function(caller,e){
      Ext.Msg.alert("Error",e.description);
    });
    self.model.on("NameChanged",function(){
      var data=self.model.getNames();
      self.namesStore.loadData(data);
    });
    self.model.on("SelectionChanged",function(obj,address){
      nameSelector.setValue(address);
    });
	//ActiveCellChanged事件的唯一侦听器，设置FormulaBar的值
    self.model.on("ActiveCellChanged",function(obj,value){
	  //输入公式框set该单元格的值
      FormulaBar.setValue(value);  
    });
    self.model.refresh();
	//添加表格键盘事件
    self.gridShortCuts=new KeyHandler();
    self.gridShortCuts.addAction(self.model.goToHome,false,CH_CTRL+CH_HOME);
    self.gridShortCuts.addAction(self.model.moveRight,false,CH_TAB);
    self.gridShortCuts.addAction(self.model.moveDown,false,CH_ENTER);
    self.gridShortCuts.addAction(self.model.moveLeft,false,CH_LEFT_ARROW);
    self.gridShortCuts.addAction(self.model.moveRight,false,CH_RIGHT_ARROW);
    self.gridShortCuts.addAction(self.model.moveUp,false,CH_UP_ARROW);
    self.gridShortCuts.addAction(self.model.moveDown,false,CH_DOWN_ARROW);
    self.gridShortCuts.addAction(self.model.undo,false,CH_CTRL+CH_Z);
    self.gridShortCuts.addAction(self.model.redo,false,CH_CTRL+CH_SHIFT+CH_Z);
    self.gridShortCuts.addAction(model.deleteSelection,false,CH_DELETE);
    self.gridShortCuts.addAction(model.setValueToSelection,false,CH_CTRL+CH_ENTER);
	//添加工具栏键盘事件
    self.grid.onkeydown=gridShortCuts.keyHandler;
    self.documentShortCuts=new KeyHandler();
    self.documentShortCuts.addAction(self.model.pageUp,false,CH_PAGE_UP);
    self.documentShortCuts.addAction(self.model.pageDown,false,CH_PAGE_DOWN);
    self.documentShortCuts.addAction(self.saveBook,false,CH_CTRL+CH_S);
    self.documentShortCuts.addAction(saveBookConfirm,false,CH_CTRL+CH_SHIFT+CH_S);
    self.documentShortCuts.addAction(cmdSetBoldStyle,false,CH_CTRL+CH_B);
    self.documentShortCuts.addAction(cmdSetItalicStyle,false,CH_CTRL+CH_I);
    self.documentShortCuts.addAction(cmdSetUnderlineStyle,false,CH_CTRL+CH_U);
    self.documentShortCuts.addAction(namesDialog,false,CH_F3);
    self.documentShortCuts.addAction(function(){
      self.FormulaBar.focus();
    },false,CH_F2);
    if(Environment.browser=="Explorer"){
      document.onkeydown=self.documentShortCuts.keyHandler;
    }else {
      window.onkeydown=self.documentShortCuts.keyHandler;
    }
    self.grid.onselectstart=function(){
      return false;
    };
    self.grid.onmousedown=function(){
      return false;
    };
    window.onresize=function(){
      self.grid.resize(center.offsetWidth,center.offsetHeight);
    };
  };
  self.nameSelectorChanged=function(name){
    if(self.model.existsName(name)){
      self.model.goToName(name);
    }else {
      if(true){
        self.model.addName(name);
      }
    }
  };
  addApplicationAPI(self);
  self.construct(container);
  window.application=self;
  var url = window.location.href;
  var paramArray = url.split('3000/');
  if(paramArray[1].length!=0){
	
  }
  return self;
}

window["Bao"] = {};
window.Bao.Excel = Application;

function handle(delta){
  if(delta<0){
    grid.scrollDown(2);
  }else {
    grid.scrollDown(-2);
  }
}
function wheel(event){
  var delta=0;
  if(!event){
    event=window.event;
  }
  if(event.wheelDelta){
    delta=event.wheelDelta/120;
    if(window.opera){
      delta=-delta;
    }
  }else {
    if(event.detail){
      delta=-event.detail/3;
    }
  }
  if(delta){
    handle(delta);
  }
  if(event.preventDefault){
    event.preventDefault();
  }
  event.returnValue=false;
}
if(window.addEventListener){
  window.addEventListener("DOMMouseScroll",wheel,false);
}
window.onmousewheel=document.onmousewheel=wheel;
//构造整个表格数据的配置
function loadConfigs(){
  var configs={
    application:{titlePrefix:"6excel"},
    communication:{url:"./server/datafeed",method:"POST"},
    theme:"6excel",
    style:{defaultFontStyle:{fontId:1,size:10,color:"#000000",bold:false,italic:false,underline:false,align:"general",valign:"bottom"}},
    grid:{height:500,width:700,rowHeader:{height:18,width:20},colHeader:{height:18,width:80},scrollbar:{height:16,width:17},resizeHandler:{size:5}},
    sheet:{rows:65536,cols:256,defaultColumnWidth:80,defaultRowHeight:18},
    book:{defaultName:"book1",defaultSheets:3}};
  return configs;
}
//添加应用的一些API，包括取得json数据
function addApplicationAPI(self){
  self.focusActiveCell=function(){
    document.getElementById("ActiveCell").focus();
  };
  self.editActiveCell=function(value){
    self.model.editActiveCell(value);
  };
  self.getActiveCellValue=function(){
    return self.grid.getActiveCellValue();
  };
  self.increaseDecimals=function(){
    self.model.increaseDecimals();
  };
  self.decreaseDecimals=function(){
    self.model.decreaseDecimals();
  };
  self.deleteSelection=function(){
    self.model.deleteSelection();
  };
  //responseData.bookContent.sheets[0]即是一个Sheet类
  //chenjiabin,直接在函数中调用importSheet来导入sheet，不用book
  self.bookLoaded=function(responseData,isDocument){
    //var book=self.JsonManager.importBook(self.configs.sheet,responseData);
    //self.activeBook=book;
    //self.activeSheet=book.getSheet();
    //self.setBookName(book.name);
	if(isDocument){
		var sheet = self.JsonManager.importReserveSheet(self.configs.sheet,responseData);
	}else{
		var sheet = self.JsonManager.importSheet(self.configs.sheet,responseData);
	}
	self.activeSheet = sheet;
    self.model.setDataModel(sheet);
    self.model.refresh();
  };
  self.loadBook=function(bookId){
    //self.CommManager.loadBook(bookId,self.bookLoaded);
  };
  self.setBookName=function(bookName){
    self.activeBook.setName(bookName);
    document.title=self.configs.application.titlePrefix+" - "+bookName;
  };
  self.saveBook=function(bookName){
	if(self.activeSheet.id){
		alert("表格已经保存了哦~");
		return ;
	}
    if(bookName==undefined){
      if(self.activeSheet.name){
        bookName=self.activeSheet.name;
      }else {
        saveBookConfirm();
        return ;
      }
    }else {}
    if(bookName==undefined){
      bookName=self.activeSheet.name;
    }
    self.activeSheet.name=bookName;
    var json=JsonManager.exportSheet(self.activeSheet);
    self.CommManager.sendBook(bookName,json);
  };
  self.exportBook=function(format){
    var json=JsonManager.exportBook(self.activeBook.getId(),self.activeBook,self.activeSheet);
    //self.CommManager.exportBook(json,format);
  };
  self.newBook=function(){
    Ext.MessageBox.show({title:lang("New_Book_Dialog_Title"),msg:lang("New_Book_Dialog_Text")+"<br>"+lang("Do_you_want_to_continue"),buttons:Ext.Msg.YESNOCANCEL,icon:Ext.MessageBox.OK,fn:function(btn){
        if(btn=="yes"){
          self.activeBook=new Book(self.configs.book.defaultName);
          self.activeSheet=new Sheet(self.configs);
          self.setBookName(self.configs.book.defaultName);
          window.FormulaBar.setValue("");
          self.model.setDataModel(self.activeSheet);
          self.model.goToHome();
          self.grid.reset();
          self.model.refresh();
          window.ogID=undefined;
        }
      }});
  };
  self.openFiles=function(data){
    if(!self.openFileDialog){
      self.openFileDialog=new OpenFileDialog(50,50,300,300);
    }
    for(var i=0;i<data.files.length;i++){
      self.openFileDialog.addFile(data.files[i]);
    }
    self.container.appendChild(self.openFileDialog);
  };
  self.switchViewMode=function(viewMode){
    self.model.changeViewMode(viewMode);
  };
  self.refresh=function(){
    self.model.refresh();
  };
  self.undo=function(){
    self.model.undo();
  };
  self.redo=function(){
    self.model.redo();
  };
}
function formulaWizard(){
  Ext.onReady(function(){
    var store=new Ext.data.SimpleStore({fields:["function_id","function_name","function_category","function_description"],data:calculator.getFunctionNameList()});
    store.sort("function_id");
    var grid=new Ext.grid.GridPanel({store:store,columns:[{header:"Function",width:120,dataIndex:"function_id",sortable:true},{header:"Category",width:115,dataIndex:"function_category",sortable:true}],sm:new Ext.grid.RowSelectionModel({singleSelect:true}),viewConfig:{forceFit:true},height:210,autoWidth:true,split:true,region:"north"});
    var bookTpl=new Ext.Template(["<br/>{function_description} <br/>"]);
    var ct=new Ext.Panel({frame:true,title:"选择一个函数...",autoHeight:true,autoWidth:true,items:[grid,{id:"detailPanel",region:"center",bodyStyle:{padding:"10px"},html:"<br><br><strong>Please select a function to see additional details.<strong>"}]});
    grid.getSelectionModel().on("rowselect",function(sm,rowIdx,r){
      var detailPanel=Ext.getCmp("detailPanel");
      bookTpl.overwrite(detailPanel.body,r.data);
    });
    var win=new Ext.Window({title:"插入一个函数...",applyToMarkup:"dialog-container",layout:"fit",autoHeight:true,width:500,plain:true,modal:true,items:ct,resizable:false});
    function selectFunction(){
      var functionName="="+grid.getSelectionModel().getSelected().data.function_id+"()";
      FormulaBar.setValue(functionName);
      FormulaBar.focus();
      win.close();
    }
    win.addButton({text:"Ok",handler:selectFunction});
    win.addButton({text:"Close",handler:function(){
        win.close();
      }});
    grid.on("rowdblclick",selectFunction);
    win.show();
  });
}
function namesDialog(){
  Ext.onReady(function(){
    var store=new Ext.data.SimpleStore({fields:["name","range"],data:window.activeSheet.getNames()});
    store.sort("name");
    var grid=new Ext.grid.GridPanel({store:store,columns:[{header:"Name",width:120,dataIndex:"name",sortable:true},{header:"Range",width:115,dataIndex:"range",sortable:true}],sm:new Ext.grid.RowSelectionModel({singleSelect:true}),viewConfig:{forceFit:true},height:210,autoWidth:true,split:true,region:"north"});
    var bookTpl=new Ext.Template(["<br/>{name} => {range} <br/>"]);
    var ct=new Ext.Panel({frame:true,title:lang("选区标识")+"...",autoHeight:true,autoWidth:true,items:[grid,{region:"center",bodyStyle:{padding:"10px"},html:"<br><br><strong>Here are listed all the range names on the book.<strong>"}]});
    var win=new Ext.Window({title:"Ranges:",applyToMarkup:"dialog-container",layout:"fit",autoHeight:true,width:500,plain:true,modal:true,items:ct,resizable:false});
    win.addButton({text:"Ok",handler:function(){
        var selected=grid.getSelections();
        if(selected[0]!=undefined){
          var value=selected[0].data.name;
          var current=application.getActiveCellValue();
          if(trim(current)!=""){
            application.editActiveCell(current+value);
          }else {
            application.editActiveCell("="+value);
          }
          application.focusActiveCell();
          win.close();
        }
      }});
    win.addButton({text:"Close",handler:function(){
        win.close();
      }});
    win.show();
  });
}
function loadFonts(){
  var list=new Array();
  list[1]="宋体";
  list[2]="仿宋";
  list[3]="黑体";
  list[4]="楷体";
  list[5]="隶书";
  list[6]="幼圆";
  return list;
}
function addGridSelectionOperations(grid){
  grid.selectRange=function(start,end){
    if(start.row==end.row&&start.col==end.col){
      this.selectorBox.fitToRange(this.cells[start.row][start.col]);
      return this.drawSimpleRange(start.row,start.col);
    }
    if(start.row<end.row){
      var rowStart=start.row;
      var rowEnd=end.row;
    }else {
      var rowEnd=start.row;
      var rowStart=end.row;
    }
    if(start.col<end.col){
      var colStart=start.col;
      var colEnd=end.col;
    }else {
      var colEnd=start.col;
      var colStart=end.col;
    }
    for(var i=rowStart;i<=rowEnd;i++){
      for(var j=colStart;j<=colEnd;j++){
        this.selectCell(i,j,true);
      }
    }
  };
  grid.selectColumn=function(index){
    this.cols[index].select();
    for(var i=0;i<this.rows.length;i++){
      this.rows[i].activate();
    }
  };
  grid.selectRow=function(index){
    this.rows[index].select();
    for(var i=0;i<this.cols.length;i++){
      this.cols[i].activate();
    }
  };
  grid.selectCell=function(row,col,inside){
    try{
      this.rows[row].activate();
      this.cols[col].activate();
      this.cells[row][col].select();
      if(!inside){
        this.cells[row][col].style.border="3px solid #000";
      }
    }
    catch(e){
    }
  };
  grid.clearSelection=function(){
    for(var i=0;i<this.cols.length;i++){
      this.cols[i].unselect();
    }
    for(var i=0;i<this.rows.length;i++){
      this.rows[i].unselect();
    }
    this.clearActiveCell();
  };
  grid.drawColumnsSelection=function(start,end){
    if(start<end){
      for(var i=start;i<=end;i++){
        this.selectColumn(i);
      }
    }else {
      for(var i=end;i<=start;i++){
        this.selectColumn(i);
      }
    }
  };
  grid.drawRowsSelection=function(start,end){
    if(start<end){
      for(var i=start;i<=end;i++){
        this.selectRow(i);
      }
    }else {
      for(var i=end;i<=start;i++){
        this.selectRow(i);
      }
    }
  };
  grid.drawCurrentSelection=function(){
    var start=this.selection.start;
    var end=this.selection.end;
    this.clearSelection();
    if(end!=undefined){
      if(start.col==undefined){
        this.drawRowsSelection(start.row,end.row);
        return ;
      }
      if(start.row==undefined){
        this.drawColumnsSelection(start.col,end.col);
      }else {
        this.selectRange(start,end);
      }
    }else {
      this.drawSelection(start.row,start.col);
    }
  };
  //在表格中画出选择范围，相比selectRange增加了当没有end时的情况和start没有col或没有row的情况
  grid.drawSelection=function(start,end){
    if(end!=undefined){
      if(start.col==undefined){
        this.drawRowsSelection(start.row,end.row);//row选择
        return ;
      }
      if(start.row==undefined){
        this.drawColumnsSelection(start.col,end.col);//col选择
      }else {
        this.selectRange(start,end);
      }
    }else {
      this.drawSimpleRange(start.row,start.col);
    }
  };
  grid.drawSimpleRange=function(row,col){
    if(row==undefined){
      grid.selectColumn(col);
    }else {
      if(col==undefined){
        grid.selectRow(row);
      }else {
        grid.selectCell(row,col,true);
      }
    }
  };
  grid.clearActiveCell=function(){
    this.cellEditor.style.visibilty="hidden";
    this.selectorBox.setVisible(false);
  };
  grid.drawActiveCell=function(row,col,value){
    try{
      this.cellEditor.style.visibilty="visible";
      this.cellEditor.fitToCell(this.cells[row][col]);
      this.cellEditor.setValue(value);
    }
    catch(e){
      alert(row+", "+col+" , "+value);
    }
  };
}
/** 
 * 为表格添加操作
 */
function addGridOperations(grid){
  grid.resizeColumn=function(){
    var offset=grid.verticalResizer.endResizing();
    grid.columnUsed.resize(offset);
    var diff=grid.offsetWidth-(grid.cols[grid.cols.length-1].offsetLeft+grid.cols[grid.cols.length-1].offsetWidth);
    if(diff>0){
      for(var i=0;i<diff/grid.configs.colHeader.width;i++){
        grid.addColumn();
      }
    }
    grid.adjustViewPortX();
    if(grid.onColumnSizeChange){
      grid.onColumnSizeChange(grid.columnUsed);
    }
    grid.columnUsed=undefined;
  };
  grid.resizeRow=function(pos){
    var offset=grid.horizontalResizer.endResizing(pos);
    grid.rowUsed.resize(offset);
    var diff=grid.offsetHeight-(grid.rows[grid.rows.length-1].offsetTop+grid.rows[grid.rows.length-1].offsetHeight);
    if(diff>0){
      for(var i=0;i<diff/grid.configs.rowHeader.height;i++){
        grid.addRow();
      }
    }
    grid.adjustViewPortY();
    grid.fire("RowSizeChanged",grid.rowUsed.getAddress(),grid.rowUsed.getSize());
    grid.rowUsed=undefined;
  };
  grid.getActiveCell=function(){
    return grid.activeCell;
  };
  grid.getActiveCellValue=function(){
    return grid.cellEditor.getValue();
  };
  grid.setValue=function(row,col,value){
    this.cells[row][col].setValue(value);
  };
  grid.setCell=function(row,col,value,fontStyleId){
    try{
      this.cells[row][col].setValue(value);
      this.cells[row][col].updateFontStyle(fontStyleId);
    }
    catch(e){
    }
  };
  grid.setFontStyle=function(row,col,fontStyleId){
    WrapFontStyle(this.cells[row][col],fontStyleId);
  };
  grid.setLayerStyle=function(row,col,layerStyleId){
    WrapLayerStyle(this.cells[row][col],layerStyleId);
  };
  grid.setLayoutStyle=function(row,col,layoutStyleId){
    WrapLayoutStyle(this.cells[row][col],layoutStyleId);
  };
  grid.getRowCount=function(){
    return grid.viewport.row;
  };
  grid.getColumnCount=function(){
    return grid.viewport.col;
  };
  grid.getColumn=function(index){
    return grid.cols[index];
  };
  grid.getRow=function(index){
    return grid.rows[index];
  };
  grid.getViewport=function(){
    return this.viewport;
  };
  grid.reset=function(){
    for(var i=0;i<grid.rows.length;i++){
      grid.rows[i].setSize(grid.configs.rowHeader.height);
    }
    for(var i=0;i<grid.cols.length;i++){
      grid.cols[i].setSize(grid.configs.colHeader.width);
    }
    grid.adjustViewPort();
  };
}
/** 
 * 表格类，用于构建GridModel。
 * @return self   self.body.appendChild(VRow)添加行，self.colHeader.appendChild(VColumn)添加列
 */
function Grid(configs){
  var self=document.createElement("DIV");
  self.configs={height:500,width:700,rowHeader:{height:18,width:20},colHeader:{height:18,width:80},scrollbar:{height:16,width:17},resizeHandler:{size:5}};
  for(var prop in configs){
    self.configs[prop]=configs[prop];
  }
  WrapEvents(self);
  self.register("ColumnSizeChange");
  self.register("ColumnFormatChange");
  self.register("RowSizeChanged");
  self.register("SelectionChange");
  self.register("CellValueChange");
  self.register("ActiveCellChange");
  self.register("RowAdded");
  self.register("ColumnAdded");
  self.register("EditingMode");
  //添加一行并触发添加cell和添加row事件
  self.addRow=function(passive){
    var row=new VRow(this.rows.length);
    row.setHeight(this.configs.rowHeader.height);
    var i=this.rows.push(row)-1;
    this.cells[i]=new Array();
    for(var j=0;j<this.cols.length;j++){
      var cell=new VCell(i,j);
      this.cols[j].addCell(cell);
      row.addCell(cell);
      this.cells[i][j]=cell;
      addGridCellEvents(self,cell);
    }
    addGridRowEvents(self,row);
    this.body.appendChild(row);
  };
  self.addColumn=function(){
    var column=new VColumn(this.cols.length);
    column.setHeight(this.configs.rowHeader.height);
    column.setWidth(this.configs.colHeader.width);
    var idx=this.cols.push(column);
    addGridColumnEvents(self,column);
    for(var i=0;i<this.rows.length;i++){
      var cell=new VCell(i,idx);
      this.rows[i].addCell(cell);
      this.cells[i].push(cell);
      column.addCell(cell);
      addGridCellEvents(self,cell);
    }
    this.colHeader.appendChild(column);
  };
  //调整视口宽度与列数适应
  self.adjustViewPortX=function(){
    if(this.viewport.col>=this.cols.length){
      this.viewport.col=this.cols.length-1;
    }
    var width=parseInt(this.offsetWidth);
    if(this.cols[this.viewport.col].offsetLeft>=width){
      for(var j=this.viewport.col;this.cols[j].offsetLeft>width;j--){
        this.viewport.col=j-1;
      }
    }else {
      for(var j=this.viewport.col-1;(this.cols[j].offsetLeft+this.cols[j].offsetWidth)<width;j++){
        this.viewport.col=j+1;
      }
    }
  };
  //调整视口高度与行数适应
  self.adjustViewPortY=function(){
    if(this.viewport.row>=this.rows.length){
      this.viewport.row=this.rows.length-1;
    }
    var height=parseInt(this.style.height);
    if(this.rows[this.viewport.row].offsetTop>height){
      for(var i=this.viewport.row;this.rows[i].offsetTop>=height;i--){
        this.viewport.row=i-1;
      }
    }else {
      try{
        for(var i=this.viewport.row;(i<this.rows.length)&&(this.rows[i].offsetTop+this.rows[i].offsetHeight)<=height;i++){
          this.viewport.row=i;
        }
      }
      catch(e){
      }
    }
  };
  self.adjustViewPort=function(){
    self.adjustViewPortX();
    self.adjustViewPortY();
  };
  self.setDimensions=function(width,height){
    this.scrollbars.setHeight(height);
    this.scrollbars.setWidth(width);
  };
  self.getMinHeight=function(){
    return this.minDimension.height;
  };
  self.getHeight=function(){
    return this.scrollbars.getHeight();
  };
  self.getVisibleHeight=function(){
    return parseInt(this.grid.style.height);
  };
  self.setHeight=function(height){
    this.scrollbars.setHeight(height);
  };
  self.getVisibleWidth=function(){
    return parseInt(this.grid.style.width);
  };
  self.getMinWidth=function(){
    return this.minDimension.width;
  };
  self.getWidth=function(){
    return this.scrollbars.getWidth();
  };
  self.setWidth=function(width){
    this.scrollbars.setWidth(width);
  };
  //构造函数
  self.construct=function(){
    var width=this.configs.width;
    var height=this.configs.height;
    this.cols=new Array();
    this.rows=new Array();
    this.cells=new Array();
    this.selecting=false;
	this.dragCopying = false;
    this.selectingRow=false;
    this.selectingCol=false;
    this.columnResizing=false;
    this.rowResizing=false;
    this.selection={start:{row:0,col:0},end:undefined};
    this.columnUsed=undefined;
    var gridHeight=height-this.configs.scrollbar.height;
    var gridWidth=width-this.configs.scrollbar.width;
    var ncols=(gridWidth-this.configs.rowHeader.width)/this.configs.colHeader.width;
    var nrows=(gridHeight-this.configs.rowHeader.height)/this.configs.rowHeader.height;
    this.viewport={row:parseInt(nrows),col:parseInt(ncols)};
    this.minDimension={width:width*2,height:height*2};
	//为self设置外观
    createGridGui(self,width,height);
    for(var j=0;j<ncols;j++){
      self.addColumn();
    }
    for(var i=0;i<nrows;i++){
      self.addRow();
    }
  };
  //将行列的数目（对应视口高度宽度）调整到与参数一样
  self.adjustGrid=function(width,height){
    if(width!=undefined&&height!=undefined){
      while(this.rows[this.viewport.row].offsetTop<height){
        self.addRow(true);
        this.viewport.row++;
      }
      while(this.cols[this.viewport.col].offsetLeft<width){
        self.addColumn(true);
        this.viewport.col++;
      }
      self.adjustViewPort();
    }
  };
  self.inicialize=function(){
    this.adjustViewPort();
  };
  self.resize=function(width,height){
    self.adjustGrid(width,height);
    self.setSize(width,height);
  };
  self.construct();
  addGridOperations(self);//为表格添加操作函数
  addGridMethods(self);
  addGridSelectionOperations(self);
  return self;
}
/** 
 * 为参数self设置外观
 */
function createGridGui(self,width,height){
  self.setSize=function(width,height){
    var gridHeight=height-self.configs.scrollbar.height;
    var gridWidth=width-self.configs.scrollbar.width;
    self.style.height=px(height);
    self.style.width=px(width);
    self.gridContainer.style.width=px(gridWidth);
    self.gridContainer.style.height=px(gridHeight);
    self.grid.style.height=px(gridHeight);
    self.grid.style.width=px(gridWidth);
  };
  self.style.left="0px";
  self.style.top="0px";
  self.style.position="absolute";
  self.style.overflow="hidden";
  self.gridContainer=document.createElement("DIV");
  self.gridContainer.id="GridContainer";
  self.gridContainer.style.position="absolute";
  self.gridContainer.style.top="1px";
  self.gridContainer.style.left="0px";
  self.gridContainer.style.overflow="hidden";
  self.gridContainer.style.zIndex=10;
  self.gridContainer.style.backgroundColor="transparent";
  self.grid=document.createElement("TABLE");
  self.grid.id="Grid";
  self.grid.style.top=px(0);
  self.grid.style.left=px(0);
  self.grid.style.tableLayout="fixed";
  self.grid.position="absolute";
  self.grid.style.zIndex=2;
  self.grid.cellSpacing=0;
  self.head=document.createElement("THEAD");
  self.colHeader=new VRow(0);
  self.colHeader.setInnerHTML("");
  self.colHeader.childNodes[0].style.width="30px";
  self.colHeader.childNodes[0].innerHTML="";
  self.body=document.createElement("TBODY");
  self.scrollbars=new ScrollBar("ScrollBar",self.minDimension.width,self.minDimension.height);
  self.scrollbars.style.zIndex=1;
  self.cellEditor=new CellEditor();
  self.selectorBox=new SelectorBox();
  //chenjiabin,冲突提示框
  self.diffSelector = new DiffSelector();
  self.setSize(width,height);
  self.verticalResizer=new SizeHandler(true);
  self.verticalResizer.style.left="100px";
  self.horizontalResizer=new SizeHandler(false);
  self.horizontalResizer.style.top="100px";
  self.head.appendChild(self.colHeader);
  self.grid.appendChild(self.head);
  self.grid.appendChild(self.body);
  self.gridContainer.appendChild(self.grid);
  self.gridContainer.appendChild(self.selectorBox);
  //chenjiabin
  self.gridContainer.appendChild(self.diffSelector);
  self.appendChild(self.gridContainer);
  self.appendChild(self.scrollbars);
  self.appendChild(self.verticalResizer);
  self.appendChild(self.horizontalResizer);
}
function ScrollBar(id,width,height){
  var self=document.createElement("DIV");
  self.construct=function(id,width,height){
    this.id=id;
    this.position={x:0,y:0};
    this.style.position="absolute";
    this.style.overflow="scroll";
    this.style.top="0px";
    this.style.left="0px";
    this.style.width="100%";
    this.style.height="100%";
    this.inner=document.createElement("DIV");
    WrapStyle(this.inner);
    this.inner.style.position="absolute";
    this.inner.setTop(0);
    this.inner.setLeft(0);
    this.inner.setWidth(width);
    this.inner.setHeight(height);
    this.appendChild(this.inner);
  };
  self.getHeight=function(){
    return parseInt(this.inner.style.height);
  };
  self.setHeight=function(height){
    this.inner.style.height=px(height);
  };
  self.getWidth=function(){
    return parseInt(this.inner.style.width);
  };
  self.setWidth=function(width){
    this.inner.style.width=px(width);
  };
  self.onscroll=function(e){
    e?e:e=window.event;
    var offsetX=this.scrollLeft-this.position.x;
    var offsetY=this.scrollTop-this.position.y;
    if(offsetY){
      this.position.y=this.scrollTop;
      if(this.onVerticalScroll){
        this.onVerticalScroll(this.scrollTop);
      }
    }
    if(offsetX){
      this.position.x=this.scrollLeft;
      if(this.onHorizontalScroll){
        this.onHorizontalScroll(this.scrollLeft);
      }
    }
  };
  self.construct(id,width,height);
  return self;
}
function CellEditor(){
  var self=document.createElement("INPUT");
  self.construct=function(){
    this.editing=false;
    this.id="ActiveCell";
    this.type="TEXT";
    this.cols=2000;
    this.rows=2;
    this.style.overflow="visible";
    this.style.zIndex=1000;
    this.activeCell=undefined;
    this.style.top="0px";
    this.style.left="0px";
    this.style.width="100%";
    this.cell=undefined;
    this.fontStyleId=0;
    WrapStyle(this);
    WrapEvents(this);
    self.register("ValueChanged");
  };
  self.reFit=function(){
    this.style.width="100%";
  };
  self.fitToCell=function(vcell){
    this.editing=false;
    this.cell=vcell;
    self.style.visibility="hidden";
    vcell.setInnerHTML("");
    this.value="";
    this.fontStyleId=vcell.getFontStyleId();
    WrapFontStyle(self,vcell.getFontStyleId());
    vcell.add(self);
    vcell.className=vcell.className+" Editing";
    self.style.visibility="visible";
    self.focus();
  };
  self.updateFontStyle=function(){
    var address=self.activeCell.getAddress();
    var cell=scGetCell(activeSheet,address.row,address.col);
    WrapFontStyle(self,scGetCell(activeSheet,address.row,address.col).getFontStyleId());
  };
  self.updateValue=function(newValue){
    self.value=newValue;
  };
  self.setValue=function(value){
    if(value!=undefined){
      this.value=value;
    }else {
      this.value="";
    }
  };
  self.getValue=function(){
    return this.value;
  };
  self.setFontStyleId=function(fsId){
    if(fsId){
      this.fontStyleId=fontStyleId;
    }
  };
  self.getFontStyleId=function(){
    return this.fontStyleId;
  };
  self.getColumn=function(){
    return this.cell.getColumn();
  };
  self.getRow=function(){
    return this.cell.getRow();
  };
  self.onkeyup=function(e){
    self.fire("ValueChanged",this.value);
  };
  self.refresh=function(){
  };
  self.construct();
  return self;
}
function SelectorBox(){
  var self=document.createElement("DIV");
  self.construct=function(){
    this.id="ActiveRange";
	this.lock = 1;
    this.style.position="absolute";
    this.style.overflow="visible";
    WrapStyle(this);
    this.setZIndex(3000);
    var fillBox=document.createElement("DIV");
    fillBox.style.position="absolute";
    fillBox.style.width="5px";
    fillBox.style.height="5px";
    fillBox.style.zIndex=3001;
    fillBox.style.backgroundColor="#000000";
    fillBox.style.cursor="crosshair";
    fillBox.style.border="1px solid #FFFFFF";
    this.fillBox=fillBox;
    this.appendChild(fillBox);
    WrapEvents(this);
    self.register("EditingMode");
  };
  self.setVisible=function(value){
    if(value){
      this.style.visibility="visible";
    }else {
      this.style.visibility="hidden";
    }
  };
  self.fitToRange=function(range){
    var borderWidth=3;
    self.setLeft(range.offsetLeft-borderWidth/2);
    self.setTop(range.offsetTop-borderWidth/2);
    try{
      self.setWidth(range.offsetWidth-borderWidth);
      self.setHeight(range.offsetHeight-borderWidth);
      self.fillBox.style.left=px(parseInt(self.style.width)-2);
      self.fillBox.style.top=px(parseInt(self.style.height)-2);
    }
    catch(e){
    }
    this.style.visibility="visible";
  };
  self.fitToArea=function(area){
    var borderWidth=3;
    self.setLeft(area.left-borderWidth/2);
    self.setTop(area.top-borderWidth/2);
    try{
      self.setWidth(area.width-2);
      self.setHeight(area.height-2);
      self.fillBox.style.left=px(parseInt(self.style.width)-2);
      self.fillBox.style.top=px(parseInt(self.style.height)-2);
    }
    catch(e){
    }
  };
  self.refresh=function(){
    self.fitToRange(grid.activeCell);
  };
  self.onclick=function(){
    self.fire("EditingMode",true);
  };
  self.construct();
  return self;
}
//chenjiabin,添加一个选择域，当出现冲突时弹出供用户选择
function DiffSelector(){
	var self=document.createElement("ul");
	var li0 = document.createElement('li');
	var li1 = document.createElement('li');
	var li2 = document.createElement('li');
	var li3 = document.createElement('li');
	li3.style.position="absolute";
	li3.style.border="solid 1px red";
	li0.innerHTML = '数据冲突啦~请选择最终数据：';
	self.appendChild(li0);
	self.appendChild(li1);
	self.appendChild(li2);
	self.appendChild(li3);
	self.construct = function(){
		this.id = 'diffSelector';
		this.style.position="absolute";
		this.style.overflow="visible";
		this.style.background = 'white';
		WrapStyle(this);
		this.setZIndex(3000);
		WrapEvents(this);
		self.register("solveDiff");
	};
	self.diffList = [];
	self.setVisible=function(value){
		if(value){
		  this.style.visibility="visible";
		}else {
		  this.style.visibility="hidden";
		}
	  };
	//根据selectorBox的位置刷新本身位置
	self.fitToRange=function(selectorBox){
		this.style.visibility="hidden";
		self.setLeft(selectorBox.offsetLeft+selectorBox.offsetWidth);
		self.setTop(selectorBox.offsetTop);
		try{
		  self.childNodes[3].style.left = '-'+(selectorBox.offsetWidth+2)+'px';
		  self.childNodes[3].style.top = -2+'px';
		  self.childNodes[3].style.width = selectorBox.offsetWidth+'px';
		  self.childNodes[3].style.height = selectorBox.offsetHeight+'px';
		}
		catch(e){
		}
		this.style.visibility="visible";
	  };
	 self.addContent=function(response){	
		if(self.diffList[0]){
			self.diffList.push(response);
		}else{
			self.diffList.push(response);
			self.showTip();
		}
	 };
	 self.showTip = function(){
		var response = self.diffList[0];
		if(response){
			if(response instanceof Object){
				var json = response;
			}else{
				var json = JSON.parse(response);
			}	
			var addressName = json.key;
			var address = application.model.model.namespace.getNameAddress(addressName).start;
			var localVal = application.model.model.getFormula(address.row,address.col)||"";
			var remoteVal = json.present.f||"";
			if(localVal==remoteVal){
				self.setVisible(false);
			}
			self.childNodes[1].innerHTML = '1、其他用户数据：'+'<span>'+remoteVal+'</span>';
			self.childNodes[2].innerHTML = '2、自己数据：'+'<span>'+localVal+'</span>';	//将选择的值赋值给当前格子。这里没有改变model里对应格子的值，只是改变显示的值，model中对应的值在格子失去焦点时改变
			self.childNodes[1].onclick = function(){
				var val = this.childNodes[1].innerHTML;
				application.model.model.setFormula(address.row,address.col,val);
				window.model.model.getCell(address.row,address.col,val).setOldFormula(remoteVal);
				JsonManager.importFontStyles(Array(json.present.fs));
				window.activeSheet.setCellFontStyleId(address.row,address.col,json.present.fs.charAt(0),true);
				if(window.doc){
					var cellData = JsonManager.exportCell(address);
					doc.send({"code":1,"data":cellData});
				}
				self.fire("solveDiff");
			}
			self.childNodes[2].onclick = function(){
				var val = this.childNodes[1].innerHTML;
				application.model.model.setFormula(address.row,address.col,val);
				window.model.model.getCell(address.row,address.col,val).setOldFormula(remoteVal);
				if(window.doc){
					var cellData = JsonManager.exportCell(address);
					doc.send({"code":1,"data":cellData});
				 }
				self.fire("solveDiff");
			}
			self.fitToRange(window.grid.cells[address.row][address.col]);
		}
		
	 }
	self.construct();
	return self;
}
function addGridMethods(grid){
	//chenjiabin,用户选择最终数据
	grid.diffSelector.on('solveDiff',function(selector){
		selector.setVisible(false);
		window.model.refresh();
		selector.diffList.shift();
		selector.showTip();
	});
  grid.selectorBox.on("EditingMode",function(){
    grid.fire("EditingMode",true);
  });
  grid.scrollbars.onVerticalScroll=function(top){
    if(grid.onVerticalScroll){
      grid.onVerticalScroll(parseInt(top));
    }
  };
  grid.scrollbars.onHorizontalScroll=function(left){
    if(grid.onHorizontalScroll){
      grid.onHorizontalScroll(parseInt(left));
    }
  };
  grid.onmouseup=function(e){
    e?e:e=window.event;
    this.selecting=false;
    this.selectingRow=false;
    this.selectingCol=false;
    if(this.columnResizing){
      this.resizeColumn();
    }
    if(this.rowResizing){
      this.resizeRow(e.clientY);
    }
    this.columnResizing=false;
    this.rowResizing=false;
  };
  grid.onmousemove=function(e){
    e?e:e=window.event;
    if(grid.columnResizing){
      grid.verticalResizer.setLeft(e.clientX);
    }else {
      if(grid.rowResizing){
        grid.horizontalResizer.setTop(e.clientY-59);
      }
    }
  };
}
function addGridCellEvents(grid,cell){
  cell.onmousedown=function(e){
    if(grid.activeCell!==cell){
      e?e:e=window.event;
      grid.selecting=true;
      grid.fire("ActiveCellChange",cell.getAddress(),grid.cellEditor.getValue());
    }
  };
  cell.onmouseover=function(e){
    e?e:e=window.event;
    if(grid.selecting){
      var address=cell.getAddress();
    }else {
      if(grid.selectingCol){
        var address={col:cell.getColumn()};
      }
    }
    if(address!=undefined){
      grid.fire("SelectionChange",undefined,address);
    }
  };
}
function addGridRowEvents(grid,row){
  row.on("resizemousedown",function(xrow,e){
    grid.rowUsed=row;
    grid.horizontalResizer.setTop(e.clientY-59);
    grid.horizontalResizer.startResizing(e.clientY-59);
    grid.rowResizing=true;
  });
  row.on("mousedown",function(xrow,e){
    if(!grid.rowResizing){
      grid.selectingRow=true;
      grid.fire("SelectionChange",row.getAddress());
    }
  });
  row.on("mouseover",function(xrow,e){
    if(grid.selectingRow){
      grid.selection.end=row.getAddress();
      grid.fire("SelectionChange",undefined,row.getAddress());
    }
  });
}
function addGridColumnEvents(grid,col){
  col.on("resizemousedown",function(xcol,e){
    grid.columnUsed=col;
    grid.verticalResizer.setLeft(e.clientX);
    grid.verticalResizer.startResizing();
    grid.columnResizing=true;
  });
  col.on("mousedown",function(xcol,e){
    if(!grid.columnResizing){
      grid.selectingCol=true;
      grid.fire("SelectionChange",col.getAddress());
    }
  });
  col.on("mouseover",function(xcol,e){
    if(grid.selectingCol){
      grid.fire("SelectionChange",undefined,col.getAddress());
    }
  });
}
function SizeHandler(verticalWay){
  var self=document.createElement("DIV");
  self.construct=function(verticalWay,top,left,width,height){
    this.element=undefined;
    this.style.position="absolute";
    this.style.top=px(0);
    this.style.left=px(0);
    this.style.width=px(0);
    this.style.height=px(0);
    this.style.backgroundColor="#CCC";
    if(verticalWay){
      this.style.cursor="e-resize";
      this.style.width=px(5);
    }else {
      this.style.cursor="s-resize";
      this.style.height=px(5);
    }
    this.style.zIndex=2000;
    this.resizing=false;
    WrapStyle(this);
  };
  if(verticalWay){
    self.startResizing=function(){
      this.offset=parseInt(this.style.left);
      this.style.height="100%";
    };
    self.endResizing=function(){
      this.style.height="0px";
      return this.offset-parseInt(this.style.left);
    };
    self.onmousedown=function(e){
      this.resizing=true;
      this.style.height="100%";
      this.style.backgroundColor="#CCC";
      var pos=(window.Event)?parseInt(e.pageX):parseInt(event.clientX);
      self.offset=parseInt(this.style.left)-pos;
    };
  }else {
    self.startResizing=function(pos){
      this.offset=parseInt(pos);
      this.style.width="100%";
    };
    self.endResizing=function(pos){
      this.style.width="0px";
      return (this.offset-parseInt(pos)+59);
    };
  }
  self.construct(verticalWay);
  return self;
}
//表格TD
function VCell(row,column){
  var self=document.createElement("TD");
  self.construct=function(row,column){
    this.className="Cell Unselected";
    this.row=row;
    this.column=column;
    this.address={"row":row,"col":column};
    this.value=undefined;
    this.fontStyleId=0;
    this.container=document.createElement("DIV");
    this.container.className="CellContainer";
    this.style.whiteSpace="nowrap";
    self.appendChild(this.container);
    WrapStyle(this);
    WrapEvents(this);
  };
  self.add=function(elem){
    this.container.appendChild(elem);
  };
  self.getFontStyleId=function(){
    return this.fontStyleId;
  };
  self.getValue=function(){
    return this.value;
  };
  self.setAddress=function(row,column){
    this.address.row=row;
    this.address.col=column;
  };
  self.getAddress=function(){
    return {row:this.address.row,col:this.address.col};
  };
  self.getColumn=function(){
    return this.column;
  };
  self.getRow=function(){
    return this.row;
  };
  self.setValue=function(value){
    this.value=value;
    self.setInnerHTML(value);
  };
  self.setCell=function(cell){
    this.cell=cell;
  };
  self.activate=function(){
    this.className="Cell Focused";
  };
  self.deactivate=function(){
    this.className="Cell Unselected";
  };
  self.select=function(){
    this.className="Cell Selected";
  };
  self.unselect=function(){
    this.className="Cell Unselected";
  };
  self.setInnerHTML=function(value){
    if(value){
      this.container.innerHTML=value;
    }else {
      this.container.innerHTML="";
    }
  };
  self.updateFontStyle=function(newFontStyleId){
    if(this.fontStyleId!=newFontStyleId){
      WrapFontStyle(this,newFontStyleId);
      this.fontStyleId=newFontStyleId;
    }
  };
  self.refresh=function(){
    if(this.cell!=undefined){
      if(this.cell.value!=undefined){
        this.container.innerHTML=this.cell.value;
      }else {
        this.container.innerHTML="";
      }
    }else {
      this.conteiner.innerHTML="";
    }
  };
  self.construct(row,column);
  self.setHeight=function(height){
    this.style.height=px(height);
  };
  self.setTextDecoration=function(value){
    self.container.style.textDecoration=value;
  };
  self.getTextDecoration=function(){
    return self.container.style.textDecoration;
  };
  return self;
}
function RowResizeArea(){
  var self=document.createElement("DIV");
  self.construct=function(){
    self.style.left="0px";
    self.style.width="100%";
    self.style.top="90%";
    self.style.height="5px";
    self.style.backgroundColor="transparent";
    self.style.cursor="s-resize";
  };
  self.construct();
  return self;
}
//表格TR
function VRow(index){
  var self=document.createElement("TR");
  self.construct=function(index){
    this.vcells=new Array();
    this.index=index;
    this.selected=false;
    this.header=document.createElement("TH");
    this.header.style.verticalAlign="bottom";
    var titleCell=document.createElement("DIV");
    titleCell.style.height="100%";
    titleCell.style.textAlign="center";
    var resizeArea=document.createElement("DIV");
    resizeArea.className="VerticalResizeArea";
    this.style.overflow="hidden";
    this.style.padding="0px";
    this.header.className=this.header.className+" RowUnselected";
    if(index==0){
      this.header.className=this.header.className+" top-right-cell";
    }
    this.header.style.overflow="hidden";
    this.style.overflow="hidden";
    this.titleCell=titleCell;
    this.resizeArea=resizeArea;
    this.header.appendChild(titleCell);
    this.header.appendChild(resizeArea);
    this.appendChild(this.header);
    WrapStyle(this.header);
    WrapStyle(self);
    titleCell.innerHTML=index+1;
  };
  self.addCell=function(cell){
    this.vcells.push(cell);
    this.appendChild(cell);
  };
  self.activate=function(){
    this.header.className="RowFocused";
  };
  self.deactivate=function(){
    this.selected=false;
    this.header.className="RowUnselected";
  };
  self.select=function(pasive){
    this.selected=true;
    this.header.className="RowSelected";
    for(var i=0;i<this.vcells.length;i++){
      this.vcells[i].select();
    }
  };
  self.unselect=function(){
    this.selected=false;
    this.header.className="RowUnselected";
    for(var i=0;i<this.vcells.length;i++){
      this.vcells[i].unselect();
    }
  };
  self.isSelected=function(){
    return this.selected;
  };
  self.getIndex=function(){
    return this.index;
  };
  self.setIndex=function(index){
    this.index=index;
  };
  self.getAddress=function(){
    return {row:this.index};
  };
  self.setSize=function(size){
    if(this.getHeight()!=size){
      this.setHeight(size);
      this.header.style.height=px(size);
      this.setHeight(size);
      for(var i=0;i<this.vcells.length;i++){
        this.vcells[i].setHeight(size);
      }
    }
  };
  self.getSize=function(){
    return this.getHeight();
  };
  self.hide=function(){
    this.style.display="none";
  };
  self.show=function(){
    this.style.display="";
  };
  self.resize=function(delta){
    var height=this.getHeight()-delta;
    if(height<1){
      self.hide();
    }else {
      this.setSize(height);
    }
  };
  self.setInnerHTML=function(value){
    this.titleCell.innerHTML=value;
  };
  self.setTitle=function(value){
    this.titleCell.innerHTML=value;
  };
  self.construct(index);
  self.resizeArea.onmousedown=function(e){
    e?e:e=window.event;
    self.fire("resizemousedown",e);
    e.stopPropagation();
    return false;
  };
  self.header.onmousedown=function(e){
    e?e:e=window.event;
    self.fire("mousedown",e);
  };
  self.onmouseover=function(e){
    e?e:e=window.event;
    self.fire("mouseover",e);
  };
  WrapEvents(self);
  self.register("mousedown");
  self.register("mouseover");
  self.register("resizemousedown");
  return self;
}
function ColumnReziseArea(){
  var self=document.createElement("DIV");
  self.construct=function(){
    this.data=document.createElement("DIV");
    this.data.className="ColumnTitle";
    var tdResizer=document.createElement("DIV");
    tdResizer.className="ColumnResizer";
    tdResizer.offset=0;
    tdResizer.onmousedown=function(e){
      e?e:e=window.event;
      this.offset=e.screenX;
      if(self.onresizing){
        self.onresizing(e);
      }
    };
    this.tdResizer=tdResizer;
    self.style.width="100%";
    self.style.height="100%";
    self.style.backgroundColor="transparent";
    self.appendChild(tdResizer);
    self.appendChild(this.data);
  };
  self.setInnerHTML=function(value){
    this.data.innerHTML=value;
  };
  self.construct();
  return self;
}
//表格TH
function VColumn(index){
  var self=document.createElement("TH");
  self.construct=function(index){
    this.index=index;
    this.vcells=new Array();
    this.style.textAlign="center";
    this.className="ColumnUnselected";
    this.resizeArea=new ColumnReziseArea();
    this.resizeArea.setInnerHTML(String.fromCharCode(65+index));
    this.appendChild(this.resizeArea);
    WrapStyle(this);
  };
  self.setIndex=function(index){
    this.index=index;
  };
  self.getIndex=function(){
    return this.index;
  };
  self.getAddress=function(){
    return {col:this.index};
  };
  self.getSize=function(){
    return this.getWidth();
  };
  self.setSize=function(size){
    return this.setWidth(size);
  };
  self.setInnerHTML=function(value){
    this.resizeArea.setInnerHTML(value);
  };
  self.setTitle=function(value){
    this.resizeArea.setInnerHTML(value);
  };
  self.addCell=function(cell){
    this.vcells.push(cell);
  };
  self.activate=function(){
    this.className="ColumnFocused";
  };
  self.deactivate=function(){
    this.className="ColumnUnselected";
  };
  self.select=function(){
    this.className="ColumnSelected";
    for(var i=0;i<this.vcells.length;i++){
      this.vcells[i].select();
    }
  };
  self.unselect=function(){
    this.className="ColumnUnselected";
    for(var i=0;i<this.vcells.length;i++){
      this.vcells[i].unselect();
    }
  };
  self.resize=function(delta){
    var width=this.getWidth()-delta;
    if(width<6){
      width=0;
    }
    this.setWidth(width);
  };
  self.construct(index);
  self.resizeArea.onresizing=function(e){
    e?e:e=window.event;
    self.fire("resizemousedown",e);
  };
  self.onmousedown=function(e){
    e?e:e=window.event;
    self.fire("mousedown",e);
  };
  self.onmouseover=function(e){
    e?e:e=window.event;
    self.fire("mouseover",e);
  };
  WrapEvents(self);
  self.register("mousedown");
  self.register("mouseover");
  self.register("resizemousedown");
  return self;
}
function cmdSetBoldStyle(){
  application.model.changeBoldToSelection();
}
function cmdSetFontStyleId(fsId){
  application.model.setSelectionFontStyleId(fsId);
}
function cmdSetItalicStyle(){
  application.model.changeItalicToSelection();
}
function cmdSetUnderlineStyle(){
  application.model.changeUnderlineToSelection();
}
function cmdSetFontStyle(font){
  application.model.changeFontToSelection(font);
}
function cmdSetFontColor(color){
  application.model.changeFontColorToSelection(color);
}
function cmdSetBgColor(color){
  application.model.changeBgColorToSelection(color);
}
function cmdSetFontSizeStyle(size){
  application.model.changeFontSizeToSelection(size);
}
function cmdSetAlignStyle(align){
  application.model.changeAlignToSelection(align);
}
function cmdSetValignStyle(valign){
  application.model.changeValignToSelection(valign);
}
function cmdSetLeftAlign(){
  var selection=window.SelectionMan.getSelection();
  var i=0;
  var address=selection[i].getAddress();
  var range=scGetCell(activeSheet,address.row,address.col);
  var fstyle=window.styleHandler.getLayoutStyleById(range.getFontStyleId());
  var italic=!fstyle.italic;
  var newStyle=window.styleHandler.getLayoutStyleId(fstyle.font,fstyle.size,fstyle.color,fstyle.bold,italic,fstyle.underline);
  range.setLayoutStyleId(newStyle);
  EventManager.fire(EVT_CELL_FONT_STYLE_CHANGE,newStyle);
}
function cmdSetBookName(name){
  activeBook.setName(name);
  EventManager.fire(EVT_BOOK_NAME_CHANGE,name);
}
function toBool(val){
  if(val){
    return 1;
  }else {
    return 0;
  }
}
function toBoolFromString(val){
  if(parseInt(val)){
    return true;
  }else {
    return false;
  }
}
function fscChangeBold(object){
  var fstyle=styleHandler.getFontStyle(object.getFontStyleId());
  var oldValue=fstyle.bold;
  var fsId=styleHandler.getStyleId(fstyle.font,fstyle.size,fstyle.color,!oldValue,fstyle.italic);
  object.setFontStyleId(fsId);
  return oldValue;
}
var VIEW_MODE_VALUES=0;
var VIEW_MODE_FORMULAS=1;
var VIEW_MODE_TYPES=2;
function GridModel(grid){
  var self=this;
  WrapEvents(self);
  self.register("Error");
  self.register("NameChanged");
  self.register("ActiveCellChanged");
  self.register("SelectionChanged");
  //gridmodel构造函数
  self.construct=function(){
    this.viewport=new Range({row:0,col:0},{row:grid.getViewport().row,col:grid.getViewport().col});
    this.gridPosition={x:grid.getVisibleWidth(),y:grid.getVisibleHeight()};
    this.scrollPageOffset={x:800,y:1500};
    this.activeCell={row:0,col:0};
    this.selection=new DataSelectionHandler();
    this.selection.setSelection(new Range({row:0,col:0}).normalize());//选择第一行第一列
    this.viewMode=VIEW_MODE_VALUES;
    addModelStyleOperations(this);
    this.store=new SimpleStore();
  };
  //获取相对与this.viewport的range的start值，也是坐标
  self.getRelativeRange=function(range){
    var result=range.clone();
    result.sub(this.viewport.start.row,this.viewport.start.col);
    return result;
  };
  //绝对坐标
  self.getAbsoluteRange=function(range){
    range.add(this.viewport.start.row,this.viewport.start.col);
    return range;
  };
  //取grid和model大的宽高值设置grid的宽高值
  self.updateGridHeight=function(){
    if(grid.getMinHeight()<this.model.getHeight()){
      grid.setHeight(this.model.getHeight());
    }
  };
  self.updateGridWidth=function(){
    if(grid.getMinWidth()<this.model.getWidth()){
      grid.setWidth(this.model.getWidth());
    }
  };
  self.setDataModel=function(model){
    this.model=model;
    this.updateGridHeight();
    this.updateGridWidth();
    this.refresh();
  };
  //刷新外观、grid的行和列setTitle、setSize，和表格数据。并使viewport与grid的viewport适应。并画出选择部分drawSelections。
  self.refresh=function(){
    for(var j=0;j<(this.viewport.end.col-this.viewport.start.col+1);j++){
      grid.getColumn(j).setTitle(this.model.getColumnName(this.viewport.start.col+j));
      grid.getColumn(j).setSize(this.model.getColumnSize(this.viewport.start.col+j));
    }
    grid.adjustViewPortX();
    for(var i=0;i<(this.viewport.end.row-this.viewport.start.row+1);i++){
      grid.getRow(i).setTitle(this.model.getRowName(this.viewport.start.row+i));
      grid.getRow(i).setSize(this.model.getRowSize(this.viewport.start.row+i));
      for(var j=0;j<(this.viewport.end.col-this.viewport.start.col);j++){
        var cell=this.model.getCell(this.viewport.start.row+i,this.viewport.start.col+j);
        self.refreshVCell(cell,i,j);
      }
    }
    grid.adjustViewPort();
    this.viewport.end.row=this.viewport.start.row+grid.getViewport().row;
    this.viewport.end.col=this.viewport.start.col+grid.getViewport().col;
    this.drawSelections();
  };
  //通过model取得每个cell的值并给gird对应的每个cell赋值。此函数没有调用到！！
  //但上面的self.refresh函数通过refreshVCell已经把值刷新了
  self.refreshValues=function(){
    for(var i=0;i<(this.viewport.end.row-this.viewport.start.row+1);i++){
      for(var j=0;j<(this.viewport.end.col-this.viewport.start.col);j++){
        var cell=this.model.getCell(this.viewport.start.row+i,this.viewport.start.col+j);
        if(cell){
          var value=cell.getValue();
          if(value==undefined){
            value="";
          }
          grid.setValue(i,j,value);
        }
      }
    }
  };
  //刷新grid某个单元格，根据viewmode的不同给该cell赋值
  self.refreshVCell=function(cell,row,col){
    if(cell){
      if(self.viewMode==VIEW_MODE_VALUES){
        var value=cell.getFormattedValue();
      }else {
        var value=cell.getFormula();
      }
      if(value==undefined){
        value="";
      }
      grid.setCell(row,col,value,cell.getFontStyleId());
    }else {
      grid.setCell(row,col,"",0,0);
    }
  };
  //活动cell改变函数，派发ActiveCellChanged事件
  //chenjiabin,给activeCell设置旧的样式id，和旧的值（公式），以便在改变后可以获得。
  self.changeActiveCell=function(address){
    if(address!=undefined){
      self.activeCell=address;
    }
    var value=this.model.getFormula(self.activeCell.row,self.activeCell.col);
    if(value==undefined){
      value="";
    }
	var cell = this.model.getCell(self.activeCell.row,self.activeCell.col);
	if(cell!=undefined){
		cell.setOldFontStyleId(cell.getFontStyleId());
		cell.setOldFormula(value);
	}
	if(window.doc){
		var cellTd = window.grid.cells[self.activeCell.row][self.activeCell.col],
			userName = COOKIE.get(document.cookie,"username"),
			userId = COOKIE.get(document.cookie,"userId");
		doc.send({"code":4,"data":{"userName":userName,"userId":userId,"position":{"row":self.activeCell.row,"col":self.activeCell.col}}});
	}
    self.fire("ActiveCellChanged",value);//value为当前change后的activeCell的值
  };
  //给活动的cell设置formula，并且计算公式结果，dontTrigger表示是否触发事件
  self.setActiveCellFormula=function(value,dontTrigger){
    var oldValue=self.model.getFormula(self.activeCell.row,self.activeCell.col);
    if(oldValue==undefined){
      oldValue="";
    }
    if(oldValue!=value){
      self.beginTransaction();
      try{
        self.model.setFormula(self.activeCell.row,self.activeCell.col,value);
      }
      catch(e){
        self.fire("Error",e);
      }
    }
    if(dontTrigger==undefined){
      self.fire("ActiveCellChanged",value);
    }
  };
  //设置选择区域
  self.setSelection=function(range,dontTrigger){
    self.selection.setSelection(range);
    if(dontTrigger==undefined){
      self.fire("SelectionChanged",self.model.getRangeName(range));
    }
  };
  //为选择的cell和选择的列或行调用函数
  self._applyToSelection=function(cellCallback,rowCallback,colCallback){
    var selections=self.selection.getSelection();
    for(var k=0;k<selections.length;k++){
      var selection=selections[k].normalize();
      if(selection.start){
        if(selection.start.row!=undefined&&selection.start.col!=undefined){
          if(selection.end){
            if(selection.end.row!=undefined&&selection.end.col!=undefined){
              self.beginTransaction();
              for(var i=selection.start.row;i<=selection.end.row;i++){
                for(var j=selection.start.col;j<=selection.end.col;j++){
                  cellCallback(i,j);
                }
              }
            }
          }
        }else {
          self.beginTransaction();
          if(selection.isRow()){
            for(var i=selection.start.row;i<=selection.end.row;i++){
              rowCallback(i);
            }
          }else {
            for(var i=selection.start.col;i<=selection.end.col;i++){
              colCallback(i);
            }
          }
        }
      }
    }
  };
  //删除选择区域的值
  self.deleteSelection=function(){
    self._applyToSelection(function(i,j){
      self.model.setFormula(i,j,"");
    },self.model.deleteRowValues,self.model.deleteColValues);
    self.refresh();
  };
  self.increaseDecimals=function(){
    var decimals=self.model.getDecimals(self.activeCell.row,self.activeCell.col);
    if(decimals>0){
      decimals++;
    }else {
      decimals=1;
    }
    self._applyToSelection(function(i,j){
      self.model.setDecimals(i,j,decimals);
    },function(i){
    },function(i){
    });
    self.refresh();
  };
  //将model选择的每个单元格dicemals减1或者设置为0
  self.decreaseDecimals=function(){
    var decimals=self.model.getDecimals(self.activeCell.row,self.activeCell.col);
    if(decimals>0){
      decimals--;
    }else {
      decimals=0;
    }
    self._applyToSelection(function(i,j){
      self.model.setDecimals(i,j,decimals);
    },function(i){
    },function(i){
    });
    self.refresh();
  };
  //获取cellEditor的值为model中选择的每个单元格赋值
  self.setValueToSelection=function(){
    var selections=self.selection.getSelection();
    var value=grid.cellEditor.getValue();
    for(var k=0;k<selections.length;k++){
      var selection=selections[k].normalize();
      if(selection.start.row!=undefined&&selection.start.col!=undefined){
        if(selection.end.row!=undefined&&selection.end.col!=undefined){
          self.beginTransaction();
          for(var i=selection.start.row;i<=selection.end.row;i++){
            for(var j=selection.start.col;j<=selection.end.col;j++){
              try{
                self.model.setFormula(i,j,value);
              }
              catch(e){
                self.fire("Error",e);
              }
            }
          }
        }
      }
    }
    self.refresh();
  };
  self.isRangeVisible=function(row,col){
    if(row!=undefined){
      if(row<self.viewport.start.row||row>=self.viewport.end.row){
        return false;
      }
    }
    if(col!=undefined){
      if(col<self.viewport.start.col||col>=self.viewport.end.col){
        return false;
      }
    }
    return true;
  };
  self.editActiveCell=function(value){
    grid.cellEditor.setValue(value);
  };
  //撤销操作
  self.undo=function(){
    self.model.rollBack();
    self.selection.rollBack();
    self.rollBack();
    self.refresh();
  };
  //恢复操纵
  self.redo=function(){
    self.model.restore();
    self.selection.restore();
    self.restore();
    self.refresh();
  };
  self.rollBack=function(){
    if(this.store.canRollBack()){
      var temp=self.store.getCurrent();
      self.store.rollBack(self.activeCell);
      self.changeActiveCell(temp);
    }
  };
  self.restore=function(){
    if(this.store.canRestore()){
      var temp=this.store.restore(self.activeCell);
      self.changeActiveCell(temp);
    }
  };
  self.saveState=function(){
    self.store.set({row:self.activeCell.row,col:self.activeCell.col});
  };
  self.beginTransaction=function(){
    self.store.beginTransaction();
    self.model.beginTransaction();
    self.selection.beginTransaction();
    self.saveState();
  };
  self.addName=function(name){
    var changed=self.model.addName(name,self.selection.getActiveSelection().clone());
    self.fire("NameChanged",name);
    return changed;
  };
  self.getNames=function(){
    return self.model.getNames();
  };
  self.deleteName=function(name){
    self.model.deleteName(name);
    self.fire("NameChanged");
  };
  self.existsName=function(name){
    var temp=self.model.existsName(name);
    return temp;
  };
  self.getActiveCellValue=function(){
    return self.model.getValue();
  };
  self.changeViewMode=function(viewMode){
    if(viewMode!=undefined){
      self.viewMode=viewMode;
    }else {
      self.viewMode=!self.viewMode;
    }
    self.refresh();
  };
  //为gridmodel设置表格选择操作
  addDataModelSelection(self,grid);
  self.construct();
  addModelNavigation(self,grid);
  ExtendModelEvents(self,grid);
  return self;
}

function addModelStyleOperations(model){
  model.getActiveFontStyleId=function(){
    return (model.selection.getSelection())[0].getFontStyleId();
  };
  model.setSelectionFontStyleId=function(fsId){
    var selection=model.selection.getSelection();
    for(var i=0;i<selection.length;i++){
      this.setRangeFontStyleId(selection[i],fsId);
    }
    model.refresh();
  };
  model.getRangeFontStyleId=function(range){
    var fontStyleId=0;
    if(range.start.row!=undefined){
      if(range.start.col!=undefined){
        fontStyleId=this.model.getCellFontStyleId(range.start.row,range.start.col);
      }else {
        fontStyleId=this.model.getRowFontStyleId(range.start.row);
      }
    }else {
      fontStyleId=this.model.getColumnFontStyleId(range.start.col);
    }
    return fontStyleId;
  };
  model.setRangeFontStyleId=function(range,fontStyleId){
    range.normalize();
    if(range.start.row!=undefined){
      if(range.start.col!=undefined){
        for(var i=range.start.row;i<=range.end.row;i++){
          for(var j=range.start.col;j<=range.end.col;j++){
            this.model.setCellFontStyleId(i,j,fontStyleId);
          }
        }
      }else {
        this.model.setRowFontStyleId(range.start.row,fontStyleId);
      }
    }else {
      this.model.setColumnFontStyleId(range.start.col,fontStyleId);
    }
  };
  model.changeBgColorToSelection=function(color){
    var selection=model.selection.getSelection();
    var range=undefined;
    if(selection.length){
      this.setRangeBgColor(selection[0].row,selection[0].col,color);
    }
    for(var i=1;i<selection.length;i++){
      if(selection[i].row==undefined){
        this.setRangeBgColor(0,selection[i].col,color);
      }else {
        this.setRangeBgColor(selection[i].row,selection[i].col,color);
      }
    }
    model.refresh();
  };
  model.setRangeBgColor=function(rowIndex,colIndex,color){
    this.model.changeColumnFontStyleProp(colIndex,"bold",true);
    if(rowIndex!=undefined){
      if(colIndex!=undefined){
        application.grid.cells[rowIndex][colIndex].style.background=color;
      }else {
        this.model.setRowBgColor(rowIndex,color);
      }
    }else {
      this.model.setColumnBgColor(colIndex,color);
    }
  };
  model.setRangeFontStyleProperty=function(range,property,value){
    range.normalize();
    if(range.start.row!=undefined){
      if(range.start.col!=undefined){
        for(var i=range.start.row;i<=range.end.row;i++){
          for(var j=range.start.col;j<=range.end.col;j++){
            this.model.changeCellFontStyleProp(i,j,property,value);
          }
        }
      }else {
        for(var i=range.start.row;i<=range.end.row;i++){
          this.model.changeRowFontStyleProp(i,property,value);
        }
      }
    }else {
      for(var i=range.start.col;i<=range.end.col;i++){
        this.model.changeColumnFontStyleProp(i,property,value);
      }
    }
  };
  model.changeFontStylePropertyToSelection=function(property,value){
    var selection=model.selection.getSelection();
    var range=undefined;
    model.beginTransaction();
    if(value==undefined){
      if(selection.length){
        var fstyle=Styler.getFontStyleById(this.getRangeFontStyleId(selection[0]));
        value=!fstyle[property];
      }
    }
    for(var i=0;i<selection.length;i++){
      var fstyle=Styler.getFontStyleById(this.getRangeFontStyleId(selection[i]));
      if(value!=fstyle[property]){
        this.setRangeFontStyleProperty(selection[i],property,value);
      }
    }
    model.refresh();
  };
  model.changeBoldToSelection=function(){
    this.changeFontStylePropertyToSelection("bold");
  };
  model.changeUnderlineToSelection=function(){
    this.changeFontStylePropertyToSelection("underline");
  };
  model.changeItalicToSelection=function(){
    this.changeFontStylePropertyToSelection("italic");
  };
  model.changeFontSizeToSelection=function(size){
    this.changeFontStylePropertyToSelection("size",size);
  };
  model.changeFontToSelection=function(font){
    this.changeFontStylePropertyToSelection("font",font);
  };
  model.changeFontColorToSelection=function(color){
    this.changeFontStylePropertyToSelection("color",color);
  };
  model.changeAlignToSelection=function(align){
    this.changeFontStylePropertyToSelection("align",align);
  };
  model.changeValignToSelection=function(valign){
    this.changeFontStylePropertyToSelection("valign",valign);
  };
}
//为grid注册事件处理gridmodel数据,self为gridmodel
function ExtendModelEvents(self,grid){
//当当前单元格失去焦点时触发，self.refresh会为单元格设置新值
  grid.on("ActiveCellChange",function(caller,address,value){
    if(self.activeCell.row!=address.row||self.activeCell.col!=address.col){
      self.setActiveCellFormula(value,true);//将当前将要失去焦点的单元格value赋值给model中对应的
								//如果value为公式还会进行计算，给model对应单元格set计算结果值
      if(address.row!=undefined){
        address.row+=self.viewport.start.row;
      }
      if(address.col!=undefined){
        address.col+=self.viewport.start.col;
      }
	  //chenjiabin,在这里调用函数向后台发送还未失去焦点的单元格activeCell的数据
	  if(window.doc&&activeSheet.getCell(self.activeCell.row,self.activeCell.col)){
		var cell = activeSheet.getCell(self.activeCell.row,self.activeCell.col);
		var formula = cell.formula||'';
		if(cell.oldFormula!=formula||cell.fontStyleId!=cell.oldFontStyleId){
			var cellData = JsonManager.exportCell(window.model.activeCell);
			doc.send({"code":1,"data":cellData});
		}	
	  }
      self.changeActiveCell(address);//该函数会派发ActiveCellChanged事件，改变model.activeCell
      self.setSelection(new Range(address));
      self.refresh();
    }
  });
  grid.on("RowAdded",function(caller,row,size){
    grid.getRow(row).setTitle(this.model.getRowName(this.viewport.start.row+row));
    grid.getRow(row).setSize(this.model.getRowSize(this.viewport.start.row+row));
    for(var j=0;j<(this.viewport.end.col-this.viewport.start.col+1);j++){
      var cell=this.model.getCell(this.viewport.start.row+row,this.viewport.start.col+j);
      self.refreshVCell(row,j);
    }
  });
  grid.on("ColumnAdded",function(caller,col,size){
    grid.getColumn(col).setTitle(this.model.getColumnName(this.viewport.start.col+col));
    grid.getColumn(col).setSize(this.model.getColumnSize(this.viewport.start.col+col));
    for(var i=0;i<(this.viewport.end.row-this.viewport.start.row+1);i++){
      var cell=this.model.getCell(this.viewport.start.row+i,this.viewport.start.col+j);
      self.refreshGridCell(this.viewport.start.row+i,col);
    }
  });
  grid.cellEditor.on("ValueChanged",function(obj,value){
    self.fire("ActiveCellChanged",value,value,0);
  });
  grid.on("RowSizeChanged",function(obj,address,size){
    self.beginTransaction();
    if(self.selection.getActiveSelection().isRow()){
      var selections=self.selection.getSelection();
      for(var k=0;k<selections.length;k++){
        var selection=selections[k].normalize();
        for(var i=selection.start.row;i<=selection.end.row;i++){
          self.model.setRowSize(i,size);
        }
      }
    }else {
      self.model.setRowSize(address.row+self.viewport.start.row,size);
    }
    self.refresh();
  });
  grid.onColumnSizeChange=function(column){
    self.beginTransaction();
    var size=column.getSize();
    if(self.selection.getActiveSelection().isColumn()){
      var selections=self.selection.getSelection();
      for(var k=0;k<selections.length;k++){
        var selection=selections[k].normalize();
        for(var i=selection.start.col;i<=selection.end.col;i++){
          self.model.setColumnSize(i,size);
        }
      }
    }else {
      self.model.setColumnSize(column.getIndex()+self.viewport.start.col,size);
    }
    self.refresh();
  };
}
function addModelNavigation(self,grid){
  self.moveUp=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    if(self.activeCell.row>0){
      self.activeCell.row--;
      self.changeActiveCell();
      self.selection.setSelection(new Range({row:self.activeCell.row,col:self.activeCell.col},{row:self.activeCell.row,col:self.activeCell.col}));
      if(self.viewport.start.row>self.activeCell.row){
        self.onMove(0,-1);
		  if (doc) {
			  doc.drawAct(0,0,1);
		  }
      }
      self.refresh();
    }
  };
  self.moveDown=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    if(self.activeCell.row<65000){
      self.activeCell.row++;
      self.changeActiveCell();
      self.selection.setSelection(new Range({row:self.activeCell.row,col:self.activeCell.col},{row:self.activeCell.row,col:self.activeCell.col}));
      if(self.activeCell.row>=self.viewport.end.row){
        self.onMove(0,1);
		  if (doc) {
			  doc.drawAct(0,0,-1);
		  }
      }
      self.refresh();
    }
  };
  self.moveLeft=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    if(self.activeCell.col>0){
      self.activeCell.col--;
      self.changeActiveCell();
      self.selection.setSelection(new Range({row:self.activeCell.row,col:self.activeCell.col},{row:self.activeCell.row,col:self.activeCell.col}));
      if(!self.isRangeVisible(self.activeCell.row,self.activeCell.col)){
        self.onMove(-1,0);
		  if (doc) {
			  doc.drawAct(0,1);
		  }
      }
      self.refresh();
    }
  };
  self.moveRight=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    if(self.activeCell.row<256){
      self.activeCell.col++;
      self.changeActiveCell();
      self.selection.setSelection(new Range({row:self.activeCell.row,col:self.activeCell.col},{row:self.activeCell.row,col:self.activeCell.col}));
      if(!self.isRangeVisible(self.activeCell.row,self.activeCell.col)){
        self.onMove(1,0);
		  if (doc) {
			  doc.drawAct(0,-1);
		  }
      }
      self.refresh();
    }
  };
  self.pageDown=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    var offset=self.viewport.end.row-self.viewport.start.row;
    if(self.activeCell.row+offset>=self.model.getRowCount()){
      self.activeCell.row=self.model.getRowCount()-1;
      offset=0;
    }
    self.activeCell.row+=offset;
    self.changeActiveCell();
    self.setSelection(new Range(self.activeCell));
    grid.scrollDown(offset);
  };
  self.pageUp=function(){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    var offset=self.viewport.start.row-self.viewport.end.row;
    if(self.activeCell.row+offset<0){
      offset=-self.activeCell.row;
    }
    self.activeCell.row+=offset;
    self.changeActiveCell();
    self.setSelection(new Range(self.activeCell));
    grid.scrollDown(offset);
  };
  self.goToHome=function(){
    if(self.onSpecialMove){
      self.onSpecialMove("HOME");
    }
  };
  self.goToName=function(name){
    var range=self.model.getNameAddress(name);
    range=new Range(range.start,range.end);
    if(range!=undefined){
      self.selection.setSelection(range);
      self.activeCell={row:range.start.row,col:range.start.col};
      self.changeActiveCell();
      if(self.isRangeVisible(self.activeCell.row,self.activeCell.col)){
        self.drawSelections();
      }else {
        self.viewport.start.row=range.start.row;
        self.viewport.start.col=range.start.col;
        self.viewport.end.row=self.viewport.start.row+grid.rows.length-1;
        self.viewport.end.col=self.viewport.start.col+grid.cols.length-1;
        self.refresh();
      }
    }
  };
  self.goToCell=function(row,col){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    var range=new Range({row:row,col:col});
    self.changeActiveCell({row:row,col:col});
    if(self.isRangeVisible(row,col)){
    }
    self.selection.setSelection(new Range({row:row,col:col},{row:row,col:col}));
    self.refresh();
  };
  self.onSpecialMove=function(moveType){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    var offsetX=self.viewport.end.col-self.viewport.start.col;
    var offsetY=self.viewport.end.row-self.viewport.start.row;
    if(moveType=="HOME"){
      self.activeCell.row=0;
      self.activeCell.col=0;
      self.viewport.start.col=0;
      self.viewport.end.col=offsetX;
      self.viewport.start.row=0;
      self.viewport.end.row=offsetY;
      self.selection.setSelection(new Range(self.activeCell,self.activeCell));
    }
    self.refresh();
  };
  self.onMove=function(offsetX,offsetY){
    if(offsetY<0){
      if((self.viewport.start.row+offsetY)>=0){
        self.viewport.start.row+=offsetY;
        self.viewport.end.row+=offsetY;
        self.gridPosition.y+=offsetY*18;
      }
    }else {
      if(offsetY>0){
        self.viewport.start.row+=offsetY;
        self.viewport.end.row+=offsetY;
        self.gridPosition.y+=offsetY*18;
      }
    }
    if(offsetX<0){
      if((self.viewport.start.col+offsetX)>=0){
        self.viewport.start.col+=offsetX;
        self.viewport.end.col+=offsetX;
      }
    }else {
      if(offsetX>0){
        self.viewport.start.col+=offsetX;
        self.viewport.end.col+=offsetX;
      }
    }
    self.refresh();
  };
  grid.onHorizontalScroll=function(left){
    var offset=self.viewport.end.col-self.viewport.start.col,
		col = self.viewport.start.col - parseInt(left/80);
    self.viewport.start.col=parseInt(left/80);
    self.viewport.end.col=parseInt(left/80)+offset;
    if(self.viewport.end.col*80+self.scrollPageOffset.x>grid.getWidth()){
      grid.setWidth(grid.getWidth()+self.scrollPageOffset.x);
    }
	if (doc) {
		doc.drawAct(0,col);
	}
    self.refresh();
  };
  grid.onVerticalScroll=function(top){
    var offset=self.viewport.end.row-self.viewport.start.row,
		row = self.viewport.start.row - parseInt(top/18);
    self.viewport.start.row=parseInt(top/18);
    grid.adjustViewPortY();
    self.viewport.end.row=self.viewport.start.row+grid.viewport.row;
    if(self.viewport.end.row*18+self.scrollPageOffset.y>grid.getHeight()){
      grid.setHeight(grid.getHeight()+self.scrollPageOffset.y);
    }
	if (doc) {
		doc.drawAct(0,0,row);
	}
    self.refresh();
  };
  grid.scrollDown=function(offset){
    var delta=self.viewport.start.row+offset;
    if(delta>=0){
      self.viewport.start.row=self.viewport.start.row+offset;
      grid.adjustViewPortY();
      self.viewport.end.row=self.viewport.start.row+grid.viewport.row;
      if(self.viewport.end.row*18+self.scrollPageOffset.y>grid.getHeight()){
        grid.setHeight(grid.getHeight()+self.scrollPageOffset.y);
      }
      self.refresh();
		if (doc) {
			doc.drawAct(offset);
		}
    }
  };
}
//为gridmodel添加相关单元格选择操作
function addDataModelSelection(self,grid){
  grid.on("SelectionChange",function(caller,start,end){
    self.setActiveCellFormula(grid.cellEditor.getValue(),true);
    var absRange=self.getAbsoluteRange(new Range(start,end));
    if(start==undefined){
      self.selection.getActiveSelection().end=absRange.end;
    }else {
      self.selection.setSelection(absRange);
    }
    var activeCell=self.selection.getActiveSelection().start;
	//处于拖动复制状态时只能选择行或者列
	//chenjiabin
	if(grid.dragCopying){
		if(activeCell.col!==end.col&&activeCell.row!==end.row){
			if(Math.abs(activeCell.col-end.col)>Math.abs(activeCell.row-end.row)){
				self.selection.getActiveSelection().end.col= activeCell.col;
			}else{
				self.selection.getActiveSelection().end.row= activeCell.row;
			}
		}
	}
    if(end==undefined){
      activeCell={row:absRange.start.row,col:absRange.start.col};
    }
    if(activeCell.row==undefined){
      activeCell={row:self.viewport.start.row,col:activeCell.col};
    }
    if(activeCell.col==undefined){
      activeCell={row:activeCell.row,col:self.viewport.start.col};
    }
    self.changeActiveCell(activeCell);
    self.fire("SelectionChanged",self.model.getRangeName(self.selection.getActiveSelection().clone()));
    self.drawSelections();
  });
  //返回有效的range，即与self.viewport的交集部分
  self.getVisibleRange=function(range){
    var result=range.clone();
    result.normalize();
    if(result.end.row<self.viewport.start.row){
      return undefined;
    }
    if(result.end.col<self.viewport.start.col){
      return undefined;
    }
    if(result.start.row<self.viewport.start.row){
      result.start.row=self.viewport.start.row;
    }
    if(result.start.col<self.viewport.start.col){
      result.start.col=self.viewport.start.col;
    }
    if(result.end.row>self.viewport.end.row){
      result.end.row=self.viewport.end.row;
    }
    if(result.end.col>self.viewport.end.col){
      result.end.col=self.viewport.end.col;
    }
    return result;
  };
  //画出self.selection.getSelection()选择的部分
  self.drawSelections=function(){
    grid.clearSelection();
    var selection=self.selection.getSelection();
    for(var i=0;i<selection.length;i++){
      var range=self.getVisibleRange(selection[i]);//从self的selection中拿到range
      if(range!=undefined){
        range=self.getRelativeRange(range);//拿到self的相对range
        grid.drawSelection(range.start,range.end);//grid的drawSelection
      }
    }
    if(self.isRangeVisible(this.activeCell.row,this.activeCell.col)){
      grid.drawActiveCell(this.activeCell.row-self.viewport.start.row,this.activeCell.col-self.viewport.start.col,this.model.getFormula(this.activeCell.row,this.activeCell.col));
    }
  };
}
function Address(row,column){
  this.row=row;
  this.col=column;
  return this;
}
function SelectionState(currentSelection,selection){
  this.currentSelection=currentSelection;
  this.selection=selection;
  return this;
}
function DataSelectionHandler(){
  var self=this;
  self.construct=function(){
    this.selection=new Array();
    this.currentSelection=undefined;
    this.store=new SimpleStore();
  };
  self.unsetSelection=function(){
    while(this.selection.length>0){
      var item=this.selection.pop();
    }
  };
  self.setSelection=function(range){
    this.unsetSelection();
    this.selection.push(range);
    this.currentSelection=range;
  };
  self.getSelection=function(){
    return this.selection;
  };
  self.getActiveSelection=function(){
    return this.currentSelection;
  };
  self.addSelection=function(range){
    this.selection.push(range);
    this.currentSelection=range;
  };
  self.beginTransaction=function(){
    this.store.beginTransaction();
    self.saveState();
  };
  self.rollBack=function(){
    if(this.store.canRollBack()){
      var temp=this.store.getCurrent();
      this.store.rollBack(self.selection);
      self.selection=temp;
      self.currentSelection=self.selection[self.selection.length-1];
    }
  };
  self.restore=function(){
    if(this.store.canRestore()){
      var temp=this.store.restore(self.selection);
      self.selection=temp;
      self.currentSelection=self.selection[self.selection.length-1];
    }
  };
  self.saveState=function(){
    var currentState=new Array();
    for(var i=0;i<self.selection.length;i++){
      currentState.push(self.selection[i].clone());
    }
    self.store.set(currentState);
  };
  self.construct();
  return self;
}
function Book(name){
  var self=this;
  self.construct=function(name){
    this.id=undefined;
    this.name=name;
    this.sheet=undefined;
  };
  self.setSheet=function(sheet){
    this.sheet=sheet;
  };
  self.getSheet=function(){
    return this.sheet;
  };
  self.setId=function(id){
    this.id=id;
  };
  self.setName=function(name){
    this.name=name;
  };
  self.getId=function(){
    return this.id;
  };
  self.getName=function(){
    return this.name;
  };
  self.getSheetsCount=function(){
    return this.sheets.length;
  };
  self.construct(name);
  return self;
}
//整个表格的数据，为GridModel构造表格数据GridModel.model
function Sheet(configs){
  var self=this;
  self.getHeight=function(){
    return this.size.height;
  };
  self.getWidth=function(){
    return this.size.width;
  };
  self.getColumnCount=function(){
    return self.maxRange.col;
  };
  self.getRowCount=function(){
    return self.maxRange.row;
  };
  self.addRow=function(index){
    if(index>this.rows.length){
      var offset=index-this.rows.length;
      this.size.height+=this.defaultRowHeight*offset;
    }
    this.rows[index]=new Row(index);
    this.cells[index]=new Array();
    return this.rows[index];
  };
  self.addColumn=function(index){
    if(index>this.cols.length){
      var offset=index-this.cols.length;
      this.size.width+=configs.defaultColumnHeight*offset;
    }
    this.cols[index]=new Column(index);
    return this.cols[index];
  };
  self.addCell=function(row,col){
    if(this.rows[row]==undefined){
      this.addRow(row);
    }
    if(this.cols[col]==undefined){
      this.addColumn(col);
    }
    this.cells[row][col]=new Cell(row,col);
    return this.cells[row][col];
  };
  self.deleteCell=function(row,col){
    if(this.cells[row]!=undefined){
      this.cells[row][col]=undefined;
    }
  };
  self.construct=function(configs){
    this.cells=new Array();
    this.rows=new Array();
    this.cols=new Array();
    this.namespace=new NameHandler();
    this.maxRange={row:configs.rows,col:configs.cols};
    this.size={height:0,width:0};
    this.store=new Store();
  };
  self.beginTransaction=function(){
    this.store.beginTransaction();
  };
  self.rollBack=function(){
    var currentState=this.store.getCurrent();
    this.store.rollBack();
    for(var i=0;i<currentState.length;i++){
      var state=currentState[i];
      switch(state.property){
      case "formula":
        this.setFormula(state.address.row,state.address.col,state.oldValue,true);
        break ;
      case "fstyle":
        this.setCellFontStyleId(state.address.row,state.address.col,state.oldValue,true);
        break ;
      case "decimal":
        this.setDecimals(state.address.row,state.address.col,state.oldValue,true);
        break ;
      case "size":
        if(state.address.row==undefined){
          this.setColumnSize(state.address.col,state.oldValue,true);
        }else {
          this.setRowSize(state.address.row,state.oldValue,true);
        }
        break ;
      }
    }
  };
  self.restore=function(){
    if(this.store.canRestore()){
      this.store.restore();
      var currentState=this.store.getCurrent();
      for(var i=0;i<currentState.length;i++){
        var state=currentState[i];
        switch(state.property){
        case "formula":
          this.setFormula(state.address.row,state.address.col,state.newValue,true);
          break ;
        case "fstyle":
          this.setCellFontStyleId(state.address.row,state.address.col,state.newValue,true);
          break ;
        case "decimal":
          this.setDecimals(state.address.row,state.address.col,state.newValue,true);
          break ;
        case "size":
          if(state.address.row==undefined){
            this.setColumnSize(state.address.col,state.newValue,true);
          }else {
            this.setRowSize(state.address.row,state.newValue,true);
          }
          break ;
        }
      }
    }
  };
  self.getRowIndexByPosition=function(top){
    return parseInt(top/configs.defaultRowHeight);
  };
  self.getRowSize=function(row){
    if(this.rows[row]){
      return this.rows[row].getSize();
    }else {
      return configs.defaultRowHeight;
    }
  };
  self.setRowSize=function(row,size,dontStore){
    var previousSize=0;
    if(this.rows[row]==undefined){
      this.addRow(row);
    }
    if(dontStore==undefined){
      var state=new State({row:row},"size",this.rows[row].getSize(),size);
      this.store.add(state);
    }
    var previousSize=this.rows[row].getSize();
    this.rows[row].setSize(size);
    this.size.height+=size-previousSize;
  };
  self.getColumnSize=function(column){
    if(this.cols[column]){
      return this.cols[column].getSize();
    }else {
      return configs.defaultColumnWidth;
    }
  };
  self.setColumnSize=function(column,size,dontStore){
    if(this.cols[column]==undefined){
      this.addColumn(column);
    }
    if(dontStore==undefined){
      var state=new State({col:column},"size",this.cols[column].getSize(),size);
      this.store.add(state);
    }
    this.cols[column].setSize(size);
  };
  self.getColumnName=function(column){
    return this.namespace.getColumnName(column);
  };
  self.getRowName=function(row){
    return row+1;
  };
  self.getValue=function(row,column){
    if(this.cells[row]){
      if(this.cells[row][column]){
        return (this.cells[row][column]).getValue();
      }else {
        return undefined;
      }
    }else {
      return undefined;
    }
  };
  self.setValue=function(row,column,value){
    if(this.cells[row]==undefined){
      this.addCell(row,column);
    }else {
      if(this.cells[row][column]==undefined){
        this.addCell(row,column);
      }
    }
    this.cells[row][column].setValue(value);
  };
  self.deleteRowValues=function(row){
    if(self.rows[row]){
      for(var i in self.cells[row]){
        if(i!="remove"){
          self.setFormula(row,i,undefined);
        }
      }
    }
  };
  self.deleteColValues=function(column){
    if(self.rows){
      for(var row in self.rows){
        if(row!="remove"){
          if(self.cells[row][column]){
            self.setFormula(row,column,undefined);
          }
        }
      }
    }
  };
  self.clearCellReferences=function(row,col){
    if(self.cells[row]){
      if(self.cells[row][col]){
        self.cells[row][col].clearReferences();
      }
    }
  };
  self.getCellReferences=function(row,col){
    if(self.cells[row]){
      if(self.cells[row][col]){
        return self.cells[row][col].getReferences();
      }
    }
  };
  self.checkCircularReferences=function(row,col,range){
    try{
      if(range.addressInside(row,col)){
        self.deleteCell(row,col);
        throw (new Error(300,""));
      }
    }
    catch(e){
      e.description+="<br>Address: "+self.getRangeName(new Range({row:i,col:j}))+" Formula: "+self.getFormula(i,j);
      throw (e);
    }
    for(var i=range.start.row;i<=range.end.row;i++){
      for(var j=range.start.col;j<=range.end.col;j++){
        var refs=self.getCellReferences(i,j);
        if(refs!=undefined){
          for(var r=0;r<refs.length;r++){
            try{
              if(self.checkCircularReferences(row,col,refs[r])){
                throw (new Error(300,""));
              }
            }
            catch(e){
              e.description+="<br>Address: "+self.getRangeName(new Range({row:i,col:j}))+" Formula: "+self.getFormula(i,j);
              throw (e);
            }
          }
        }
      }
    }
    return false;
  };
  //根据公式计算值
  self.calculate=function(formula,row,col,passive){
    var tokens=parseFormula(formula);
    var result=null;
    var strtoeval="";
    var current_args=new Array();
    var current_func=null;
    var current_prefix="";
    var func_stack=new Array();
    var cell=self.cells[row][col];
    if(passive==undefined){
      cell.clearReferences();
      try{
        References.clearReferences({row:row,col:col});
      }
      catch(e){
      }
    }
    while(tokens.moveNext()){
      var token=tokens.current();
      switch(token.type){
      case "operator-prefix":
        current_prefix=token.value;
        break ;
      case "operator-infix":
        strtoeval+=token.value;
      case "operand":
        switch(token.subtype){
        case "number":
          if(current_func!=undefined){
            current_args.push(current_prefix+token.value);
            current_prefix="";
          }else {
            strtoeval+=current_prefix+token.value;
            current_prefix="";
          }
          break ;
        case "text":
          if(current_func!=undefined){
            current_args.push(current_prefix+token.value);
            current_prefix="";
          }else {
            strtoeval+="'"+current_prefix+token.value+"'";
            current_prefix="";
          }
          break ;
        case "range":
          var range=this.namespace.getNameAddress(token.value);
          range.normalize();
          if(passive==undefined){
            try{
              self.checkCircularReferences(row,col,range);
            }
            catch(e){
              e.description="Circular Reference Detected<br>Address: "+self.getRangeName(new Range({row:row,col:col}))+" Formula: "+formula+e.description;
              throw (e);
            }
            cell.addReference(range);
            try{
              References.addReference(range,{row:row,col:col});
            }
            catch(e){
            }
          }
          if(range!=undefined){
            var values=new Array();
            for(var i=range.start.row;i<=range.end.row;i++){
              for(var j=range.start.col;j<=range.end.col;j++){
                var value=this.getValue(i,j);
                if(typeof value=="string"){
                  value="'"+value+"'";
                }
                if(value!=undefined){
                  values.push(value);
                }
              }
            }
            if(current_func!=undefined){
              current_args.push(values);
              current_prefix="";
            }else {
              strtoeval+=values;
              current_prefix="";
            }
          }
          break ;
        }
        break ;
      case "function":
        if(token.subtype=="start"){
          if(current_func!=undefined){
            var old_func={args:current_args,func:current_func};
            func_stack.push(old_func);
          }
          current_args=new Array();
          current_func=token.value;
        }else {
          var value=calculator.calc(current_func,current_args);
          var current=func_stack.pop();
          if(current==undefined){
            strtoeval+=calculator.calc(current_func,current_args);
          }else {
            current.args.push(value);
            current_func=current.func;
            current_args=current.args;
          }
        }
        break ;
      case "subexpression":
        if(token.subtype=="start"){
          strtoeval+="(";
        }else {
          strtoeval+=")";
        }
        break ;
      }
    }
    try{
      result=eval(strtoeval);
    }
    catch(e){
      result=INVALID;
    }
    return result;
  };
  //这里的setFormula与Cell类里面的setFormula不同
  self.setFormula=function(row,column,value,dontStore,passive){
    if(value==""){
      value=undefined;
    }
    if(self.cells[row]==undefined){
      self.addCell(row,column);
    }else {
      if(self.cells[row][column]==undefined){
        self.addCell(row,column);
      }
    }
    if(dontStore==undefined){
      var state=new State({row:row,col:column},"formula",this.cells[row][column].getFormula(),value);
      this.store.add(state);
    }
    if(value!=undefined){
      this.cells[row][column].setFormula(value);
      if(value!=undefined){
        if(value.length){
          if((value[0]=="=")||(value[0]=="+")||(value[0]=="-")||isNumeric(value)){
			//计算结果
            var result=this.calculate(value,row,column,passive);
            if(result==0){
              this.cells[row][column].setValue("0");
            }else {
              this.cells[row][column].setValue(result);
            }
          }else {
            this.cells[row][column].setValue(value);
          }
        }
      }else {
        this.cells[row][column].setValue(value);
      }
    }else {
      this.cells[row][column].deleteContents();
    }
    if(this.cells[row][column].isNumeric()){
      this.changeCellFontStyleProp(row,column,"align","right",dontStore);
    }else {
      this.changeCellFontStyleProp(row,column,"align","left",dontStore);
    }
    self.updateReferences({row:row,col:column});
  };
  self.updateReferences=function(address){
    var references=References.getReferenced(address);
    if(references.length){
      for(var ref in references){
        if(ref!="remove"){
          var c=references[ref];
          this.setFormula(c.row,c.col,this.getFormula(c.row,c.col),undefined,true);
        }
      }
    }
  };
  self.getFormula=function(row,column){
    if(this.cells[row]){
      if(this.cells[row][column]){
        return (this.cells[row][column]).getFormula();
      }else {
        return undefined;
      }
    }else {
      return undefined;
    }
  };
  self.setDecimals=function(row,col,decimals,dontStore){
    if(self.cells[row]==undefined){
      self.addCell(row,col);
    }else {
      if(self.cells[row][col]==undefined){
        self.addCell(row,col);
      }
    }
    if(dontStore==undefined){
      var state=new State({row:row,col:col},"decimal",self.cells[row][col].getDecimals(),decimals);
      self.store.add(state);
    }
    self.cells[row][col].setDecimals(decimals);
  };
  self.getDecimals=function(row,col){
    if(self.cells[row]!=undefined){
      if(self.cells[row][col]!=undefined){
        return self.cells[row][col].getDecimals();
      }
    }
  };
  self.setRow=function(index,row){
    this.rows[index]=row;
  };
  self.getRow=function(index){
    return this.rows[index];
  };
  self.setRow=function(index,column){
    this.cols[index]=column;
  };
  self.getColumn=function(index){
    return this.rows[index];
  };
  self.setCell=function(row,column,formula,style){
    if(this.cells[row]==undefined){
      this.cells[row]=new Array();
    }
    if(this.cells[row][column]==undefined){
      this.cells[row][column]=new Cell(row,column);
    }
    this.cells[row][column].setFormula(formula);
  };
  self.getCell=function(row,column){
    if(this.cells[row]){
      return this.cells[row][column];
    }else {
      return undefined;
    }
  };
  self.createEmptyCell=function(row,column){
    var cell=new Cell(row,column);
    cell.isEmpty=true;
    return cell;
  };
  //此函数没有用到
  self.cloneRange=function(range){
    range.normalize();
    var clone=range.clone();
    clone.addCells(self.cells);
    return clone;
  };
  self.getRangeName=function(range){
    return self.namespace.getRangeName(range);
  };
  self.addName=function(name,range){
    return self.namespace.addName(name,range);
  };
  self.deleteName=function(name){
    self.namespace.deleteName(name);
  };
  self.existsName=function(name){
    return self.namespace.existsName(name);
  };
  self.getNameAddress=function(name){
    return self.namespace.getNameAddress(name);
  };
  self.getNames=function(){
    return self.namespace.getNames();
  };
  self.construct(configs);
  addSheetStyleOperations(self);
  return self;
}
function addSheetStyleOperations(sheet){
  sheet.getColumnFontStyleId=function(colIndex){
    if(sheet.cols[colIndex]){
      return sheet.cols[colIndex].getFontStyleId();
    }else {
      return sheet.defaultFontStyleId;
    }
  };
  sheet.getRowFontStyleId=function(rowIndex){
    if(sheet.rows[rowIndex]){
      return sheet.rows[rowIndex].getFontStyleId();
    }else {
      return sheet.defaultFontStyleId;
    }
  };
  sheet.getCellFontStyleId=function(rowIndex,colIndex,fontStyleId){
    if(sheet.cells[rowIndex]==undefined){
      if(sheet.rows[rowIndex]!=undefined){
        return sheet.rows[rowIndex].getFontStyleId();
      }else {
        if(sheet.cols[colIndex]!=undefined){
          return sheet.cols[colIndex].getFontStyleId();
        }else {
          return sheet.defaultFontStyleId;
        }
      }
    }else {
      if(sheet.cells[rowIndex][colIndex]==undefined){
        return sheet.rows[rowIndex].getFontStyleId();
      }else {
        return sheet.cells[rowIndex][colIndex].getFontStyleId();
      }
    }
  };
  sheet.setCellFontStyleId=function(rowIndex,colIndex,fontStyleId,dontStore){
    if(dontStore==undefined){
      var state=new State({row:rowIndex,col:colIndex},"fstyle",this.getCellFontStyleId(rowIndex,colIndex),fontStyleId);
      this.store.add(state);
    }
    if(sheet.cells[rowIndex]==undefined){
      sheet.addCell(rowIndex,colIndex);
    }else {
      if(sheet.cells[rowIndex][colIndex]==undefined){
        sheet.addCell(rowIndex,colIndex);
      }
    }
    sheet.cells[rowIndex][colIndex].setFontStyleId(fontStyleId);
  };
  sheet.changeCellFontStyleProp=function(rowIndex,colIndex,property,value,dontStore){
    var styleId=this.getCellFontStyleId(rowIndex,colIndex);
    var newStyleId=Styler.changeFontStyleProp(styleId,property,value);
    this.setCellFontStyleId(rowIndex,colIndex,newStyleId,dontStore);
  };
  sheet.changeColumnFontStyleProp=function(column,property,value){
    if(sheet.cols[column]==undefined){
      sheet.addColumn(column);
    }
    var styleId=this.getColumnFontStyleId(column);
    var newStyleId=Styler.changeFontStyleProp(styleId,property,value);
    sheet.cols[column].setFontStyleId(newStyleId);
    for(var i=0;i<sheet.cells.length;i++){
      if(sheet.cells[i]){
        if(sheet.cells[i][column]){
          this.changeCellFontStyleProp(i,column,property,value);
        }
      }
    }
  };
  sheet.changeRowFontStyleProp=function(row,property,value){
    if(sheet.rows[row]==undefined){
      sheet.addRow(row);
    }
    var styleId=this.getRowFontStyleId(row);
    var newStyleId=Styler.changeFontStyleProp(styleId,property,value);
    sheet.rows[row].setFontStyleId(newStyleId);
    if(sheet.cells[row]){
      for(var i=0;i<sheet.cells[row].length;i++){
        if(sheet.cells[row][i]){
          this.changeCellFontStyleProp(row,i,property,value);
        }
      }
    }
  };
  sheet.setColumnFontStyleId=function(column,fontStyleId,dontStore){
    if(sheet.cols[column]==undefined){
      sheet.addColumn(column);
    }
    sheet.cols[column].setFontStyleId(fontStyleId);
    for(var i=0;i<sheet.cells.length;i++){
      if(sheet.cells[i]){
        if(sheet.cells[i][column]){
          sheet.setCellFontStyleId(i,column,fontStyleId,dontStore);
        }
      }
    }
  };
  sheet.setRowFontStyleId=function(row,fontStyleId,dontStore){
    if(sheet.rows[row]==undefined){
      sheet.addRow(row);
    }
    sheet.rows[row].setFontStyleId(fontStyleId);
    if(sheet.cells[row]){
      for(var i in sheet.cells[row]){
        if(i!="remove"){
          sheet.setCellFontStyleId(row,i,fontStyleId,dontStore);
        }
      }
    }
  };
  sheet.setColumnBgColor=function(column,color){
    for(var i=0;i<sheet.cells.length;i++){
      application.grid.cells[i][column].style.background=color;
    }
  };
  sheet.setRowBgColor=function(row,color){
    if(sheet.rows[row]==undefined){
      sheet.addRow(row);
    }
    sheet.rows[row].setFontStyleId(fontStyleId);
    if(sheet.cells[row]){
      for(var i=0;i<sheet.cells[row].length;i++){
        sheet.cells[row][i].setFontStyleId(fontStyleId);
      }
    }
  };
}
function ReferenceHandler(){
  var self=this;
  self.construct=function(){
    this.targets={};
  };
  self.clearReferences=function(source){
    for(i in this.targets){
      for(j in this.targets[i]){
        for(k in this.targets[i][j]){
          for(l in this.targets[i][j][k]){
            var sources=this.targets[i][j][k][l];
            for(var m=0;m<sources.length;m++){
              var ref=sources[m];
              if(ref!=undefined){
                if(ref!="remove"){
                  if(ref.col==source.col&&ref.row==source.row){
                    delete this.targets[i][j][k][l][m];
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  self.addReference=function(target,source){
    var end=(target.end)?target.end:target.start;
    if(this.targets[target.start.row]==undefined){
      this.targets[target.start.row]={};
    }
    if(this.targets[target.start.row][target.start.col]==undefined){
      this.targets[target.start.row][target.start.col]={};
    }
    if(this.targets[target.start.row][target.start.col][end.row]==undefined){
      this.targets[target.start.row][target.start.col][end.row]={};
    }
    if(this.targets[target.start.row][target.start.col][end.row][end.col]==undefined){
      this.targets[target.start.row][target.start.col][end.row][end.col]=new Array();
    }
    this.targets[target.start.row][target.start.col][end.row][end.col].push(source);
  };
  self.getReferenced=function(source){
    var references=new Array();
    var row=source.row;
    var col=source.col;
    for(i in this.targets){
      for(j in this.targets[i]){
        for(k in this.targets[i][j]){
          for(l in this.targets[i][j][k]){
            if(row<=k&&row>=i&&col>=j&&col<=l){
              for(ref in this.targets[i][j][k][l]){
                if(ref!="remove"){
                  references.push(this.targets[i][j][k][l][ref]);
                }
              }
            }
          }
        }
      }
    }
    return references;
  };
  self.construct();
  return self;
}
window.References=new ReferenceHandler();
function parseFormula(formula){
  var tokens=getTokens(formula);
  return tokens;
}
var PARAM_SEPARATOR=";";
var TOK_TYPE_NOOP="noop";
var TOK_TYPE_OPERAND="operand";
var TOK_TYPE_FUNCTION="function";
var TOK_TYPE_SUBEXPR="subexpression";
var TOK_TYPE_ARGUMENT="argument";
var TOK_TYPE_OP_PRE="operator-prefix";
var TOK_TYPE_OP_IN="operator-infix";
var TOK_TYPE_OP_POST="operator-postfix";
var TOK_TYPE_WSPACE="white-space";
var TOK_TYPE_UNKNOWN="unknown";
var TOK_SUBTYPE_START="start";
var TOK_SUBTYPE_STOP="stop";
var TOK_SUBTYPE_TEXT="text";
var TOK_SUBTYPE_NUMBER="number";
var TOK_SUBTYPE_LOGICAL="logical";
var TOK_SUBTYPE_ERROR="error";
var TOK_SUBTYPE_RANGE="range";
var TOK_SUBTYPE_MATH="math";
var TOK_SUBTYPE_CONCAT="concatenate";
var TOK_SUBTYPE_INTERSECT="intersect";
var TOK_SUBTYPE_UNION="union";
function f_token(value,type,subtype){
  this.value=value;
  this.type=type;
  this.subtype=subtype;
}
function f_tokens(){
  this.items=new Array();
  this.add=function(value,type,subtype){
    if(!subtype){
      subtype="";
    }
    token=new f_token(value,type,subtype);
    this.addRef(token);
    return token;
  };
  this.addRef=function(token){
    this.items.push(token);
  };
  this.index=-1;
  this.reset=function(){
    this.index=-1;
  };
  this.BOF=function(){
    return (this.index<=0);
  };
  this.EOF=function(){
    return (this.index>=(this.items.length-1));
  };
  this.moveNext=function(){
    if(this.EOF()){
      return false;
    }
    this.index++;
    return true;
  };
  this.current=function(){
    if(this.index==-1){
      return null;
    }
    return (this.items[this.index]);
  };
  this.next=function(){
    if(this.EOF()){
      return null;
    }
    return (this.items[this.index+1]);
  };
  this.previous=function(){
    if(this.index<1){
      return null;
    }
    return (this.items[this.index-1]);
  };
}
function f_tokenStack(){
  this.items=new Array();
  this.push=function(token){
    this.items.push(token);
  };
  this.pop=function(){
    var token=this.items.pop();
    return (new f_token("",token.type,TOK_SUBTYPE_STOP));
  };
  this.token=function(){
    return ((this.items.length>0)?this.items[this.items.length-1]:null);
  };
  this.value=function(){
    return ((this.token())?this.token().value:"");
  };
  this.type=function(){
    return ((this.token())?this.token().type:"");
  };
  this.subtype=function(){
    return ((this.token())?this.token().subtype:"");
  };
}
window.getTokens = function(formula){
  var tokens=new f_tokens();
  var tokenStack=new f_tokenStack();
  var offset=0;
  var currentChar=function(){
    return formula.substr(offset,1);
  };
  var doubleChar=function(){
    return formula.substr(offset,2);
  };
  var nextChar=function(){
    return formula.substr(offset+1,1);
  };
  var EOF=function(){
    return (offset>=formula.length);
  };
  var token="";
  var inString=false;
  var inPath=false;
  var inRange=false;
  var inError=false;
  while(formula.length>0){
    if(formula.substr(0,1)==" "){
      formula=formula.substr(1);
    }else {
      if(formula.substr(0,1)=="="){
        formula=formula.substr(1);
      }
      break ;
    }
  }
  var regexSN=/^[1-9]{1}(\.[0-9]+)?E{1}$/;
  while(!EOF()){
    if(inString){
      if(currentChar()=="\""){
        if(nextChar()=="\""){
          token+="\"";
          offset+=1;
        }else {
          inString=false;
          tokens.add(token,TOK_TYPE_OPERAND,TOK_SUBTYPE_TEXT);
          token="";
        }
      }else {
        token+=currentChar();
      }
      offset+=1;
      continue ;
    }
    if(inPath){
      if(currentChar()=="'"){
        if(nextChar()=="'"){
          token+="'";
          offset+=1;
        }else {
          inPath=false;
        }
      }else {
        token+=currentChar();
      }
      offset+=1;
      continue ;
    }
    if(inRange){
      if(currentChar()=="]"){
        inRange=false;
      }
      token+=currentChar();
      offset+=1;
      continue ;
    }
    if(inError){
      token+=currentChar();
      offset+=1;
      if((",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,").indexOf(","+token+",")!=-1){
        inError=false;
        tokens.add(token,TOK_TYPE_OPERAND,TOK_SUBTYPE_ERROR);
        token="";
      }
      continue ;
    }
    if(("+-").indexOf(currentChar())!=-1){
      if(token.length>1){
        if(token.match(regexSN)){
          token+=currentChar();
          offset+=1;
          continue ;
        }
      }
    }
    if(currentChar()=="\""){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_UNKNOWN);
        token="";
      }
      inString=true;
      offset+=1;
      continue ;
    }
    if(currentChar()=="'"){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_UNKNOWN);
        token="";
      }
      inPath=true;
      offset+=1;
      continue ;
    }
    if(currentChar()=="["){
      inRange=true;
      token+=currentChar();
      offset+=1;
      continue ;
    }
    if(currentChar()=="#"){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_UNKNOWN);
        token="";
      }
      inError=true;
      token+=currentChar();
      offset+=1;
      continue ;
    }
    if(currentChar()=="{"){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_UNKNOWN);
        token="";
      }
      tokenStack.push(tokens.add("ARRAY",TOK_TYPE_FUNCTION,TOK_SUBTYPE_START));
      tokenStack.push(tokens.add("ARRAYROW",TOK_TYPE_FUNCTION,TOK_SUBTYPE_START));
      offset+=1;
      continue ;
    }
    if(currentChar()=="}"){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.addRef(tokenStack.pop());
      tokens.addRef(tokenStack.pop());
      offset+=1;
      continue ;
    }
    if(currentChar()==" "){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.add("",TOK_TYPE_WSPACE);
      offset+=1;
      while((currentChar()==" ")&&(!EOF())){
        offset+=1;
      }
      continue ;
    }
    if((",>=,<=,<>,").indexOf(","+doubleChar()+",")!=-1){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.add(doubleChar(),TOK_TYPE_OP_IN,TOK_SUBTYPE_LOGICAL);
      offset+=2;
      continue ;
    }
    if(("-").indexOf(currentChar())!=-1){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.add(currentChar(),TOK_TYPE_OP_IN);
      offset+=1;
      continue ;
    }
    if(("+-*/^&=><").indexOf(currentChar())!=-1){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.add(currentChar(),TOK_TYPE_OP_IN);
      offset+=1;
      continue ;
    }
    if(("%").indexOf(currentChar())!=-1){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.add(currentChar(),TOK_TYPE_OP_POST);
      offset+=1;
      continue ;
    }
    if(currentChar()=="("){
      if(token.length>0){
        tokenStack.push(tokens.add(token,TOK_TYPE_FUNCTION,TOK_SUBTYPE_START));
        token="";
      }else {
        tokenStack.push(tokens.add("",TOK_TYPE_SUBEXPR,TOK_SUBTYPE_START));
      }
      offset+=1;
      continue ;
    }
    if(currentChar()==PARAM_SEPARATOR){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      if(!(tokenStack.type()==TOK_TYPE_FUNCTION)){
        tokens.add(currentChar(),TOK_TYPE_OP_IN,TOK_SUBTYPE_UNION);
      }else {
        tokens.add(currentChar(),TOK_TYPE_ARGUMENT);
      }
      offset+=1;
      continue ;
    }
    if(currentChar()==")"){
      if(token.length>0){
        tokens.add(token,TOK_TYPE_OPERAND);
        token="";
      }
      tokens.addRef(tokenStack.pop());
      offset+=1;
      continue ;
    }
    token+=currentChar();
    offset+=1;
  }
  if(token.length>0){
    tokens.add(token,TOK_TYPE_OPERAND);
  }
  var tokens2=new f_tokens();
  while(tokens.moveNext()){
    token=tokens.current();
    if(token.type==TOK_TYPE_WSPACE){
      if((tokens.BOF())||(tokens.EOF())){
      }else {
        if(!(((tokens.previous().type==TOK_TYPE_FUNCTION)&&(tokens.previous().subtype==TOK_SUBTYPE_STOP))||((tokens.previous().type==TOK_TYPE_SUBEXPR)&&(tokens.previous().subtype==TOK_SUBTYPE_STOP))||(tokens.previous().type==TOK_TYPE_OPERAND))){
        }else {
          if(!(((tokens.next().type==TOK_TYPE_FUNCTION)&&(tokens.next().subtype==TOK_SUBTYPE_START))||((tokens.next().type==TOK_TYPE_SUBEXPR)&&(tokens.next().subtype==TOK_SUBTYPE_START))||(tokens.next().type==TOK_TYPE_OPERAND))){
          }else {
            tokens2.add(token.value,TOK_TYPE_OP_IN,TOK_SUBTYPE_INTERSECT);
          }
        }
      }
      continue ;
    }
    tokens2.addRef(token);
  }
  while(tokens2.moveNext()){
    token=tokens2.current();
    if((token.type==TOK_TYPE_OP_IN)&&(token.value=="-")){
      if(tokens2.BOF()){
        token.type=TOK_TYPE_OP_PRE;
      }else {
        if(((tokens2.previous().type==TOK_TYPE_FUNCTION)&&(tokens2.previous().subtype==TOK_SUBTYPE_STOP))||((tokens2.previous().type==TOK_TYPE_SUBEXPR)&&(tokens2.previous().subtype==TOK_SUBTYPE_STOP))||(tokens2.previous().type==TOK_TYPE_OP_POST)||(tokens2.previous().type==TOK_TYPE_OPERAND)){
          token.subtype=TOK_SUBTYPE_MATH;
        }else {
          token.type=TOK_TYPE_OP_PRE;
        }
      }
      continue ;
    }
    if((token.type==TOK_TYPE_OP_IN)&&(token.value=="+")){
      if(tokens2.BOF()){
        token.type=TOK_TYPE_NOOP;
      }else {
        if(((tokens2.previous().type==TOK_TYPE_FUNCTION)&&(tokens2.previous().subtype==TOK_SUBTYPE_STOP))||((tokens2.previous().type==TOK_TYPE_SUBEXPR)&&(tokens2.previous().subtype==TOK_SUBTYPE_STOP))||(tokens2.previous().type==TOK_TYPE_OP_POST)||(tokens2.previous().type==TOK_TYPE_OPERAND)){
          token.subtype=TOK_SUBTYPE_MATH;
        }else {
          token.type=TOK_TYPE_NOOP;
        }
      }
      continue ;
    }
    if((token.type==TOK_TYPE_OP_IN)&&(token.subtype.length==0)){
      if(("<>=").indexOf(token.value.substr(0,1))!=-1){
        token.subtype=TOK_SUBTYPE_LOGICAL;
      }else {
        if(token.value=="&"){
          token.subtype=TOK_SUBTYPE_CONCAT;
        }else {
          token.subtype=TOK_SUBTYPE_MATH;
        }
      }
      continue ;
    }
    if((token.type==TOK_TYPE_OPERAND)&&(token.subtype.length==0)){
      if(isNaN(parseFloat(token.value))){
        if((token.value=="TRUE")||(token.value=="FALSE")){
          token.subtype=TOK_SUBTYPE_LOGICAL;
        }else {
          token.subtype=TOK_SUBTYPE_RANGE;
        }
      }else {
        token.subtype=TOK_SUBTYPE_NUMBER;
      }
      continue ;
    }
    if(token.type==TOK_TYPE_FUNCTION){
      if(token.value.substr(0,1)=="@"){
        token.value=token.value.substr(1);
      }
      continue ;
    }
  }
  tokens2.reset();
  tokens=new f_tokens();
  while(tokens2.moveNext()){
    if(tokens2.current().type!=TOK_TYPE_NOOP){
      tokens.addRef(tokens2.current());
    }
  }
  tokens.reset();
  return tokens;
}
var TYPE_GENERAL=0;
var TYPE_ERROR=4;
var TYPE_STRING=1;
var TYPE_NUMBER=2;
var TYPE_LOGIC=3;
function isNumeric(value){
  return !isNaN(Number(value));
}
//chenjiabin,添加oldFontStyleId,添加oldFormula
function Cell(row,column){
  var self=this;
  self.construct=function(row,column){
    this.row=row;
    this.column=column;
    this.formula=undefined;
	//value要为string类型，不然当为数字0时在表格中将不显示
    this.value=undefined;
	this.oldFormula = undefined;
    this.formatedValue=undefined;
    this.decimals=undefined;
    this.type=TYPE_GENERAL;
    this.valueType=TYPE_GENERAL;
    this.fontStyleId=0;
	this.oldFontStyleId=0;
    this.layerStyleId=0;
    this.references=new Array();
  };
  self.processType=function(){
    if(this.value==undefined){
      this.valueType=this.type;
    }else {
      if(this.type==TYPE_STRING){
        this.valueType=TYPE_STRING;
      }else {
        if(isNumeric(this.value)){
          this.valueType=TYPE_NUMBER;
        }else {
          var strValue=this.value.toUpperCase();
          if(strValue=="TRUE"||strValue=="FALSE"){
            this.valueType=TYPE_LOGIC;
          }else {
            if(strValue[0]=="#"){
              if((",#NULL!,#DIV/0!,#VALUE!,#REF!,#NAME?,#NUM!,#N/A,").indexOf(","+strValue+",")!=-1){
                this.valueType=TYPE_ERROR;
              }else {
                this.valueType=TYPE_STRING;
              }
            }else {
              this.valueType=TYPE_STRING;
            }
          }
        }
      }
    }
  };
  self.isNumeric=function(){
    return (this.valueType==TYPE_NUMBER);
  };
  self.setType=function(type){
    this.type=type;
    self.processType();
  };
  self.getType=function(){
    return this.type;
  };
  self.getValueType=function(){
    return this.valueType;
  };
  self.getValueTypeName=function(){
    switch(self.valueType){
    case TYPE_ERROR:
      return "ERROR";
    case TYPE_NUMBER:
      return "NUMBER";
    case TYPE_LOGIC:
      return "LOGICAL";
    case TYPE_STRING:
      return "TEXT";
    default:
      return "GENERAL";
    }
  };
  self.deleteContents=function(){
    self.clearReferences();
    self.formula=self.value=self.formattedValue=undefined;
  };
  //这里没有计算，计算在Sheet中实现
  self.calculate=function(){
    if(this.formula!=undefined){
      if(this.formula.charAt(0)=="="){
        var ref=this.formula.substr(1);
        this.value=ref;
      }else {
        this.value=this.formula;
      }
    }
  };
  self.addReference=function(reference){
    this.references.push(reference);
  };
  self.clearReferences=function(reference){
    delete this.references;
    this.references=new Array();
  };
  self.getReferences=function(){
    return this.references;
  };
  self.getFontStyleId=function(){
    return this.fontStyleId;
  };
  self.setFontStyleId=function(fontStyleId){
    this.fontStyleId=fontStyleId;
  };
  self.getOldFontStyleId=function(){
    return this.oldFontStyleId;
  };
  self.setOldFontStyleId=function(fontStyleId){
    this.oldFontStyleId=fontStyleId;
  };
  self.getLayerStyleId=function(){
    return this.layerStyleId;
  };
  self.setLayerStyleId=function(layerStyleId){
    this.layerStyleId=layerStyleId;
  };
  self.getValue=function(){
    return this.value;
  };
  self.getRawValue=function(){
    return this.value;
  };
  self.getFormattedValue=function(){
    return this.formattedValue;
  };
  self.getFormula=function(){
    return this.formula;
  };
  self.getOldFormula=function(){
	return this.oldFormula;
  }
  self.setOldFormula=function(formula,fontId){
	this.oldFormula = formula;
  }
   //这里的setFormula与Sheet类里面的setFormula不同
  self.setFormula=function(value){
    self.formula=value;
    self.calculate();//这里没有进行计算
    self.formatValue();
  };
  self.setDecimals=function(decimals){
    if(decimals!=undefined){
      self.decimals=Number(decimals);
    }else {
      decimals==undefined;
    }
    self.formatValue();
  };
  self.getDecimals=function(){
    return self.decimals;
  };
  self.formatValue=function(){
    if(self.valueType==TYPE_NUMBER&&self.decimals!=undefined){
      self.formattedValue=Number(self.value).toFixed(self.decimals);
    }else {
      self.formattedValue=self.value;
    }
  };
  self.getFormattedValue=function(){
    return self.formattedValue;
  };
  self.setValue=function(value){
    this.value=value;
    try{
      this.processType();
      this.formatValue();
    }
    catch(e){
      alert(e.toSource());
    }
  };
  self.getRow=function(){
    return this.row;
  };
  self.getColumn=function(){
    return this.column;
  };
  self.construct(row,column);
  return self;
}
function Row(index){
  var self=this;
  self.construct=function(index){
    this.index=index;
    this.size=18;
  };
  self.setFontStyleId=function(fontStyleId){
    this.fontStyleId=fontStyleId;
  };
  self.getFontStyleId=function(){
    return this.fontStyleId;
  };
  self.setSize=function(size){
    this.size=size;
  };
  self.getSize=function(){
    return this.size;
  };
  self.addCell=function(cell){
    this.cells.push(cell);
  };
  self.getIndex=function(){
    return this.index;
  };
  self.construct(index);
  return self;
}
function Column(index){
  var self=this;
  self.construct=function(index){
    this.index=index;
    this.size=80;
    this.fontStyleId=0;
  };
  self.setFontStyleId=function(fontStyleId){
    this.fontStyleId=fontStyleId;
  };
  self.getFontStyleId=function(){
    return this.fontStyleId;
  };
  self.setSize=function(size){
    this.size=size;
  };
  self.getSize=function(){
    return this.size;
  };
  self.addCell=function(cell){
    this.cells.push(cell);
  };
  self.getIndex=function(){
    return this.index;
  };
  self.construct(index);
  return self;
}
var RNG_CELL=0;
var RNG_ROW=1;
var RNG_COLUMN=2;
//选择范围
window.Range = function(start,end){
  var self=this;
  this.start=start;
  this.end=end;
  self.isRow=function(){
    return this.start.col==undefined;
  };
  self.isColumn=function(){
    return this.start.row==undefined;
  };
  self.isCell=function(){
    return (this.start.row!=undefined)&&(this.start.row!=undefined);
  };
  self.getType=function(){
    if(this.start.row==undefined){
      return RNG_COLUMN;
    }else {
      if(this.start.col==undefined){
        return RNG_ROW;
      }else {
        return RNG_CELL;
      }
    }
  };
  //在start或end处坐标添加1
  self.add=function(row,col){
    if(this.start!=undefined){
      if(this.start.row!=undefined){
        this.start.row+=row;
      }
      if(this.start.col!=undefined){
        this.start.col+=col;
      }
    }
    if(this.end!=undefined){
      if(this.end.row!=undefined){
        this.end.row+=row;
      }
      if(this.end.col!=undefined){
        this.end.col+=col;
      }
    }
    return this;
  };
  //在start或end处坐标减去1
  self.sub=function(row,col){
    if(this.start!=undefined){
      if(this.start.row!=undefined){
        this.start.row-=row;
      }
      if(this.start.col!=undefined){
        this.start.col-=col;
      }
    }
    if(this.end!=undefined){
      if(this.end.row!=undefined){
        this.end.row-=row;
      }
      if(this.end.col!=undefined){
        this.end.col-=col;
      }
    }
    return this;
  };
  self.clone=function(){
    if(this.end!=undefined){
      return new Range({row:this.start.row,col:this.start.col},{row:this.end.row,col:this.end.col});
    }else {
      return new Range({row:this.start.row,col:this.start.col});
    }
  };
  //加入全部单元格
  self.addCells=function(cells){
    self.cells=cells;
    self.cells=function(row,col){
      return self.cells[row+self.start.row][col+self.start.col];
    };
  };
  //使range标准化，按start到end时，row和col是从左到右和从上到下
  self.normalize=function(){
    if(this.end==undefined){
      this.end={};
      this.end.row=this.start.row;
      this.end.col=this.start.col;
    }else {
      if(this.start.row>this.end.row){
        var temp=this.start.row;
        this.start.row=this.end.row;
        this.end.row=temp;
      }
      if(this.start.col>this.end.col){
        var temp=this.start.col;
        this.start.col=this.end.col;
        this.end.col=temp;
      }
    }
    return self;
  };
  //参数为row和col的格子是否在range里
  self.addressInside=function(row,col){
    self.normalize();
    return (row>=self.start.row&&row<=self.end.row)&&(col>=self.start.col&&col<=self.end.col);
  };
  return self;
}
function State(address,property,oldValue,newValue){
  this.address=address;
  this.property=property;
  this.oldValue=oldValue;
  this.newValue=newValue;
  return this;
}
function Store(){
  var self=this;
  self.construct=function(){
    this.transactions=new Array();
    this.currentId=-1;
    this.size=-1;
  };
  self.beginTransaction=function(){
    this.currentId++;
    this.size=this.currentId;
    this.transactions[this.currentId]=new Array();
  };
  self.add=function(state){
    if(this.transactions[this.currentId]){
      this.transactions[this.currentId].push(state);
    }
  };
  self.rollBack=function(){
    if(this.currentId>-1){
      this.currentId--;
    }
  };
  self.restore=function(){
    if(this.size>this.currentId){
      this.currentId++;
    }
  };
  self.canRestore=function(){
    return (this.size>this.currentId);
  };
  self.getCurrent=function(){
    if(this.currentId>-1){
      return this.transactions[this.currentId];
    }else {
      return new Array();
    }
  };
  self.construct();
  return self;
}
function SimpleStore(){
  var self=this;
  self.construct=function(){
    this.transactions=new Array();
    this.currentId=-1;
    this.size=-1;
  };
  self.beginTransaction=function(){
    this.currentId++;
    this.size=this.currentId;
    this.transactions[this.currentId]=undefined;
  };
  self.set=function(state){
    this.transactions[this.currentId]=state;
  };
  self.canRollBack=function(){
    return (this.currentId>-1);
  };
  self.rollBack=function(oldValue){
    if(this.currentId>-1){
      this.transactions[this.currentId]=oldValue;
      this.currentId--;
    }
  };
  self.restore=function(newValue){
    if(this.size>this.currentId){
      this.currentId++;
      var temp=this.transactions[this.currentId];
      this.transactions[this.currentId]=newValue;
      return temp;
    }
  };
  self.canRestore=function(){
    return (this.size>this.currentId);
  };
  self.getCurrent=function(){
    if(this.currentId>-1){
      return this.transactions[this.currentId];
    }else {
      return undefined;
    }
  };
  self.construct();
  return self;
}
var DIV_ZERO="#DIV/0!";
var NOT_NUM="#VALUE!";
var INVALID="#VALUE!";
var NAME="#NAME?";
function Funcion(name,params,callback,description,category){
  var self=this;
  self.construct=function(name,params,callback,description,category){
    this.name=name;
    this.count=params.length;
    this.required=0;
    this.description=(description)?description:"";
    this.category=(category)?category:"";
    for(var i=0;i<params.length;i++){
      var param=params[i];
      if(param.optional==true){
        this.required++;
      }
      switch(param.type){
      case "numeric":
        param.validateFn=isNumeric;
        break ;
      case "range":
        param.validateFn=function(value){
          return value&&value.length;
        };
      }
    }
    this.params=params;
    this.callback=callback;
  };
  self.validate=function(args){
    return true;
    var valid=true;
    if(args.length!=this.count){
      return false;
    }
    for(var i=0;i<args.length;i++){
      var param=this.params[i];
      valid=valid&&param.validateFn(args[i]);
    }
    return valid;
  };
  self.calc=function(params){
    if(self.validate(params)){
      return self.callback(params);
    }else {
      return INVALID;
    }
  };
  self.setDescription=function(desc){
    this.description=desc;
  };
  self.construct(name,params,callback,category,description);
  return self;
}
function FunctionHandler(){
  var self=this;
  self.construct=function(){
    this.functions={};
  };
  self.add=function(func){
    this.functions[func.name.toLowerCase()]=func;
  };
  self.get=function(func_name){
    return this.functions[func_name.toLowerCase()];
  };
  self.calc=function(func_name,params){
    var func=self.get(func_name);
    if(func){
      return func.calc(params);
    }else {
      return NAME;
    }
  };
  self.getFunctionList=function(){
    var result=new Array();
    for(var i in this.functions){
      result.push(["="+this.functions[i].name,"="+this.functions[i].name]);
    }
    return result;
  };
  self.getFunctionNameList=function(){
    var result=new Array();
    for(var i in this.functions){
      result.push([this.functions[i].name,this.functions[i].name,this.functions[i].category,this.functions[i].description]);
    }
    return result;
  };
  self.construct();
  return self;
}
function isEmpty(variable){
  if(variable==undefined){
    return true;
  }
  return (variable.length==0);
}
function isNumeric(variable){
  return (!isEmpty(variable)&&!isNaN(variable));
}
function isArray(a){
  return Object.prototype.toString.apply(a)==="[object Array]";
}
window.calculator=new FunctionHandler();
calculator.add(new Funcion("abs",[{type:"numeric"}],function(values){
  return Math.abs(values[0]);
},"math","<b>ABS(number)</b><br>数学函数绝对值."));
calculator.add(new Funcion("average",[{type:"numeric"}],function(values){
  var value=0;
  var total=0;
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      value+=parseFloat(values[i]);
      total++;
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            value+=parseFloat(values[i][j]);
          }
          total++;
        }
      }
    }
  }
  if(total){
    value=value/total;
  }else {
    value=DIV_ZERO;
  }
  return value;
},"statistical","<b>AVERAGE(number1;number2;...)</b><br>求平均数"));
calculator.add(new Funcion("count",[{type:"range"}],function(values){
  var total=0;
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      total++;
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            total++;
          }
        }
      }
    }
  }
  return total;
},"statistical","<b>COUNT(value1;value2;...)</b><br>单元格个数."));
calculator.add(new Funcion("counta",[{type:"range"}],function(values){
  var total=0;
  for(var i=0;i<values.length;i++){
    if(isEmpty(values[i])){
      total++;
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(!isEmpty(values[i][j])){
            total++;
          }
        }
      }
    }
  }
  return total;
},"statistical","<b>COUNTA(value1;value2;...)</b><br>单元格个数."));
calculator.add(new Funcion("cos",[{type:"numeric"}],function(values){
  return Math.cos(values[0]);
},"math","<b>COS(number)</b><br>数学函数cos."));
calculator.add(new Funcion("max",[{type:"range"}],function(values){
  var value=(isArray(values[0]))?parseFloat(values[0][0]):parseFloat(values[0]);
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      if(value<values[i]){
        value=parseFloat(values[i]);
      }
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            if(value<parseFloat(values[i][j])){
              value=parseFloat(values[i][j]);
            }
          }
        }
      }
    }
  }
  return value;
},"statistical","<b>MAX(number1;number2;...)</b><br>求最大值。"));
calculator.add(new Funcion("maxa",[{type:"range"}],function(values){
  return calculator.calc("max",values);
},"statistical","<b>MAXA(value1;value2;...)</b><br>求最大值。"));
calculator.add(new Funcion("min",[{type:"range"}],function(values){
  var value=(isArray(values[0]))?parseFloat(values[0][0]):parseFloat(values[0]);
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      if(value>values[i]){
        value=parseFloat(values[i]);
      }
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            if(value>parseFloat(values[i][j])){
              value=parseFloat(values[i][j]);
            }
          }
        }
      }
    }
  }
  return value;
},"statistical","<b>MIN(number1;number2;...)</b><br>单元格最小值."));
calculator.add(new Funcion("mina",[{type:"range"}],function(values){
  return calculator.calc("min",values);
},"math","<b>MINA(value1;value2;...)</b><br>单元格中最小数."));
calculator.add(new Funcion("product",[{type:"range"}],function(values){
  var value=1;
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      value*=parseFloat(values[i]);
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            value*=parseFloat(values[i][j]);
          }
        }
      }
    }
  }
  return value;
},"math","<b>PRODUCT(number1;number2;...)</b><br>单元格求积."));
calculator.add(new Funcion("sum",[{type:"range"}],function(values){
  var value=0;
  for(var i=0;i<values.length;i++){
    if(isNumeric(values[i])){
      value+=parseFloat(values[i]);
    }else {
      if(isArray(values[i])){
        for(var j=0;j<values[i].length;j++){
          if(isNumeric(values[i][j])){
            value+=parseFloat(values[i][j]);
          }
        }
      }
    }
  }
  return value;
},"math","<b>SUM(number1;number2;...)</b><br>单元格求和."));
calculator.add(new Funcion("sin",[{type:"numeric"}],function(values){
  return Math.sin(values[0]);
}));
calculator.add(new Funcion("sqrt",[{type:"numeric"}],function(values){
  return Math.sqrt(value[0]);
}));

//语言定义
var lang_array = new Array() ; 
lang_array['application_welcome']= '欢迎使用久久电子表格' ; 
lang_array['bold']= '黑体' ; 
lang_array['New_Book_Dialog_Title']= '新建一个表格?' ; 
lang_array['New_Book_Dialog_Text']= '你没有保存现有数据。新建表格会丢失所有现有数据。' ; 
lang_array['Do_you_want_to_continue']= '是否继续?' ; 

function lang( term ) {
	if ( lang_array[term] == undefined ) {
		return term ;
	}else  {
		return lang_array[term] ;
	}
}

})();//funciton end;
