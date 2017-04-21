require.config({
    
    baseUrl: 'www',
    
    paths : {
        
        ionic: 'lib/ionic/js/ionic.bundle',
        ngCordova: 'lib/ngCordova/dist/ng-cordova',
        cordova: 'cordova',
        angular: 'lib/angular/angular',
        app: 'js/app'
        
    },
    
    shim:{
        
        ionic: {exports: 'angular'},
        ngCordova: {exports: 'ngCordova'},
        cordova: {exports: 'cordova'},
        angular: {exports: 'angular'}
        
    }
  
});

require(['app'], function (app){
    
});