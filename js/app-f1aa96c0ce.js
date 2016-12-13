/**
 * cardapp - cardset manager
 * @authors 
 * @version v0.0.0
 * @link 
 * @license 
 */
!function(){"use strict";angular.module("app",["app.core","app.login","app.signup","app.logout","app.home"])}(),function(){"use strict";angular.module("app.login",["app.core"])}(),function(){"use strict";angular.module("app.logout",["app.core"])}(),function(){"use strict";angular.module("app.signup",["app.core"])}(),function(){"use strict";angular.module("blocks.exception",["blocks.logger"])}(),function(){"use strict";angular.module("blocks.logger",[])}(),function(){"use strict";angular.module("blocks.router",["ui.router","blocks.logger"])}(),function(){"use strict";angular.module("app.core",["ngAnimate","ngSanitize","blocks.exception","blocks.logger","blocks.router","ui.router","ngplus","ngMaterial"])}(),function(){"use strict";angular.module("app.home",["app.core"])}(),function(){"use strict";function e(e,t,n,r,a,o,i,d,c,s){function l(){}var u=this;u.invalidEmail=!1,u.invalidPassword=!1,u.notVerifiy=!1,u.login=function(e){a.loginback(e).then(function(e){console.log(e);var r=c.localStorage;r.setItem("token",e.token),t.setToken(e.token),i.setUser(e.user.username),n.go("dash",{userid:e.user.username})},function(e){"Invalid_email"===e?(u.invalidPassword=!1,u.notVerifiy=!1,u.invalidEmail=!0):"Invalid_password"===e?(u.invalidEmail=!1,u.notVerifiy=!1,u.invalidPassword=!0):"not_verifiy"===e&&(u.notVerifiy=!0,u.invalidEmail=!1,u.invalidPassword=!1)})},l()}angular.module("app.login").controller("LoginController",e),e.$inject=["logger","authtokenService","$state","$http","loginService","$rootScope","authUsersService","headerTokens","$window","$location"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"login",config:{url:"/",templateUrl:"app/auth/login/login.html",controller:"LoginController as vm",title:"login"}}]}angular.module("app.login").run(e),e.$inject=["routerHelper","$window"]}(),function(){"use strict";function e(e,t,n,r,a){var o={loginback:function(t){var a=e({method:"post",url:n.serverUrl+"/login",data:t});return a.then(r.handleSuccess,r.handleError)}};return o}angular.module("app.login").factory("loginService",e),e.$inject=["$http","$q","apiService","requestService","$window"]}(),function(){"use strict";function e(e,t,n,r){t.removeToken(),n.removeUser(),r.userId="",r.userToken="",e.go("login")}angular.module("app.logout").controller("LogoutController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"logout",config:{url:"/logout",templateUrl:"app/auth/logout/logout.html",controller:"LogoutController as vm",title:"logout",data:{requireLogin:!0}}}]}angular.module("app.logout").run(e),e.$inject=["routerHelper"]}(),function(){function e(e,t,n,r,a,o,i){var d=this;d.signup=function(o){t.newUserCreate(o).then(function(t){n.setToken(t.token),a.setUser(t.user.username),r.go("login"),e.info("Regitration Successful! Please login.")},function(e){})}}angular.module("app.signup").controller("signupController",e),e.$inject=["logger","signupService","authtokenService","$state","authUsersService","$timeout","$rootScope"]}(),function(){"use strict";function e(e){e.configureStates(t())}function t(){return[{state:"signup",config:{url:"/signup",templateUrl:"app/auth/signup/signup.html",controller:"signupController as vm",title:"signup",data:{requireLogin:!1}}}]}angular.module("app.signup").run(e),e.$inject=["routerHelper"]}(),function(){"use strict";function e(e,t,n,r){function a(t){var a=e({method:"post",url:n.serverUrl+"/register",data:t});return a.then(r.handleSuccess,r.handleError)}return{newUserCreate:a}}angular.module("app.signup").factory("signupService",e),e.$inject=["$http","$q","apiService","requestService"]}(),function(){"use strict";function e(){this.config={appErrorPrefix:void 0},this.configure=function(e){this.config.appErrorPrefix=e},this.$get=function(){return{config:this.config}}}function t(e){e.decorator("$exceptionHandler",n)}function n(e,t,n){return function(r,a){var o=t.config.appErrorPrefix||"",i={exception:r,cause:a};r.message=o+r.message,e(r,a),n.error(r.message,i)}}angular.module("blocks.exception").provider("exceptionHandler",e).config(t),t.$inject=["$provide"],n.$inject=["$delegate","exceptionHandler","logger"]}(),function(){"use strict";function e(e,t){function n(n){return function(r){var a,o;return r.data&&r.data.description&&(a="\n"+r.data.description,o=n+a),r.data.description=o,t.error(o),e.reject(r)}}var r={catcher:n};return r}e.$inject=["$q","logger"],angular.module("blocks.exception").factory("exception",e)}(),function(){"use strict";function e(e,t){function n(n,r,a){t.error(n,a),e.error("Error: "+n,r)}function r(n,r,a){t.info(n,a),e.info("Info: "+n,r)}function a(n,r,a){t.success(n,a),e.info("Success: "+n,r)}function o(n,r,a){t.warning(n,a),e.warn("Warning: "+n,r)}var i={showToasts:!0,error:n,info:r,success:a,warning:o,log:e.log};return i}angular.module("blocks.logger").factory("logger",e),e.$inject=["$log","toastr"]}(),function(){"use strict";function e(e,t,n){function r(e,r,o,i){function d(e,r){e.forEach(function(e){e.config.resolve=angular.extend(e.config.resolve||{},a.resolveAlways),t.state(e.state,e.config)}),r&&!p&&(p=!0,n.otherwise(r))}function c(){r.$on("$stateChangeError",function(t,n,r,a,o,d){if(!m){g.errors++,m=!0;var c=n&&(n.title||n.name||n.loadedTemplateUrl)||"unknown target",s="Error routing to "+c+". "+(d.data||"")+". <br/>"+(d.statusText||"")+": "+(d.status||"");i.warning(s,[n]),e.path("/")}})}function s(){c(),u()}function l(){return o.get()}function u(){r.$on("$stateChangeSuccess",function(e,t,n,o,i){g.changes++,m=!1;var d=a.docTitle+" "+(t.title||"");r.title=d})}var m=!1,p=!1,g={errors:0,changes:0},v={configureStates:d,getStates:l,stateCounts:g};return s(),v}var a={docTitle:void 0,resolveAlways:{}};window.history&&window.history.pushState||(window.location.hash="/"),e.html5Mode(!0),this.configure=function(e){angular.extend(a,e)},this.$get=r,r.$inject=["$location","$rootScope","$state","logger"]}angular.module("blocks.router").provider("routerHelper",e),e.$inject=["$locationProvider","$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("app.core").directive("upperCase",[function(){return{restrict:"A",require:"ngModel",link:function(e,t,n,r){function a(e){if(r.$isEmpty(e))return e;var t=e.toLowerCase();return r.$viewValue!==t&&(r.$setViewValue(t),r.$render()),t}function o(e){return r.$isEmpty(e)?e:e.toLowerCase()}t.on("keypress",function(e){var t=e["char"]||String.fromCharCode(e.charCode),n=/^([A-Z]\b|(!^[A-Z0-9]*)\b[A-Z0-9]+\b(?![A-Z0-9 ])$)/i;if(n.test(t))return e.preventDefault(),!1}),r.$formatters.push(o),r.$parsers.push(a)}}}])}(),function(){"use strict";angular.module("app.core").directive("myEnter",function(){return function(e,t,n){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.myEnter)}),t.preventDefault())})}})}(),function(){"use strict";function e(e){e.options.timeOut=4e3,e.options.positionClass="toast-bottom-right"}function t(e,t,n){e.debugEnabled&&e.debugEnabled(!0),n.configure(r.appErrorPrefix),t.configure({docTitle:r.appTitle+": "})}var n=angular.module("app.core");n.config(e),e.$inject=["toastr"];var r={appErrorPrefix:"[app error] ",appTitle:"Cardset"};n.value("config",r),n.config(t),t.$inject=["$logProvider","routerHelperProvider","exceptionHandlerProvider"]}(),function(){"use strict";angular.module("app.core").constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function e(e){var n="/404";e.configureStates(t(),n)}function t(){return[{state:"404",config:{url:"/404",template:"404 not found",title:"404",data:{requireLogin:void 0}}}]}e.$inject=["routerHelper"],angular.module("app.core").run(e)}(),function(){"use strict";function e(e){var t,n,r=e.localStorage,a="userToken";return n={setToken:function(e){t=e,r.setItem(a,e)},getToken:function(){if(!t)return t=r.getItem(a)},isAuthenticated:function(){return!!n.getToken()},removeToken:function(){t=null,r.removeItem(a)}}}angular.module("app.core").factory("authtokenService",e),e.$inject=["$window"]}(),function(){"use strict";function e(e){var t,n=e.localStorage,r="userId",a={setUser:function(e){t=e,n.setItem(r,e)},getUser:function(){if(!t)return t=n.getItem(r)},removeUser:function(){t=null,n.removeItem(r)}};return a}angular.module("app.core").factory("authUsersService",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t,n,r){function a(r){var a=e({method:"get",url:t.serverUrl+"/requirelogin",headers:r});return a.then(n.handleSuccess,n.handleError)}return{requireLogin:a}}angular.module("app.core").factory("ensureAuthentication",e),e.$inject=["$http","apiService","requestService","headerTokens"]}(),function(){"use strict";angular.module("app.core").factory("headerTokens",["$window",function(e){var t=e.localStorage.getItem("userId"),n=e.localStorage.getItem("userToken");return{userId:t,userToken:n}}])}(),function(){"use strict";function e(e){function t(e){return e.data}function n(t){return angular.isObject(t.data)&&t.data.message?e.reject(t.data.message):e.reject("An unknown error occurred.")}return{handleSuccess:t,handleError:n}}angular.module("app.core").factory("requestService",e),e.$inject=["$q"]}(),function(){"use strict";function e(){return{serverUrl:"https://rocky-refuge-60790.herokuapp.com",bucketUrl:"https://prodbiz.s3.amazonaws.com"}}angular.module("app.core").factory("apiService",e),e.$inject=[]}(),function(){"use strict";function e(e,t,n,r,a,o){var i=this;i.createCard=function(e){a.createCard(e).then(function(e){console.log(e)},function(e){})},i.createCardset=function(e){a.createCardSet(e).then(function(e){console.log(e)},function(e){})},i.getCards=function(){a.getCards().then(function(e){i.cards=e})},i.getcardsets=function(){a.getcardsets().then(function(e){i.cardsets=e})},i.getGroups=function(){o.getGroups().then(function(e){i.groups=e,console.log(e)})},i.updateCardset=function(e,t){a.updateCardset(e,t).then(function(e){console.log(e)},function(e){})}}angular.module("app.home").controller("CardController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens","cardService","peopleService"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"card",config:{url:"/card",templateUrl:"app/users/card/card.html",controller:"CardController as vm",title:"cards",data:{requireLogin:!0}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper","$state"]}(),function(){"use strict";function e(e,t,n,r){function a(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"post",url:n.serverUrl+"/createCard",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function o(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"post",url:n.serverUrl+"/createCardset",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function i(){var t={token:window.localStorage.getItem("userToken")},a=e({method:"get",url:n.serverUrl+"/cards",headers:t});return a.then(r.handleSuccess,r.handleError)}function d(){var t={token:window.localStorage.getItem("userToken")},a=e({method:"get",url:n.serverUrl+"/cardSets",headers:t});return a.then(r.handleSuccess,r.handleError)}function c(t,a){var o={token:window.localStorage.getItem("userToken")},i=e({method:"post",url:n.serverUrl+"/cardSet/"+a,data:t,headers:o});return i.then(r.handleSuccess,r.handleError)}return{createCard:a,createCardSet:o,getCards:i,getcardsets:d,updateCardset:c}}angular.module("app.home").factory("cardService",e),e.$inject=["$http","$q","apiService","requestService"]}(),function(){"use strict";function e(e,t,n,r,a){var o=this;o.createCard=function(e){a.createCard(e).then(function(e){console.log(e)},function(e){})},o.createCardset=function(e){a.createCardSet(e).then(function(e){console.log(e)},function(e){})},o.getCards=function(){a.getCards().then(function(e){o.cards=e,console.log(e)})}}angular.module("app.home").controller("DashController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens","cardService"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"dash",config:{url:"/dash",templateUrl:"app/users/dash/dash.html",controller:"DashController as vm",title:"dashboard",data:{requireLogin:!0}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper","$state"]}(),function(){"use strict";function e(e,t,n,r){}angular.module("app.home").controller("HomeController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"home",config:{url:"/home",templateUrl:"app/users/home/home.html",controller:"HomeController as vm",title:"home",data:{requireLogin:!1}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper","$state"]}(),function(){"use strict";function e(e,t,n,r,a,o,i){var d=this;d.createUser=function(e){o.createUser(e).then(function(e){console.log(e),i.info("User created successfully!")},function(e){})},d.createGroup=function(e){o.createGroup(e).then(function(e){console.log(e)},function(e){})},d.getCards=function(){a.getCards().then(function(e){d.cards=e,console.log(e)})}}angular.module("app.home").controller("PeopleController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens","cardService","peopleService","logger"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"people",config:{url:"/people",templateUrl:"app/users/people/people.html",controller:"PeopleController as vm",title:"people",data:{requireLogin:!0}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper","$state"]}(),function(){"use strict";function e(e,t,n,r){function a(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"post",url:n.serverUrl+"/register",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function o(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"post",url:n.serverUrl+"/createGroup",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function i(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"get",url:n.serverUrl+"/groups",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function d(t){var a={token:window.localStorage.getItem("userToken")},o=e({method:"get",url:n.serverUrl+"/users",data:t,headers:a});return o.then(r.handleSuccess,r.handleError)}function c(t,a){var o={token:window.localStorage.getItem("userToken")},i=e({method:"post",url:n.serverUrl+"/group/"+a,data:t,headers:o});return i.then(r.handleSuccess,r.handleError)}return{createUser:a,createGroup:o,getGroups:i,getUsers:d,updateGroup:c}}angular.module("app.home").factory("peopleService",e),e.$inject=["$http","$q","apiService","requestService"]}(),function(){"use strict";function e(e,t,n,r,a,o,i){var d=this;d.createUser=function(e){o.createUser(e).then(function(e){console.log(e),i.info("User created successfully!")},function(e){})},d.createGroup=function(e){o.createGroup(e).then(function(e){console.log(e)},function(e){})},d.getGroups=function(){o.getGroups().then(function(e){d.groups=e,console.log(e)})},d.getUsers=function(){o.getUsers().then(function(e){d.users=e,console.log(e)})},d.updateGroup=function(e,t){o.updateGroup(e,t).then(function(e){console.log(e)},function(e){})}}angular.module("app.home").controller("UserController",e),e.$inject=["$state","authtokenService","authUsersService","headerTokens","cardService","peopleService","logger"]}(),function(){"use strict";function e(e,n){e.configureStates(t())}function t(){return[{state:"user",config:{url:"/user",templateUrl:"app/users/people/user/user.html",controller:"UserController as vm",title:"user",data:{requireLogin:!0}}}]}angular.module("app.home").run(e),e.$inject=["routerHelper","$state"]}(),angular.module("app.core").run(["$templateCache",function(e){e.put("app/layout/layout.html","<div ui-view></div>"),e.put("app/auth/logout/logout.html",""),e.put("app/auth/login/login.html",'<div id=login><md-content class=bodycontent><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>User Log In</span></md-card-title-text></md-card-title><form name=loginForm novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Email</p><input type=email name=email ng-model=user.email required><div ng-messages=loginForm.email.$error role=alert multiple><div ng-message=required><span>Please enter your Email/Username</span></div></div></md-input-container><md-input-container class="md-icon-float md-block"><p>Password</p><input type=password name=password ng-model=user.password required><div ng-messages=loginForm.password.$error role=alert><div ng-message=required><span>Please enter your Password</span></div></div></md-input-container></div></md-card-content><md-card-actions><md-button ng-click=vm.login(user) ng-disabled="loginForm.$invalid || loginForm.$pristine">Login</md-button></md-card-actions></form><md-card-footer><span ui-sref=signup>Don\'t have an account? Create One</span></md-card-footer></md-card></div></md-content></div>'),e.put("app/auth/signup/signup.html",'<div id=login ng-conroller="signupController as vm"><md-content class=bodycontent><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Sign Up. Lets start here!</span></md-card-title-text></md-card-title><md-card-content><div><form class=my-form name=registerForm novalidate><md-input-container class="md-icon-float md-block"><md-icon>business_center</md-icon><input name=username placeholder=Username ng-model=vm.user.username required></md-input-container><md-input-container class=md-block><md-icon>email</md-icon><input type=email name=email ng-model=vm.user.email placeholder=Email ng-pattern="/^.+@.+\\..+$/" required><div role=alert><span ng-show=registerForm.email.$loading>Loading...</span> <span class=error ng-show=registerForm.email.$error.email>Not valid email!</span></div></md-input-container><md-input-container class=md-block><md-icon>https</md-icon><input type=password name=password id=password ng-model=vm.user.password placeholder=Password required></md-input-container><md-input-container class=md-block><md-icon>https</md-icon><input type=password name=passwordConfirm id=passwordConfirm placeholder="Confirm Password" ng-model=vm.user.confirmPassword pw-check=password required><div class=msg-block ng-show=registerForm.$error><span class=msg-error ng-show=registerForm.passwordConfirm.$error.pwmatch>Passwords don\'t match.</span></div></md-input-container></form></div></md-card-content><div class=button><md-button class="md-raised md-warn" ng-disabled="registerForm.$invalid || registerForm.$pristine" ng-click=vm.signup(vm.user)>Signup</md-button></div><md-card-footer><span ui-sref=login>Have an account? Login</span></md-card-footer></md-card></div></md-content></div>'),e.put("app/users/card/card.html",'<md-content class=md-padding><md-nav-bar md-selected-nav-item=currentNavItem nav-bar-aria-label="navigation links"><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=dash name=page1>Create Cards</md-nav-item><md-nav-item md-nav-click="goto(\'user\')" ui-sref=card name=page2>Manage Cardsets</md-nav-item><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=people name=page1>Create User</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=user name=page3>Manage Groups</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=logout name=page3>Logout</md-nav-item></md-nav-bar></md-content><div><md-content class=bodycontent style="float: left; width: 500px"><div class=contentwrap ng-init=vm.getcardsets()><md-card ng-repeat="set in vm.cardsets"><md-card-title><md-card-title-text><span class=md-headline>Cardset #{{$index+1}}</span> <span>{{set.name}}</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container ng-init=vm.getCards()><label>Choose cards</label><md-select ng-model=cardset.cards md-on-close=clearSearchTerm() data-md-container-class=selectdemoSelectHeader multiple><md-optgroup label><md-option ng-value=card._id ng-repeat="card in vm.cards">{{card.name}}</md-option></md-optgroup></md-select></md-input-container><md-input-container class="md-icon-float md-block"><p>Carset status</p><md-select ng-model=cardset.status placeholder={{set.status}} class=md-no-underline><md-option value=draft>Draft</md-option><md-option value=ready>Ready</md-option><md-option value=archive>Archive</md-option></md-select></md-input-container><md-input-container ng-init=vm.getGroups()><label>Share with group</label><md-select ng-model=cardset.groups md-on-close=clearSearchTerm() data-md-container-class=selectdemoSelectHeader multiple><md-optgroup label><md-option ng-value=group._id ng-repeat="group in vm.groups">{{group.name}}</md-option></md-optgroup></md-select></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.updateCardset(cardset,set._id)>Update cardset</md-button></form><div style="width: 100%;"><h2>current cards</h2><span ng-repeat="card in set.cards track by $index"><small>#{{card.name}},</small></span></div></md-card></div></md-content></div>'),e.put("app/users/dash/dash.html",'<md-content class=md-padding><md-nav-bar md-selected-nav-item=currentNavItem nav-bar-aria-label="navigation links"><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=dash name=page1>Create Cards</md-nav-item><md-nav-item md-nav-click="goto(\'user\')" ui-sref=card name=page2>Manage Cardsets</md-nav-item><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=people name=page1>Create User</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=user name=page3>Manage Groups</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=logout name=page3>Logout</md-nav-item></md-nav-bar></md-content><div id=login><md-content class=bodycontent style="float: left;"><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a card</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Card name</p><input type=text name=name ng-model=card.name required></md-input-container><md-input-container class="md-icon-float md-block"><p>Card type</p><md-select ng-model=card.type placeholder=type class=md-no-underline><md-option value=text>Text</md-option><md-option value=image>Image</md-option></md-select></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createCard(card)>Create</md-button></form></md-card></div><div><md-button class="md-raised md-primary" ui-sref=card>Manage Cards</md-button></div></md-content><md-content class=bodycontent style="float: right;"><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a cardset</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Cardset name</p><input type=text name=name ng-model=cardset.name required></md-input-container><md-input-container ng-init=vm.getCards()><label>Choose cards</label><md-select ng-model=cardset.cards md-on-close=clearSearchTerm() data-md-container-class=selectdemoSelectHeader multiple><md-optgroup label><md-option ng-value=card._id ng-repeat="card in vm.cards">{{card.name}}</md-option></md-optgroup></md-select></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createCardset(cardset)>Create</md-button></form></md-card></div></md-content></div>'),e.put("app/users/home/home.html",'<div id=login><md-content class=bodycontent style="float: left;"><div class=contentwrap><md-list flex><md-subheader class=md-no-sticky>3 line item (with hover)</md-subheader><md-list-item class=md-3-line ng-click=null><md-button class="md-raised md-primary" ng-click=vm.createCard(card)>Card manage</md-button></md-list-item><md-divider></md-divider></md-list><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a card</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Card name</p><input type=text name=name ng-model=card.name required></md-input-container><md-input-container class="md-icon-float md-block"><p>Card type</p><md-select ng-model=card.type placeholder=type class=md-no-underline><md-option value=text>Text</md-option><md-option value=image>Image</md-option></md-select></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createCard(card)>Create</md-button></form></md-card></div></md-content><md-content class=bodycontent style="float: right;"><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a cardset</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Cardset name</p><input type=text name=name ng-model=cardset.name required></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createCardset(cardset)>Create</md-button></form></md-card></div></md-content></div>'),e.put("app/users/people/people.html",'<md-content class=md-padding><md-nav-bar md-selected-nav-item=currentNavItem nav-bar-aria-label="navigation links"><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=dash name=page1>Create Cards</md-nav-item><md-nav-item md-nav-click="goto(\'user\')" ui-sref=card name=page2>Manage Cardsets</md-nav-item><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=people name=page1>Create User</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=user name=page3>Manage Groups</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=logout name=page3>Logout</md-nav-item></md-nav-bar></md-content><div id=login><md-content class=bodycontent style="float: left;"><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a user</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>user name</p><input type=text name=name ng-model=user.username required></md-input-container><md-input-container class="md-icon-float md-block"><p>user email</p><input type=email name=name ng-model=user.email required></md-input-container><md-input-container class="md-icon-float md-block"><p>password</p><input type=password name=name ng-model=user.password required></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createUser(user)>Create</md-button></form></md-card></div><div><md-button class="md-raised md-primary" ui-sref=user>Manage user</md-button></div></md-content><md-content class=bodycontent style="float: right;"><div class=contentwrap><md-card id=loginwrap><md-card-title><md-card-title-text><span class=md-headline>Create a user group</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container class="md-icon-float md-block"><p>Group name</p><input type=text name=name ng-model=group.name required></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.createGroup(group)>Create</md-button></form></md-card></div></md-content></div>'),e.put("app/core/errors/404/404.html",'<div id=page404-v2><div id=inner-404><div class=wrapper><div class=img400><img src=/images/error/error_404.jpg></div><div class=text400><h2>Bad Request !!!</h2><p>The request could not be understood by the server due to malformed syntax.</p><p>Your browser sent a request that the server could not understand. The client should not repeat the request without modifications.</p><p class=goback>GO BACK TO HOME BY CLICKING BELOW:</p></div><div class=btndiv><a href="/" class=btn400>Home Page</a></div></div></div></div>'),e.put("app/users/people/user/user.html",'<md-content class=md-padding><md-nav-bar md-selected-nav-item=currentNavItem nav-bar-aria-label="navigation links"><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=dash name=page1>Create Cards</md-nav-item><md-nav-item md-nav-click="goto(\'user\')" ui-sref=card name=page2>Manage Cardsets</md-nav-item><md-nav-item md-nav-click="goto(\'dash\')" ui-sref=people name=page1>Create User</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=user name=page3>Manage Groups</md-nav-item><md-nav-item md-nav-click="goto(\'card\')" ui-sref=logout name=page3>Logout</md-nav-item></md-nav-bar></md-content><div><md-content class=bodycontent style="float: left; width: 500px"><div class=contentwrap ng-init=vm.getGroups()><md-card ng-repeat="group in vm.groups"><md-card-title><md-card-title-text><span class=md-headline>Group No #{{$index+1}}</span> <span>{{group.name}}</span></md-card-title-text></md-card-title><form novalidate><md-card-content><div><md-input-container ng-init=vm.getUsers()><label>Choose cards</label><md-select ng-model=group.users md-on-close=clearSearchTerm() data-md-container-class=selectdemoSelectHeader multiple><md-optgroup label><md-option ng-value=user._id ng-repeat="user in vm.users">{{user.username}}</md-option></md-optgroup></md-select></md-input-container></div></md-card-content><md-button class="md-raised md-primary" ng-click=vm.updateGroup(group,group._id)>Update Group</md-button></form><div style="width: 100%;"><h2>current users</h2><span ng-repeat="user in group.users track by $index"><small>#{{user.username}},</small></span></div></md-card></div></md-content></div>')}]);