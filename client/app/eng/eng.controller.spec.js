'use strict';

describe('Controller: EngCtrl', function () {

  // load the controller's module
  beforeEach(module('elsieyApp'));

  var EngCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EngCtrl = $controller('EngCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
