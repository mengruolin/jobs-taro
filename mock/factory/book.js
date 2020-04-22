var Mock = require("mockjs");

var Random = Mock.Random;

// 公司 Logo
const companyLogo =  [
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/16/BB/CgotOVytchOANgN6AAA8EfNN6yU555.png", 
  "https://www.lgstatic.com/thumbnail_100x100/i/image3/M01/5D/0E/CgpOIF4JXnWAVzkbAABs-yZFn_U463.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/4E/BD/Cgp3O1esORGAO1-rAAAIJJwGyjw584.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/59/4C/CgpEMlmC85OAACxcAAAGgFzPKzs411.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/45/7A/CgqKkVeIevmAXlmnAADQ2vLkvgU931.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/98/55/CgotOVu-7sGAAhf-AABzbAALq7A126.png",
  "https://www.lgstatic.com/thumbnail_100x100/image2/M00/05/99/CgqLKVX3lS-AIawiAAEHGEQxN_Y456.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M00/1B/63/CgotOVoCv-eAPNQcAARRTfkzqqo936.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/01/4D/Cgp3O1ZmuIaADPCpAAAdVuLr56I821.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/99/BB/Cgp3O1ihGAGAKUgUAAG55-tWef418.jpeg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/7C/4F/CgotOVtzzoqAPAFHAAA0ElFHKeg399.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/83/43/CgotOVuFEMWAPR_pAAAJ1HH6Y-8447.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/8D/BF/CgoB5l2Ao52ALSFOAAMsMW7BK1Q145.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M00/29/2B/CgotOVomTSOAUlmvAACCdW7K2uI782.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/6C/B2/CgoB5ltPA2uAWzctAAHPGcUXsGI185.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/32/52/CgoB5lzdGueAacOGAAC2R7KXAu0992.png",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/AA/74/CgoB5l3TtjqATAMnAABUJY37Yns101.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/49/C4/CgotOV0HM-OAfkWWAAAU6q4o73Y021.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image2/M01/49/C4/CgotOV0HM-OAfkWWAAAU6q4o73Y021.jpg",
  "https://www.lgstatic.com/thumbnail_100x100/i/image/M00/2D/A3/CgpFT1k0-4WATGDeAAA5HRbo708156.jpg",
  "https://www.lgstatic.com/thumbnail_160x160/i/image/M00/05/61/CgpFT1jbeUSAQ0v5AAKFSRB9DSg742.png"
]

// 公司背景图
const companyBgs = {}

// 公司标签
const companyTags = [
  '五险一金',
  '年终奖',
  '股票期权',
  '带薪年假',
  '员工旅游',
  '节日福利'
]

// 岗位名称
const jobName = [
  '架构师（web前端）',
  'web前端',
  'WEB前端工程师',
  '资深WEB前端开发工程师',
  '高级前端开发工程师'
] 

// 岗位标签
const jobTags = [
  'Gulp',
  'Java',
  'JavaScript',
  'MySql',
]

// 公式规模
const companyScales = [
  '未融资',
  '天使轮',
  'A轮',
  'B轮',
  '上市公司'
]

//
const experiences = [
  '经验不限',
  '在校/应届',
  '1 - 3 年',
  '3 - 5 年',
  '5年以上'
]

//
const educations = [
  '不限',
  '高中',
  '专科',
  '本科',
  '研究生'
]

// 工作列表
const jobList = {
  id: '@increment',
  'jobsName|1': jobName,
  companyName: '@ctitle(5, 10)',
  'companyLogo|+1': companyLogo,
  wages: '@integer(3, 20)',
  'jobTags': jobTags,
  updateTime: '@time("hh:mm")',
}

// 职位详细信息

const jobInfo = {
  id: '@increment',
  companyInfo: {
    companyName: '@ctitle(5, 10)',
    'companyLogo|1': companyLogo,
    crewSize: '@integer(20, 200)',
    'companyScale|1': companyScales,
  },
  'jobName|1': jobName,
  'jobTags': jobTags,
  'jobDescribe': '@cparagraph(30, 40)',
  isStart: '@boolean',
  isApply: '@boolean',
  publishr: '@ctitle(2, 3)',
  publishTime: '@time("hh:mm")',
  address: '@province',
  'experience|1': experiences,
  'education|1': educations,
  'jobSate|1': ['兼职', '实习', '全职'],
  wages: '@integer(3, 20)',
  'jobTags': jobTags,
}

module.exports = {
  randomMulti: (number = 16) => {
    let res = [];
    for (let i = 0; i < number; i++) res.push(jobList);
    return Mock.mock(res);
  },
  jobInfo: Mock.mock(jobInfo)
};