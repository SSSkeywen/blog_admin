/*
 * @Author: mikey.wf 
 * @Date: 2020-11-03 15:46:22 
 * @Last Modified by: mikey.wf
 * @Last Modified time: 2020-11-10 17:56:08
 */
let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin', // 检查用户名和密码
  getTypeInfo: ipUrl + 'getTypeInfo', // 获得文章类别信息
  addArticle: ipUrl + 'addArticle', // 添加文章
  updateArticle: ipUrl + 'updateArticle', // 修改文章
  getArticleList: ipUrl + 'getArticleList', // 修改文章
  delArticle: ipUrl + 'delArticle/', // 删除文章
}

export default servicePath