import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import orderApi from "../../api/orderApi";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [isLoading, setIsSpinnerLoading] = useState(true);

  const [account, setAccount] = useState({
    isLogin: true,
    email: "hvcong101201@gmail.com",
    name: "ad",
    address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
    phonenumber: "0864234234",
    role: "ad",
  });

  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState([]);

  const [categories, setCategories] = useState([]);

  const [orders, setOrders] = useState([
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
  ]);

  const [pageState, setPageState] = useState({
    current: 1,
    total: 4, // tổng số trang
  });

  const [cart, setCart] = useState({
    items: [
      // {
      //   product: {},
      //   quantity: 0,
      // },
    ],
  });
  const [amountMoney, setAmountMoney] = useState({
    total: 0,
    subTotal: 0,
  });

  // load products
  async function loadProducts() {
    let res = await orderApi.getAllProducts();
    if (res.products) {
      setProducts(res.products);
    }
  }

  async function loadAllData() {
    loadProducts();

    // load categories
    let res = await orderApi.getAllCategories();
    if (res.categories) {
      setCategories(res.categories);
    }

    // load users
    res = await orderApi.getAllUsers();
    if (res.users) {
      setUsers(res.users);
    }

    // load orders
    res = await orderApi.getAll();
    if (res.orders) {
      setOrders(res.orders);
    }
  }

  // add to cart
  function addToCart(product, quantity = 1) {
    let _items = [...cart.items];
    _items.push({
      product,
      quantity,
    });

    setCart({
      ...cart,
      items: _items,
    });

    toast.info("Thêm vào giỏ hàng thành công");
  }

  // tính tiền trong giỏ hàng
  function calcMoneyInCart() {
    let _items = [...cart.items];
    let total = 0;
    let subTotal = 0;

    _items.map((item) => {
      total +=
        item.product.price *
        item.quantity *
        (1 - (item.product?.sale || 0) / 100);
      subTotal += item.product.price * item.quantity;
    });
    setAmountMoney({
      total,
      subTotal,
    });
  }

  function checkIsExistInCart(productId) {
    let items = cart.items || [];
    let isExist = false;

    items.map((item) => {
      let product = item.product;

      if (product.id == productId) {
        isExist = true;
      }
    });

    return isExist;
  }

  function changeQuantity(productId, newQuantity) {
    let _items = [...cart.items];
    _items = _items.map((item) => {
      if (item.product.id == productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      } else {
        return item;
      }
    });

    _items = _items.filter((item) => item.quantity > 0);

    setCart({
      ...cart,
      items: _items,
    });
  }

  function paymentOke() {
    setCart({
      items: [],
    });

    loadAllData();
  }

  ////// auth
  // login
  async function logIn(data) {
    let res = await authApi.login(data);
    if (res) {
      setAccount({
        ...res,
        isLogin: true,
      });
      toast.success("Đăng nhập thành công");
      return true;
    } else {
      return false;
    }
  }

  // register
  async function register(data) {
    let res = await authApi.register(data);
    if (res) {
      setAccount({
        ...res,
        isLogin: true,
      });
      return true;
    } else {
      return false;
    }
  }

  // logout
  function logOut() {
    setIsSpinnerLoading(true);

    setTimeout(() => {
      setAccount({
        isLogin: false,
      });
      toast.success("Đăng xuất thành công");
      setIsSpinnerLoading(false);
    }, 1000);
  }

  /// useEffect

  useEffect(() => {
    calcMoneyInCart();
    return () => {};
  }, [cart]);

  useEffect(() => {
    loadAllData();
    return () => {};
  }, []);

  const GlobalContextData = {
    isLoading,
    setIsSpinnerLoading,
    logIn,
    logOut,
    register,
    addToCart,
    products,
    cart,
    account,
    checkIsExistInCart,
    changeQuantity,
    amountMoney,
    paymentOke,
    pageState,
    setPageState,
    users,
    orders,
    categories,
  };

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export function useGlobalContext() {
  return useContext(GlobalContext);
}
