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

//[GET] /api/v1/tasks/detail/:id
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


//[PATCH]/api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {

  try {
    const id = req.params.id;
    const status = req.body.status;

    await Task.updateOne({
      _id: id
    }, {
      status: status
    })

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

//[PATCH]/api/v1/tasks/change-multi/
module.exports.changeMulti = async (req, res) => {

  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids }
          },
          {
            status: value
          });
        res.json({
          code: 200,
          message: "Cập nhật thành công!"
        });
        break;
      case "delete":
        await Task.updateMany(
          {
            _id:{$in: ids}
          },
          {
            deleted: true,
            deletedAt: new Date()
          }
        );
        res.json({
          code: 200,
          message: "Xóa thành công!"
        })
        break;
      default:
        res.json({
          code: 400,
          message: "Không tồn tại!"
        });
        break;
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

//[POST]/api/v1/tasks/create
module.exports.createPost = async (req, res) => {

  try {
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
      code: 200,
      message: "Tạo mới thành công!",
      data: data
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

//[PATCH]/api/v1/tasks/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.updateOne({
      _id:id
    }, req.body);

    res.json({
      code: 200,
      message: "Cập nhật thành công!",});
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

//[DELETE]/api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.updateOne({
      _id:id
    }, {
      deleted: true,
      deletedAt: new Date()
    });

    res.json({
      code: 200,
      message: "Xóa thành công!",});
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    });
  }
};

