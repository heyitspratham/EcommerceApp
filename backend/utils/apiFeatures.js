class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //search API
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  //filter API
  filter() {
    //copy kar rhe queryStr ko {destructure kara cuz object hai and = pe sirf reference pass hota hai}
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];

    //removing the specific fields from queryStr
    removeFields.forEach((ele) => delete queryCopy[ele]);

    //Advanced filter for pricing
    //using stringify to replace gte with $gte [used in mongodb like $regex  or $options]

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (key) => `$${key}`);

    // console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;

    //how many pages to skip Eg - page 3 means skip 10 (5 per pages)
    const skip = resultPerPage * (currentPage -1)


    this.query = this.query.limit(resultPerPage).skip(skip)

    return this

  }


}

export default APIFeatures;
