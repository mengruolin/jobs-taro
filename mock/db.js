  
var Mock = require("mockjs");
var BookFactory = require("./factory/book");
const JobTags = require("./factory/jobsTags")
const cityList = require('./factory/cityList')

var newBooks = BookFactory.randomMulti();
var hotBooks = BookFactory.randomMulti();
var recommendBooks = BookFactory.randomMulti();
var allBooks = Mock.Random.shuffle([
  ...newBooks,
  ...hotBooks,
  ...recommendBooks
]);

/**
 * json-server不支持嵌套访问，如'books/new'
 * 需要在routes.js中设置rewriter
 *
 * 服务启动后db中的数据将不会改变
 */
module.exports = {
  books: allBooks,
  jobList: JobTags.randomMulti(),
  cityList: cityList.randomMulti(),
  "city-hot": cityList.cityHotRandom(),
  jobInfo: BookFactory.jobInfo
};