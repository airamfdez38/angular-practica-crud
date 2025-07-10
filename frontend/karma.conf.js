// karma.conf.js
export default function(config) {
  config.set({
    // El modo de ejecución de las pruebas
    basePath: '',

    // Archivos y patrones a incluir en las pruebas
    files: [
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/zone-testing.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/rxjs/bundles/rxjs.umd.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',
      'src/**/*.js', // Archivos de tu aplicación
      'src/**/*.spec.js' // Archivos de pruebas
    ],

    // Marco de pruebas a utilizar
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // Navegadores en los que se ejecutarán las pruebas
    browsers: ['Chrome'],

    // Reportes de pruebas
    reporters: ['progress', 'kjhtml'],

    // Configuración de la portabilidad
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    // Configuración de plugins
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      '@angular-devkit/build-angular'
    ]
  });
}
