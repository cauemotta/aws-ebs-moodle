YUI.add("moodle-mod_quiz-repaginate",function(e,t){var n={REPAGINATECOMMAND:"#repaginatecommand"},r={CMID:"cmid",HEADER:"header",FORM:"form"},i=function(){i.superclass.constructor.apply(this,arguments)};e.extend(i,e.Base,{header:null,body:null,initializer:function(){var t=e.one(n.REPAGINATECOMMAND);this.header=t.getData(r.HEADER),this.body=t.getData(r.FORM),t.on("click",this.display_dialog,this)},display_dialog:function(e){e.preventDefault();var t={headerContent:this.header,bodyContent:this.body,draggable:!0,modal:!0,zIndex:1e3,context:[n.REPAGINATECOMMAND,"tr","br",["beforeShow"]],centered:!1,width:"30em",visible:!1,postmethod:"form",footerContent:null},r={dialog:null};r.dialog=new M.core.dialogue(t),r.dialog.show()}}),M.mod_quiz=M.mod_quiz||{},M.mod_quiz.repaginate=M.mod_quiz.repaginate||{},M.mod_quiz.repaginate.init=function(){return new i}},"@VERSION@",{requires:["base","event","node","io","moodle-core-notification-dialogue"]});
