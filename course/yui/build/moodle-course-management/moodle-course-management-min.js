YUI.add("moodle-course-management",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}function r(e){n.superclass.constructor.apply(this,[e])}function i(){i.superclass.constructor.apply(this,arguments)}function s(){s.superclass.constructor.apply(this,arguments)}function o(){o.superclass.constructor.apply(this,arguments)}n.NAME="moodle-course-management",n.CSS_PREFIX="management",n.ATTRS={element:{setter:function(t){return typeof t=="string"&&(t=e.one("#"+t)),t}},categorylisting:{value:null},courselisting:{value:null},coursedetails:{value:null},activecategoryid:{value:null},activecourseid:{value:null},categories:{setter:function(t,n){if(e.Lang.isArray(t))return t;var r=this.get(n);return r.push(t),r},value:[]},courses:{validator:function(t){return e.Lang.isArray(t)},value:[]},page:{getter:function(e,t){return e===null&&(e=this.get("element").getData(t),this.set(t,e)),e},value:null},totalpages:{getter:function(e,t){return e===null&&(e=this.get("element").getData(t),this.set(t,e)),e},value:null},totalcourses:{getter:function(e,t){return e===null&&(e=this.get("element").getData(t),this.set(t,e)),e},value:null},ajaxurl:{getter:function(e){return e===null&&(e=M.cfg.wwwroot+"/course/ajax/management.php"),e},value:null},dragdrop:{value:null}},n.prototype={categoriesinit:!1,initializer:function(){this.set("element","coursecat-management");var e=this.get("element"),t=e.one("#category-listing"),n=e.one("#course-listing"),i=null,s=null;t&&(i=t.one('.listitem[data-selected="1"]')),n&&(s=n.one('.listitem[data-selected="1"]')),this.set("categorylisting",t),this.set("courselisting",n),this.set("coursedetails",e.one("#course-detail")),i&&this.set("activecategoryid",i.getData("id")),s&&this.set("activecourseid",s.getData("id")),this.initialiseCategories(t),this.initialiseCourses(),n&&this.set("dragdrop",new r({console:this}))},initialiseCategories:function(e){var t=0;if(!e)return!1;var n=e.one("#menumovecategoriesto");n&&n.setAttribute("disabled",!0);var r=e.one("#menuresortcategoriesby");r&&r.setAttribute("disabled",!0);var i=e.one("#menuresortcoursesby");i&&i.setAttribute("disabled",!0),e.all(".listitem[data-id]").each(function(e){this.set("categories",new s({node:e,console:this})),t++},this),this.categoriesinit||(this.get("categorylisting").delegate("click",this.handleCategoryDelegation,"a[data-action]",this),this.get("categorylisting").delegate("click",this.handleCategoryDelegation,'input[name="bcat[]"]',this),this.get("categorylisting").delegate("click",this.handleBulkSortByaction,"#menuselectsortby",this),this.categoriesinit=!0)},initialiseCourses:function(){var e=this.getCategoryById(this.get("activecategoryid")),t=this.get("courselisting"),n=0;if(!t)return!1;var r=t.one("#menumovecoursesto");r&&r.setAttribute("disabled",!0),t.all(".listitem[data-id]").each(function(t){this.registerCourse(new o({node:t,console:this,category:e})),n++},this),t.delegate("click",this.handleCourseDelegation,"a[data-action]",this),t.delegate("click",this.handleCourseDelegation,'input[name="bc[]"]',this)},registerCourse:function(e){var t=this.get("courses");t.push(e),this.set("courses",t)},handleCourseDelegation:function(e){var t=e.currentTarget,n=t.getData("action"),r=t.ancestor(".listitem").getData("id"),i=this.getCourseById(r);i&&i.handle(n,e)},handleCategoryDelegation:function(e){var t=e.currentTarget,n=t.getData("action"),r=t.ancestor(".listitem").getData("id"),i=this.getCategoryById(r);i&&i.handle(n,e)},isCourseSelected:function(e){var t=!1;if(e&&e.get("checked"))t=!0;else{var n,r,i=this.get("courses"),s=i.length;for(n=0;n<s;n++)if(i.hasOwnProperty(n)){r=i[n];if(r.get("node").one('input[name="bc[]"]').get("checked")){t=!0;break}}}return t},isCategorySelected:function(e){var t=!1;if(e&&e.get("checked"))t=!0;else{var n,r,i=this.get("categories"),s=i.length;for(n=0;n<s;n++)if(i.hasOwnProperty(n)){r=i[n];if(r.get("node").one('input[name="bcat[]"]').get("checked")){t=!0;break}}}return t},handleBulkSortByaction:function(e){var t=this.get("categorylisting").one("#menuresortcategoriesby"),n=this.get("categorylisting").one("#menuresortcoursesby"),r=this.get("categorylisting").one('input[name="bulksort"]'),i=e;i?e&&e.currentTarget&&(i=e.currentTarget):i=this.get("categorylisting").one("#menuselectsortby");if(!i)return;this.get("categories").length<=1||!this.isCategorySelected()&&i.get("options").item(i.get("selectedIndex")).getAttribute("value")==="selectedcategories"?(t&&t.setAttribute("disabled",!0),n&&n.setAttribute("disabled",!0),r&&r.setAttribute("disabled",!0)):(t&&t.removeAttribute("disabled"),n&&n.removeAttribute("disabled"),r&&r.removeAttribute("disabled"))},getCategoryById:function(e){var t,n,r=this.get("categories"),i=r.length;for(t=0;t<i;t++)if(r.hasOwnProperty(t)){n=r[t];if(n.get("categoryid")===e)return n}return!1},getCourseById:function(e){var t,n,r=this.get("courses"),i=r.length;for(t=0;t<i;t++)if(r.hasOwnProperty(t)){n=r[t];if(n.get("courseid")===e)return n}return!1},removeCourseById:function(e){var t=this.get("courses"),n=t.length,r,i;for(i=0;i<n;i++){r=t[i];if(r.get("courseid")===e){t.splice(i,1);break}}},performAjaxAction:function(t,n,r,i){var s=new e.IO;n.action=t,n.ajax="1",n.sesskey=M.cfg.sesskey,r===null&&(r=function(){}),s.send(this.get("ajaxurl"),{method:"POST",on:{complete:r},context:i,data:n,arguments:n})}},e.extend(n,e.Base,n.prototype),M.course=M.course||{},M.course.management=M.course.management||{},M.course.management.console=null,M.course.management.init=function(e){M.course.management.console=new n(e)},r.NAME="moodle-course-management-dd",r.CSS_PREFIX="management-dd",r.ATTRS={console:{writeOnce:"initOnly"}},r.prototype={goingup:!1,lasty:null,previoussibling:null,initializer:function(){var t=this.get("console"),n=t.get("element"),r=n.one("#category-listing"),i=n.one("#course-listing > .course-listing"),s=r?r.one("ul.ml"):null,o=i?i.one("ul.ml"):null,u=i?i.getData("canmoveoutof"):!1,a=u?n:o;if(!o)return!1;while(a.get("scrollHeight")===0&&!a.compareTo(window.document.body))a=
a.get("parentNode");o.all("> li").each(function(e){this.initCourseListing(e,a)},this),o.setData("dd",new e.DD.Drop({node:o})),u&&s&&s.all("li > div").each(function(e){this.initCategoryListitem(e)},this),e.DD.DDM.on("drag:start",this.dragStart,this),e.DD.DDM.on("drag:end",this.dragEnd,this),e.DD.DDM.on("drag:drag",this.dragDrag,this),e.DD.DDM.on("drop:over",this.dropOver,this),e.DD.DDM.on("drop:enter",this.dropEnter,this),e.DD.DDM.on("drop:exit",this.dropExit,this),e.DD.DDM.on("drop:hit",this.dropHit,this)},initCourseListing:function(t,n){t.setData("dd",(new e.DD.Drag({node:t,target:{padding:"0 0 0 20"}})).addHandle(".drag-handle").plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:!1}).plug(e.Plugin.DDConstrained,{constrain2node:n}))},initCategoryListitem:function(t){t.setData("dd",new e.DD.Drop({node:t}))},dragStart:function(e){var t=e.target,n=t.get("node"),r=t.get("dragNode");n.addClass("course-being-dragged"),r.addClass("course-being-dragged-proxy").set("innerHTML",n.one("a.coursename").get("innerHTML")),this.previoussibling=n.get("previousSibling")},dragEnd:function(e){var t=e.target,n=t.get("node");n.removeClass("course-being-dragged"),this.get("console").get("element").all("#category-listing li.highlight").removeClass("highlight")},dragDrag:function(e){var t=e.target.lastXY[1];t<this.lasty?this.goingup=!0:this.goingup=!1,this.lasty=t},dropOver:function(e){var t=e.drag.get("node"),n=e.drop.get("node"),r=n.get("tagName").toLowerCase();if(r==="li"&&n.hasClass("listitem-course")){if(!this.goingup){n=n.get("nextSibling");if(!n)return n=e.drop.get("node"),n.get("parentNode").append(t),!1}n.get("parentNode").insertBefore(t,n),e.drop.sizeShim()}},dropEnter:function(e){var t=e.drop.get("node"),n=t.get("tagName").toLowerCase();n==="div"&&t.ancestor("li.listitem-category").addClass("highlight")},dropExit:function(e){var t=e.drop.get("node"),n=t.get("tagName").toLowerCase();n==="div"&&t.ancestor("li.listitem-category").removeClass("highlight")},dropHit:function(e){var t=e.drag.get("node"),n=e.drop.get("node"),r=n.ancestor(".listitem-category")!==null,i=!r&&n.test(".listitem-course"),s=this.get("console"),o,u,a,f,l,c,h;if(!t.test(".listitem-course"))return!1;a=t.getData("id");if(r)o=n.ancestor(".listitem-category").getData("id"),u=s.getCategoryById(o),u&&(f=s.getCourseById(a),f&&u.moveCourseTo(f));else if(i||n.ancestor("#course-listing"))f=s.getCourseById(a),c=t.get("previousSibling"),l=c?c.getData("id")||0:0,h=this.previoussibling?this.previoussibling.getData("id"):0,l!==h&&f.moveAfter(l,h)}},e.extend(r,e.Base,r.prototype),i.NAME="moodle-course-management-item",i.CSS_PREFIX="management-item",i.ATTRS={node:{},console:{},itemname:{value:"item"}},i.prototype={highlighttimeout:null,checkAjaxResponse:function(t,n,r){if(n.status!==200)return!1;if(t===null||r===null)return!1;var i=e.JSON.parse(n.responseText);return i.error!==!1&&new M.core.exception(i),i.outcome===!1?!1:i},moveup:function(t,n,r){var i,s,o,u,a,f,l,c=this.checkAjaxResponse(t,n,r);if(c===!1)return!1;i=this.get("node"),u=i.previous(".listitem");if(u){u.insert(i,"before"),a=u.one(" > div a.action-moveup"),o=i.one(" > div a.action-movedown");if(!a||!o)s=i.one(" > div a.action-moveup"),f=u.one(" > div a.action-movedown"),!a&&!o?(l=e.Node.create('<a style="visibility:hidden;">&nbsp;</a>'),f.replace(l),s.replace(f),l.replace(s),l.destroy()):o||s.insert(f,"after");s=i.one(" > div a.action-moveup"),s?s.focus():(o=i.one(" > div a.action-movedown"),o&&o.focus()),this.updated(!0)}else window.location.reload()},movedown:function(t,n,r){var i,s,o,u,a,f,l,c=this.checkAjaxResponse(t,n,r);if(c===!1)return!1;i=this.get("node"),s=i.next(".listitem");if(s){i.insert(s,"before"),f=s.one(" > div a.action-movedown"),o=i.one(" > div a.action-moveup");if(!f||!o)a=s.one(" > div a.action-moveup"),u=i.one(" > div a.action-movedown"),!f&&!o?(l=e.Node.create('<a style="visibility:hidden;">&nbsp;</a>'),a.replace(l),u.replace(a),l.replace(u),l.destroy()):o||u.insert(a,"before");u=i.one(" > div a.action-movedown"),u?u.focus():(o=i.one(" > div a.action-moveup"),o&&o.focus()),this.updated(!0)}else window.location.reload()},show:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i;if(r===!1)return!1;this.markVisible(),i=this.get("node").one("a[data-action=hide]"),i&&i.focus(),this.updated()},markVisible:function(){return this.get("node").setAttribute("data-visible","1"),!0},hide:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i;if(r===!1)return!1;this.markHidden(),i=this.get("node").one("a[data-action=show]"),i&&i.focus(),this.updated()},markHidden:function(){return this.get("node").setAttribute("data-visible","0"),!0},updated:function(e){e&&this.highlight()},highlight:function(){var e=this.get("node");e.siblings(".highlight").removeClass("highlight"),e.addClass("highlight"),this.highlighttimeout&&window.clearTimeout(this.highlighttimeout),this.highlighttimeout=window.setTimeout(function(){e.removeClass("highlight")},2500)}},e.extend(i,e.Base,i.prototype),s.NAME="moodle-course-management-category",s.CSS_PREFIX="management-category",s.ATTRS={categoryid:{getter:function(e,t){return e===null&&(e=this.get("node").getData("id"),this.set(t,e)),e},value:null,writeOnce:!0},selected:{getter:function(e,t){return e===null&&(e=this.get("node").getData(t),e===null&&(e=!1),this.set(t,e)),e},value:null},courses:{validator:function(t){return e.Lang.isArray(t)},value:[]}},s.prototype={initializer:function(){this.set("itemname","category")},getName:function(){return this.get("node").one("a.categoryname").get("innerHTML")},registerCourse:function(e){var t=this.get("courses");t.push(e),this.set("courses",t)},handle:function(e,t){var n={categoryid:this.get("categoryid")},r=this.get("console").get("activecategoryid");r&&r!==n.categoryid&&(n.selectedcategory=r);switch(e){case"moveup":t.preventDefault(),this.get("console").performAjaxAction("movecategoryup",n,this.moveup,this);break;case"movedown":t.preventDefault(),this.get("console").performAjaxAction("movecategorydown",n,this.movedown,this
);break;case"show":t.preventDefault(),this.get("console").performAjaxAction("showcategory",n,this.show,this);break;case"hide":t.preventDefault(),this.get("console").performAjaxAction("hidecategory",n,this.hide,this);break;case"expand":t.preventDefault(),this.get("node").getData("expanded")==="0"&&(this.get("node").setAttribute("data-expanded","1").setData("expanded","true"),this.get("console").performAjaxAction("getsubcategorieshtml",n,this.loadSubcategories,this)),this.expand();break;case"collapse":t.preventDefault(),this.collapse();break;case"select":var i=this.get("console"),s=i.get("categorylisting").one("#menumovecategoriesto");s&&(i.isCategorySelected(t.currentTarget)&&i.get("categories").length>1?s.removeAttribute("disabled"):s.setAttribute("disabled",!0),i.handleBulkSortByaction());break;default:return!1}},expand:function(){var t=this.get("node"),n=t.one("a[data-action=expand]"),r=t.one("ul[role=group]");t.removeClass("collapsed").setAttribute("aria-expanded","true"),n.setAttribute("data-action","collapse").setAttrs({title:M.util.get_string("collapsecategory","moodle",this.getName())}),require(["core/str","core/templates","core/notification"],function(t,r,i){t.get_string("collapse","core").then(function(e){return r.renderPix("t/switch_minus","core",e)}).then(function(t){return t=e.Node.create(t).addClass("tree-icon").getDOMNode().outerHTML,n.set("innerHTML",t)}).fail(i.exception)}),r&&r.setAttribute("aria-hidden","false"),this.get("console").performAjaxAction("expandcategory",{categoryid:this.get("categoryid")},null,this)},collapse:function(){var t=this.get("node"),n=t.one("a[data-action=collapse]"),r=t.one("ul[role=group]");t.addClass("collapsed").setAttribute("aria-expanded","false"),n.setAttribute("data-action","expand").setAttrs({title:M.util.get_string("expandcategory","moodle",this.getName())}),require(["core/str","core/templates","core/notification"],function(t,r,i){t.get_string("expand","core").then(function(e){return r.renderPix("t/switch_plus","core",e)}).then(function(t){return t=e.Node.create(t).addClass("tree-icon").getDOMNode().outerHTML,n.set("innerHTML",t)}).fail(i.exception)}),r&&r.setAttribute("aria-hidden","true"),this.get("console").performAjaxAction("collapsecategory",{categoryid:this.get("categoryid")},null,this)},loadSubcategories:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i=this.get("node"),s=this.get("console"),o,u;return r===!1?!1:(i.append(r.html),s.initialiseCategories(i),M.core&&M.core.actionmenu&&M.core.actionmenu.newDOMNode&&M.core.actionmenu.newDOMNode(i),o=i.one("ul[role=group]"),u=i.one("a[data-action=collapse]"),o&&u&&u.setAttribute("aria-controls",o.generateID()),!0)},moveCourseTo:function(t){var n=this;e.use("moodle-core-notification-confirm",function(){var e=new M.core.confirm({title:M.util.get_string("confirm","moodle"),question:M.util.get_string("confirmcoursemove","moodle",{course:t.getName(),category:n.getName()}),yesLabel:M.util.get_string("move","moodle"),noLabel:M.util.get_string("cancel","moodle")});e.on("complete-yes",function(){e.hide(),e.destroy(),this.get("console").performAjaxAction("movecourseintocategory",{categoryid:this.get("categoryid"),courseid:t.get("courseid")},this.completeMoveCourse,this)},n),e.show()})},completeMoveCourse:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i=this.get("console"),s,o,u;return r===!1?!1:(o=i.getCourseById(n.courseid),o?(this.highlight(),o&&(r.paginationtotals&&(u=i.get("courselisting").one(".listing-pagination-totals"),u&&u.set("innerHTML",r.paginationtotals)),r.totalcatcourses!=="undefined"&&(u=this.get("node").one(".course-count span"),u&&u.set("innerHTML",u.get("innerHTML").replace(/^\d+/,r.totalcatcourses))),typeof r.fromcatcoursecount!="undefined"&&(s=i.get("activecategoryid"),s=i.getCategoryById(s),s&&(u=s.get("node").one(".course-count span"),u&&u.set("innerHTML",u.get("innerHTML").replace(/^\d+/,r.fromcatcoursecount)))),o.remove()),!0):!1)},show:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i;if(r===!1)return!1;this.markVisible(),i=this.get("node").one("a[data-action=hide]"),i&&i.focus(),r.categoryvisibility&&this.updateChildVisibility(r.categoryvisibility),r.coursevisibility&&this.updateCourseVisiblity(r.coursevisibility),this.updated()},hide:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i;if(r===!1)return!1;this.markHidden(),i=this.get("node").one("a[data-action=show]"),i&&i.focus(),r.categoryvisibility&&this.updateChildVisibility(r.categoryvisibility),r.coursevisibility&&this.updateCourseVisiblity(r.coursevisibility),this.updated()},updateCourseVisiblity:function(e){var t=this.get("console"),n,r;try{for(n in e)typeof e[n]=="object"&&(r=t.getCourseById(e[n].id),r&&(e[n].visible==="1"?r.markVisible():r.markHidden()))}catch(i){}return this},updateChildVisibility:function(e){var t=this.get("console"),n,r;try{for(n in e)typeof e[n]=="object"&&(r=t.getCategoryById(e[n].id),r&&(e[n].visible==="1"?r.markVisible():r.markHidden()))}catch(i){}return this}},e.extend(s,i,s.prototype),o.NAME="moodle-course-management-course",o.CSS_PREFIX="management-course",o.ATTRS={courseid:{},selected:{getter:function(e,t){return e===null&&(e=this.get("node").getData(t),this.set(t,e)),e},value:null},node:{},console:{writeOnce:"initOnly"},category:{writeOnce:"initOnly"}},o.prototype={initializer:function(){var e=this.get("node"),t=this.get("category");this.set("courseid",e.getData("id")),t&&t.registerCourse&&t.registerCourse(this),this.set("itemname","course")},getName:function(){return this.get("node").one("a.coursename").get("innerHTML")},handle:function(e,t){var n=this.get("console"),r={courseid:this.get("courseid")};switch(e){case"moveup":t.halt(),n.performAjaxAction("movecourseup",r,this.moveup,this);break;case"movedown":t.halt(),n.performAjaxAction("movecoursedown",r,this.movedown,this);break;case"show":t.halt(),n.performAjaxAction("showcourse",r,this.show,this);break;case"hide":t.halt(),n.performAjaxAction("hidecourse",r,this.hide,this);break;case"select":var i=this.get("console")
,s=i.get("courselisting").one("#menumovecoursesto");s&&(i.isCourseSelected(t.currentTarget)?s.removeAttribute("disabled"):s.setAttribute("disabled",!0));break;default:return!1}},remove:function(){this.get("console").removeCourseById(this.get("courseid")),this.get("node").remove()},moveAfter:function(e,t){var n=this.get("console"),r={courseid:this.get("courseid"),moveafter:e,previous:t};n.performAjaxAction("movecourseafter",r,this.moveAfterResponse,this)},moveAfterResponse:function(e,t,n){var r=this.checkAjaxResponse(e,t,n),i=this.get("node"),s;if(r===!1)return s=i.ancestor("ul").one("li[data-id="+n.previous+"]"),s?s.insertAfter(i,"after"):i.ancestor("ul").one("li").insert(i,"before"),!1;this.highlight()}},e.extend(o,i,o.prototype)},"@VERSION@",{requires:["base","node","io-base","moodle-core-notification-exception","json-parse","dd-constrain","dd-proxy","dd-drop","dd-delegate","node-event-delegate"]});
