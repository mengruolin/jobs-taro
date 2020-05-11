  
var Mock = require("mockjs");
var JobFactory = require("./factory/jobs")
const JobTags = require("./factory/jobsTags")
const cityList = require('./factory/cityList')

var newJobs = JobFactory.randomMulti();
var hotJobs = JobFactory.randomMulti();
var recommendJobs = JobFactory.randomMulti();
var allJobs = Mock.Random.shuffle([
  ...newJobs,
  ...hotJobs,
  ...recommendJobs
]);

/**
 * json-server不支持嵌套访问，如'jobs/new'
 * 需要在routes.js中设置rewriter
 *
 * 服务启动后db中的数据将不会改变
 */
module.exports = {
  jobs: allJobs,
  jobList: JobTags.randomMulti(),
  cityList: cityList.randomMulti(),
  "city-hot": cityList.cityHotRandom(),
  jobInfo: JobFactory.jobInfo,
  jobScreening: JobFactory.jobScreening
};