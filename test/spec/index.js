var sassy = require('dist/index');

describe("Test suite", function() {
  describe("When setting the processing a simple CSS source", function() {
    var meta, result;
    beforeEach(function() {
      meta = {
        source: "body{background:blue; a{color:black;}}"
      };

      return sassy(meta, {
        load: false,
        sass: {
          style: sassy.Sass.style.compressed
        }
      }).then(function(r) {
        result = r;
      });
    });

    it("sass module is transpiled", function () {
      expect(result.exports).to.equal("body{background:blue}body a{color:black}\n");
    });
  });
});
