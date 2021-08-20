exports.sortCategoriesList = function (categories) {
  // mutates original array
  categories.sort((a, b) => {
    const textA = a.name.toLowerCase();
    const textB = b.name.toLowerCase();
    if (textA < textB) {
      return -1;
    }
    if (textA > textB) {
      return 1;
    }
    return 0;
  });
};
