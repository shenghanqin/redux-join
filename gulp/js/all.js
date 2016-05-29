"use strict";accountAppAnimations.animation(".content",["$rootScope","$timeout",function(t,i){return{enter:function(e,a){var o=e.height(),n=e.outerHeight(),s=t.isRefresh?0:500;return e.css({height:t.height}),e.animate({height:o},{duration:s,queue:!1,easing:"easeOutQuart",complete:function(){e.css({height:"auto"}),t.height=e.height()}}),$(".dialog").animate({"margin-top":-(n+69)/2},{duration:s,queue:!1,easing:"easeOutQuart"}),t.isRefresh?void(t.isRefresh=!1):void(jQuery.support.opacity?(e.css({opacity:0}),i(function(){e.animate({opacity:1},300,a)},s)):(e.show(),a()))},leave:function(i,e){t.isFirstSwitch=!0,i.css({position:"absolute"}),jQuery.support.opacity?i.animate({opacity:0},100,e):(i.hide(),e())}}}]).animation(".animate-switch",["$rootScope","$timeout",function(t,i){return{enter:function(e,a){if(!t.isFirstSwitch){e=e.parents(".content");var o=e.height(),n=e.outerHeight(),s=500;e.css({height:t.height}),e.animate({height:o},{duration:s,queue:!1,easing:"easeOutQuart",complete:function(){e.css({height:"auto"}),t.height=e.height()}}),$(".dialog").animate({"margin-top":-(n+69)/2},{duration:s,queue:!1,easing:"easeOutQuart"}),jQuery.support.opacity?(e.css({opacity:0}),i(function(){e.animate({opacity:1},300)},s,a)):(e.show(),a())}},leave:function(i,e){t.isFirstSwitch=!1,i.css({position:"absolute"}),jQuery.support.opacity?i.animate({opacity:0},100,e):(i.hide(),e())}}}]);
"use strict";var accountApp=angular.module("accountApp",["ngRoute","ngAnimate","accountApp.services","accountApp.directives","accountApp.controllers","accountApp.animations","analytics"]),accountAppControllers=angular.module("accountApp.controllers",[]),accountAppDirectives=angular.module("accountApp.directives",[]),accountAppServices=angular.module("accountApp.services",[]),accountAppAnimations=angular.module("accountApp.animations",[]);accountApp.config(["$compileProvider",function(){}]).config(["$httpProvider",function(t){t.interceptors.push("Interceptor")}]).config(["$routeProvider",function(t){t.when("/register",{templateUrl:"partials/register.html",controller:"RegisterCtrl",title:"用户注册"}),t.when("/register/embed",{templateUrl:"partials/register.html",controller:"RegisterCtrl",title:"用户注册"}),t.when("/login",{templateUrl:"partials/login.html",controller:"LoginCtrl",title:"用户登录"}),t.when("/login/embed",{templateUrl:"partials/login.html",controller:"LoginCtrl",title:"用户登录"}),t.when("/login/:action",{templateUrl:"partials/login.html",controller:"LoginCtrl",title:"用户登录"}),t.when("/logout/embed",{template:"",controller:"LogoutCtrl",title:"用户退出"}),t.when("/modifyPassword",{templateUrl:"partials/modifyPassword.html",controller:"ModifyPasswordCtrl",title:"修改密码",userRequired:!0}),t.when("/modifyMobile",{templateUrl:"partials/modifyMobile.html",controller:"ModifyMobileCtrl",title:"修改手机",userRequired:!0}),t.when("/modifyMail",{templateUrl:"partials/modifyMail.html",controller:"ModifyMailCtrl",title:"修改邮箱",userRequired:!0}),t.when("/modifyQuestion",{templateUrl:"partials/modifyQuestion.html",controller:"ModifyQuestionCtrl",title:"设置安全问题",userRequired:!0}),t.when("/forgotPassword",{templateUrl:"partials/forgotPassword.html",controller:"ForgotPasswordCtrl",title:"忘记密码"}),t.when("/auth/:channelID",{templateUrl:"partials/auth.html",controller:"AuthCtrl",title:"安全验证",userRequired:!0,resolve:{userAuths:["Request",function(t){return t.getUserAuths()}]}}),t.when("/result/:channelID",{templateUrl:"partials/result.html",title:"修改成功",controller:"ResultCtrl"}),t.otherwise({redirectTo:"/result/illegality"})}]),accountApp.run(["$rootScope","$route","$location","$timeout","$window","Loading",function(t,e,l,r,o,i){t.$on("$routeChangeStart",function(){i.start()}),t.$on("$routeChangeSuccess",function(){t.title=e.current.title,jQuery.support.leadingWhitespace||(o.document.title=e.current.title+" - 锤子科技"),i.done(),$(".dialog").show()})}]);
"use strict";accountAppDirectives.directive("iAutoFocus",["$timeout",function(i){return{restrict:"A",require:"ngModel",link:function(e,t){t&&i(function(){t.focus()},10)}}}]).directive("focusOn",["$timeout",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n){e.$watch(n.focusOn,function(e){e&&i(function(){t.focus()},10)})}}}]).directive("selectOn",["$timeout",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n){e.$watch(n.selectOn,function(e){e&&i(function(){t.select()},10)})}}}]).directive("iFocus",[function(){var i="i-focused";return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$focused=!1,a.$blurred=!1,t.on("focus",function(){t.addClass(i),e.$apply(function(){a.$focused=!0})}).on("blur",function(){t.removeClass(i),e.$apply(function(){a.$focused=!1,a.$blurred=!0})}).on("keydown",function(){e.$apply(function(){a.$blurred=!1})})}}}]).directive("iBlur",[function(){var i="i-blurred";return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$blurred=!1,t.on("keydown",function(){t.removeClass(i),e.$apply(function(){a.$blurred=!1})}).on("blur",function(){t.addClass(i),e.$apply(function(){a.$blurred=!0})})}}}]).directive("iInput",function(){return{restrict:"A",require:"ngModel",link:function(i,e,t,n){e.on("focus",function(){$(this).parent(".input").addClass("focus"),jQuery.support.opacity&&$(this).parent(".input").animate({opacity:1},{queue:!1,duration:300})}),e.on("blur",function(){if($(this).parent(".input").removeClass("focus"),!$(this).val()){if($(this).prev(".placeholder").show(),!jQuery.support.opacity)return;$(this).parent(".input").animate({opacity:.618},{queue:!1,duration:300})}}),e.on("keydown input",function(e){if($(this).prev(".placeholder").hide(),13!=e.which)switch(n.$submitted=!1,i.util.submitted=!1,i.errAnimation={},angular.forEach(i.focus,function(e,t){i.focus[t]=!1}),n.$name){case"username":i.invalid.nameValid=!0;break;case"password":i.invalid.passwordValid=!0;break;case"oldpassword":i.invalid.oldpasswordValid=!0;break;case"captcha":i.invalid.captchaValid=!0,i.invalid.captchaReload=!0;break;case"mobile":i.invalid.mobileRegistered=!0;break;case"mail":i.invalid.emailRegistered=!0;break;case"verification":i.invalid.mobileCaptchaValid=!0,i.invalid.mobileCaptchaReload=!0;break;case"answer1":case"answer2":i.invalid.answerInvalid=!0}}),i.$watch("util.submitted",function(i){i&&(n.$submitted=!0,n.$blurred=!0)})}}}).directive("iUsername",["Config",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return!e||i.regExp.isMail.test(e)||i.regExp.isMobile.test(e)?(a.$setValidity(a.$name,!0),e):void a.$setValidity(a.$name,!1)})}}}]).directive("iPassword",["Config",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return e=e||"",!e||i.regExp.isPassword.test(e)?(a.$setValidity("password",!0),e):void a.$setValidity("password",!1)})}}}]).directive("iRepassword",["Config",function(){return{restrict:"A",require:"ngModel",link:function(i,e,t,n){i.$watch(function(){return i.user&&i.user.repassword==i.user.password},function(i,e){i!=e&&(i?n.$setValidity("repassword",!0):n.$setValidity("repassword",!1))})}}}]).directive("iMobile",["Config",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return!e||i.regExp.isMobile.test(e)?(a.$setValidity(a.$name,!0),e):void a.$setValidity(a.$name,!1)})}}}]).directive("iMail",["Config",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return!e||i.regExp.isMail.test(e)?(a.$setValidity(a.$name,!0),e):void a.$setValidity(a.$name,!1)})}}}]).directive("iResponse",["Validate",function(i){return{restrict:"A",require:"ngModel",link:function(e,t,n,a){switch(a.$name){case"username":e.$watch("invalid.nameValid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("nameValid",!0):(a.$setValidity("nameValid",!1),i.checkErrNumber(e,e.form))});break;case"password":e.$watch("invalid.passwordValid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("passwordValid",!0):(a.$setValidity("passwordValid",!1),i.checkErrNumber(e,e.form))});break;case"oldpassword":e.$watch("invalid.oldpasswordValid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("oldpasswordValid",!0):(a.$setValidity("oldpasswordValid",!1),i.checkErrNumber(e,e.form))});break;case"captcha":e.$watch("invalid.captchaValid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("captchaValid",!0):(a.$setValidity("captchaValid",!1),i.checkErrNumber(e,e.form))}),e.$watch("invalid.captchaReload",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("captchaReload",!0):(a.$setValidity("captchaReload",!1),i.checkErrNumber(e,e.form))});break;case"mobile":e.$watch("invalid.mobileRegistered",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("mobileRegistered",!0):(a.$setValidity("mobileRegistered",!1),i.checkErrNumber(e,e.form))}),e.$watch("invalid.mobile",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("mobile",!0):(a.$setValidity("mobile",!1),i.checkErrNumber(e,e.form))});break;case"mail":e.$watch("invalid.emailRegistered",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("emailRegistered",!0):(a.$setValidity("emailRegistered",!1),i.checkErrNumber(e,e.form))}),e.$watch("invalid.mail",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("mail",!0):(a.$setValidity("mail",!1),i.checkErrNumber(e,e.form))});break;case"verification":e.$watch("invalid.mobileCaptchaValid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("mobileCaptchaValid",!0):(a.$setValidity("mobileCaptchaValid",!1),i.checkErrNumber(e,e.form))}),e.$watch("invalid.mobileCaptchaReload",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("mobileCaptchaReload",!0):(a.$setValidity("mobileCaptchaReload",!1),i.checkErrNumber(e,e.form))});break;case"answer1":case"answer2":e.$watch("invalid.answerInvalid",function(t){t="undefined"==typeof t?!0:t,t?a.$setValidity("answerInvalid",!0):(a.$setValidity("answerInvalid",!1),i.checkErrNumber(e,e.form))})}}}}]).directive("iShow",["$timeout",function(){return{restrict:"A",link:function(i,e,t){i.$watch(t.iShow,function(i){i?jQuery.support.opacity?e.stop().show().animate({opacity:1},{queue:!1,duration:300}):e.stop().show():jQuery.support.opacity?e.stop().animate({opacity:0},{duration:300,done:function(){e.hide()}}):e.stop().hide()})}}}]).directive("iWarning",[function(){return{restrict:"A",link:function(i,e,t){var n=e.parent(".input");i.$watch(t.iWarning,function(i,t){!!i!=!!t&&(i?(n.addClass("invalid"),jQuery.support.opacity?e.stop().show().animate({opacity:1},{queue:!1,duration:300}):e.stop().show()):(n.removeClass("invalid"),jQuery.support.opacity?e.stop().animate({opacity:0},{duration:300,done:function(){e.hide()}}):e.stop().hide()))})}}}]).directive("slideDown",["$timeout",function(){return{restrict:"A",link:function(i,e,t){i.$watch(t.slideDown,function(i){if(i){e.show();var t=e.parents(".content").outerHeight(),n=500;$(".dialog").animate({"margin-top":-(t+69)/2},{duration:n,queue:!1,easing:"easeOutQuart"}),e.hide().slideDown({duration:n,easing:"easeOutQuart"})}})}}}]).directive("iAnimation",[function(){return{restrict:"A",link:function(i,e,t){i.$watch(t.iAnimation,function(t){t&&(e.stop(!0).animate({left:"-15px"},50).animate({left:"20px"},80).animate({left:"-10px"},80).animate({left:"5px"},80).animate({left:"0px"},80),i.animationTip&&(i.animationTip=!1))})}}}]).directive("iEnter",[function(){return function(i,e,t){e.bind("keydown keypress",function(e){13==e.which&&(i.$apply(function(){i.$eval(t.iEnter,{event:e})}),e.preventDefault())})}}]).directive("limitLength",[function(){return{restrict:"A",require:"ngModel",link:function(i,e,t,n){n.$parsers.push(function(i){return i&&i.length!=+t.limitLength?void n.$setValidity("limitlength",!1):(n.$setValidity("limitlength",!0),i)})}}}]).directive("inputRadius",[function(){return{restrict:"A",link:function(i,e){e.find(":first").before('<div class="radius-left"></div><div class="radius-center"></div><div class="radius-right"></div>')}}}]).directive("btnRadius",[function(){return{restrict:"A",link:function(i,e){e.find(":first").before('<div class="radius-left"></div><div class="radius-right"></div>')}}}]).directive("iLabel",[function(){return{restrict:"A",link:function(i,e,t){var n=t.iLabel,a=n+"_mousedown";e.on("click",function(){$("#"+n).focus()}).on("mousedown",function(){i[a]=!0}).on("mouseup",function(){i[a]=!1})}}}]);