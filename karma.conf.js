module.exports = function (config) {
  config.set({
    basePath: "",

    frameworks: ["jasmine", "@angular-devkit/build-angular"],

    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],

    client: {
      clearContext: false, // mantén la pantalla de resultados de las pruebas en el navegador
    },

    jasmineHtmlReporter: {
      suppressAll: true, // suprime todos los informes de Jasmine que no sean errores
    },

    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "lcov" }, { type: "text-summary" }],
    },

    reporters: ["progress", "kjhtml"],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"], // Puedes cambiar a 'Firefox', 'Safari', etc. según lo que prefieras
    singleRun: false, // Cambia a 'true' para ejecución única
    restartOnFileChange: true,
  });
};
