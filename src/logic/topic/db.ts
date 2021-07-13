/**
 * @file 统一 DB 构造
 * @author svon.me@gmail.com
 */

import DBList from '@fengqiaogang/dblist'

const CreateDB = function(): DBList {
  const db = new DBList([], 'mid', 'pid', '-1', 'order')
  return db
}
export default CreateDB
