module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],  
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',  
    '^.+\\.js$': 'babel-jest',       
  },
  testEnvironment: 'jest-environment-jsdom',  
  //collectCoverageFrom: ['src/**/*.{js,vue}'],  
  collectCoverageFrom: ['src/components/AppFetch.vue'],
  coverageDirectory: 'coverage',             
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
};
