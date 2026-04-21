const Task = require("../models/task.model");
const paginationHelper = require("../../../helper/pagination")
const searchHelper = require("../../../helper/search")
//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  //lọc trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  };

  //search
  let objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  };


  //pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2
  };
  const countTask = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTask
  );

  //sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  };


  const task = await Task.find(find)
    .sort(sort)
    .limit(initPagination.limitItems)
    .skip(initPagination.skip)
    ;

  res.json(task);
};

//[GET] /aip/v1/tasks/detail/:id
module.exports.taskDetail = async (req, res) => {

  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false
    });

    res.json(task)
  } catch (error) {
    res.json("không tìm thấy");
  }
};
