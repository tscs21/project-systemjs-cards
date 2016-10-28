System.trace = true;

window.showModuleRelationships = function () {
  var modules = Object.keys(System.loads)
    .map(function (moduleName) {
      return System.loads[moduleName];
    });

  function displayName(module) {
    return module
    .replace(System.baseURL, "");
  }

  // function displayName(module) {
  //   var begin = module.lastIndexOf("/") + 1;
  //   var fileName = module.substr(begin);
  //   var name = (fileName) ? fileName : module;
  //   var matchExtension = /(.+?)(?:\.[^\.]*$|$)/;
  //   return name.match(matchExtension)[1];
  // }

  var moduleDefinitions = modules.map(function (module) {
    var name = displayName(module.name);
    return "[" + name + "|"+ module.metadata.format +"]";
  });

  var dependencyDefinitions = [];

  modules
    .filter(function (module) {
      return module.deps.length > 0;
    })
    .forEach(function (module) {
      var name = displayName(module.name);

      var dependencies = module.deps
        .map(function (dependancy) {
          return System.normalizeSync(dependancy, module.name, module.address);
        })
        .map(displayName)
        .map(function (dependencyName) {
          return "[" + name + "]->[" + dependencyName + "]"
        });

      dependencyDefinitions = dependencyDefinitions.concat(dependencies);
    });

  var definitions = moduleDefinitions.concat(dependencyDefinitions);

  window.open("http://yuml.me/diagram/plain/class/" + definitions);

};