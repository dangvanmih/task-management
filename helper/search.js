module.exports = (query) => {
  let objectSearch = {
    keyword: "",

  };
  if (query.keyword) // check nếu người dùng tìm kiếm
    {
      objectSearch.keyword = query.keyword;

      const regex = new RegExp(objectSearch.keyword, "i"); // dùng regex để tìm kiếm khi không nhập đủ tên sản phẩm và tham số "i" để tìm kiếm ko phân biệt chữ in hoa
      objectSearch.regex = regex;
    };

  return objectSearch ;
}
