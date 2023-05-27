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
import axios from "axios";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [isLoading, setIsSpinnerLoading] = useState(false);

  const [account, setAccount] = useState({
    isLogin: false,
    // email: "hvcong101201@gmail.com",
    // name: "ad",
    // address: "29/8/3 đường số 10, hiệp bình Chánh, thủ đức",
    // phonenumber: "0864234234",
    // role: "ad",
  });

  const [filter, setFilter] = useState({
    order: "",
  });

  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState([]);

  const [categories, setCategories] = useState([]);

  const [orders, setOrders] = useState([]);

  const [pageState, setPageState] = useState({
    current: 1,
    total: 0, // tổng số trang
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
    try {
      let res = (await orderApi.getAllProducts()) || [];
      setProducts(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadAllData() {
    await loadProducts();

    // load categories
    let res = await orderApi.getAllCategories();
    if (res.categories) {
      setCategories(res.categories);
    }

    // load users
    let users = (await authApi.getAll()) || [];

    // load orders
    let orders = (await orderApi.getAll()) || [];
    console.log(orders);
    let _orders = orders?.map((order) => {
      let _user = null;
      users.map((user) => {
        let listOrders = user.orders || [];

        listOrders.map((item) => {
          if (item.id == order.id) {
            _user = user;
          }
        });
      });

      return {
        ...order,
        account: _user,
      };
    });

    setOrders(_orders || []);
    setUsers(users);
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

  async function paymentOke() {
    setCart({
      items: [],
    });

    await loadAllData();
  }

  ////// auth
  // login
  async function logIn(data) {
    try {
      let res = (await authApi.getAll()) || [];
      let _account = null;
      res.map((account) => {
        if (account.email == data.email && account.password == data.password) {
          _account = account;
        }
      });

      if (_account) {
        setAccount({
          ..._account,
          isLogin: true,
        });
        toast.success("Đăng nhập thành công");
        return true;
      } else {
        return false;
      }
    } catch (eerr) {
      console.log(eerr);
      return false;
    }
  }

  // register
  async function register(data) {
    let userFound = users.filter((item) => {
      return item.email == data.email;
    });

    if (userFound.length > 0) {
      toast.error("Email này đã được sử dụng bởi tài khoản khác!");
      return false;
    } else {
      let res = await authApi.register({
        ...data,
        role: "kh",
      });

      if (res) {
        setAccount({
          ...res,
          isLogin: true,
        });
        return true;
      } else {
        toast.error("Thông tin không hợp lệ!");
        return false;
      }
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

  useEffect(() => {
    let tmp = Math.floor(products.length / 8);

    setPageState({
      current: 1,
      total: products.length % 8 > 0 ? tmp + 1 : tmp, // tổng số trang
    });
    return () => {};
  }, [products]);

  const GlobalContextData = {
    isLoading,
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
    setIsSpinnerLoading,
    loadAllData,
    setFilter,
    filter,
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
