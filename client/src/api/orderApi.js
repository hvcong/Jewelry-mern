import axiosClient from "./axiosClient";

const orderApi = {
  addOne: async (formData) => {
    return {
      // message: "dd",
    };
  },
  deleteById: async (id) => {
    return {};
  },
  updateById: async (id, formData) => {
    return {};
  },
  getAll: async () => {
    return {
      orders: [
        {
          id: 1,
          phonenumber: "0823432121",
          address: "2/3/4 duong 15",
          orderDate: new Date().toDateString(),
          state: "oke",
          cost: 10000,
          orderDetails: [
            {
              id: 322,
              quantity: 5,
              price: 10000,
              sale: 2,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola ",
                price: 10000,
                quantity: 10,
                sale: 10,
                id: 221,
              },
            },
            {
              id: 4,
              quantity: 5,
              price: 10000,
              sale: 5,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola 2 ",
                price: 10000,
                quantity: 10,
                sale: 0,
                id: 229,
              },
            },
          ],
          account: {
            email: "dfsdfds@gmail.com",
            name: "Hoàng Văn Công",
            address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
            phonenumber: "0864234234",
            role: "kh",
          },
        },
        {
          id: 2,
          phonenumber: "0823432121",
          address: "2/3/4 duong 15",
          orderDate: new Date().toDateString(),
          state: "pendding",
          cost: 10000,
          orderDetails: [
            {
              id: 322,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola ",
                price: 10000,
                quantity: 10,
                sale: 10,
                id: 221,
              },
            },
            {
              id: 4,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola 2 ",
                price: 10000,
                quantity: 10,
                sale: 0,
                id: 229,
              },
            },
          ],
          account: {
            email: "dfsdfds@gmail.com",
            name: "Hoàng Văn Công",
            address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
            phonenumber: "0864234234",
            role: "kh",
          },
        },
        {
          id: 3,
          phonenumber: "0823432121",
          address: "2/3/4 duong 15",
          orderDate: new Date().toDateString(),
          state: "cancel",
          cost: 10000,
          orderDetails: [
            {
              id: 322,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola ",
                price: 10000,
                quantity: 10,
                sale: 10,
                id: 221,
              },
            },
            {
              id: 4,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola 2 ",
                price: 10000,
                quantity: 10,
                sale: 0,
                id: 229,
              },
            },
          ],
          account: {
            email: "dfsdfds@gmail.com",
            name: "Hoàng Văn Công",
            address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
            phonenumber: "0864234234",
            role: "kh",
          },
        },
        {
          id: 4,
          phonenumber: "0823432121",
          address: "2/3/4 duong 15",
          orderDate: new Date().toDateString(),
          state: "pendding",
          cost: 10000,
          orderDetails: [
            {
              id: 322,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola ",
                price: 10000,
                quantity: 10,
                sale: 10,
                id: 221,
              },
            },
            {
              id: 4,
              quantity: 5,
              price: 10000,
              sale: 10,
              product: {
                description:
                  "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
                imageUrl:
                  "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
                name: "Coca cola 2 ",
                price: 10000,
                quantity: 10,
                sale: 0,
                id: 229,
              },
            },
          ],
          account: {
            email: "dfsdfds@gmail.com",
            name: "Hoàng Văn Công",
            address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
            phonenumber: "0864234234",
            role: "kh",
          },
        },
      ],
    };
  },

  // product

  getAllProducts: async () => {
    return {
      products: [
        {
          description:
            "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
          imageUrl:
            "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
          name: "Coca cola ",
          price: 10000,
          quantity: 0,
          sale: 10,
          id: 221,
        },
        {
          description:
            "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
          imageUrl:
            "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
          name: "Coca cola 2 ",
          price: 10000,
          quantity: 10,
          sale: 10,
          id: 224,
        },
        {
          description:
            "Sản phẩm đồng hồ mang thương hiệu Elio với nhiều mẫu mã năng động, trẻ trung nhưng không kém phần tinh tế và sang trọng, phù hợp với tất cả mọi người hoạt động ở nhiều lĩnh vực từ dân văn phòng đến doanh nhân.",
          imageUrl:
            "https://nypost.com/wp-content/uploads/sites/2/2021/10/amyo-jewelry.jpg?quality=90&strip=all",
          name: "Coca cola 2 ",
          price: 10000,
          quantity: 10,
          sale: 0,
          id: 229,
        },
      ],
    };
  },

  getAllCategories: async () => {
    return {
      categories: [
        {
          id: 4,
          name: "Đồng hồ cơ",
        },
        {
          id: 5,
          name: "Đồng hồ điện tử",
        },
        {
          id: 6,
          name: "Đồng hồ giới hạn",
        },
        {
          id: 7,
          name: "Đồng hồ mạ vàng",
        },
      ],
    };
  },

  getAllUsers: async () => {
    return {
      users: [
        {
          email: "hvcong101201@gmail.com",
          name: "ad",
          address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
          phonenumber: "0864234234",
          role: "ad",
        },
        {
          email: "dfsdfds@gmail.com",
          name: "Hoàng Văn Công",
          address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
          phonenumber: "0864234234",
          role: "kh",
        },
        {
          email: "ggeetad@gmail.com",
          name: "Hoàng Văn Công",
          address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
          phonenumber: "0864234234",
          role: "kh",
        },
        {
          email: "sbdee@gmail.com",
          name: "Hoàng Văn Công",
          address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
          phonenumber: "0864234234",
          role: "kh",
        },
        {
          email: "tegaaa@gmail.com",
          name: "Hoàng Văn Công",
          address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
          phonenumber: "0864234234",
          role: "kh",
        },
      ],
    };
  },
};
export default orderApi;
