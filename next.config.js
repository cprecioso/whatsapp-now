const withTypescript = require("@zeit/next-typescript")

module.exports = withTypescript({
  exportPathMap: function(defaultPathMap) {
    return {
      "/": { page: "/" }
    }
  }
})
