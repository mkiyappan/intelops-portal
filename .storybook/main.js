module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/pages/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router"
  ],
  "core": {
    "builder": "webpack5"
  }
}