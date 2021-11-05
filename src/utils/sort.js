const sort = (sortingCriteria, data) => {
  switch (sortingCriteria) {
    case 'Alphabetical': {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    case 'Latest': {
      return data.sort((x, y) => {
        return new Date(y.timeStamp) - new Date(x.timeStamp);
      });
    }
    case 'Oldest': {
      return data.sort((x, y) => {
        return new Date(x.timeStamp) - new Date(y.timeStamp);
      });
    }
    case 'Default': {
      return data;
    }
    default: {
      return data;
    }
  }
};
export default sort;
