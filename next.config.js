const withTypescript = require("@zeit/next-typescript")

const { BUNDLE_ANALYZE } = process.env
const withBundleAnalyzer =
  BUNDLE_ANALYZE && require("@zeit/next-bundle-analyzer")

module.exports = withTypescript(
  BUNDLE_ANALYZE
    ? withBundleAnalyzer({
        analyzeServer: ["server", "both"].includes(BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../../bundles/server.html"
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html"
          }
        }
      })
    : {}
)
