const getPagination = (page, limit, totalDocuments) => {
  const nextPage = page < Math.ceil(totalDocuments / limit) ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  return {
    nextPage,
    perPage: limit,
    previousPage,
    currentPage: page,
    totalPages: Math.ceil(totalDocuments / limit),
    total: totalDocuments,
  };
};

module.exports = {
  getPagination,
};
