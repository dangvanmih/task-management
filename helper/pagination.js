module.exports = (objectPagination,query,countRecords) => {
  if(query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  if(query.limit) {
    objectPagination.limitItems = parseInt(query.limit);
  }

  
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // công thức tính skip : trang hiện tại - 1 * số lượng giới hạn sản phẩm
  

  const totalPage = Math.ceil(countRecords/objectPagination.limitItems); // hàm ceil dùng để luôn làm tròn lên
  
  objectPagination.totalPage = totalPage;

  return objectPagination; // phải trả ra data thì bên kia mới nhận được
}