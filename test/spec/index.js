var sassy = require('dist/index');

function configure(data) {
  for (var i in data) {
    this[i] = data[i];
  }
}

describe("Test suite", function() {
  describe("When setting the processing a simple CSS source", function() {
    var moduleMeta;
    beforeEach(function() {
      moduleMeta = {
        source: "body{background:blue; a{color:black;}}",
        configure: configure
      };

      return sassy.configure({
        load: false,
        sass: {
          style: sassy.Sass.style.compressed
        }
      })(moduleMeta);
    });

    it("moduleMeta code is set", function () {
      expect(moduleMeta.code).to.equal("body{background:blue}body a{color:black}\n");
    });
  });
});
