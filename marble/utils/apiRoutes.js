import { host } from "./apiHost";

export const loginRoute = `${host}/users/login`;
export const registerRoute = `${host}/users/register`;

// CakeSizes
export const getAllCakeSizes = `${host}/cakes/sizes`;
export const createCakeSize = `${host}/cakes/sizes`;
export const deleteCakeSizeById = (id) => `${host}/cakes/sizes/${id}`;
export const updateCakeSizeById = (id) => `${host}/cakes/sizes/${id}`;

// CakeFlavors
export const getAllCakeFlavors = `${host}/cakes/flavors`;
export const createCakeFlavor = `${host}/cakes/flavors`;
export const deleteCakeFlavorById = (id) => `${host}/cakes/flavors/${id}`;
export const updateCakeFlavorById = (id) => `${host}/cakes/flavors/${id}`;

// CustomCakeFlavors
export const getAllCustomCakeFlavors = `${host}/cakes/customFlavors`;
export const createCustomCakeFlavor = `${host}/cakes/customflavor`;
export const updateCustomCakeFlavorById = (id) =>
  `${host}/cakes/customFlavor/${id}`;
export const deleteCustomCakeFlavorById = (id) =>
  `${host}/cakes/customFlavor/${id}`;

// CustomCakeTypes
export const getAllCustomCakeTypes = `${host}/cakes/customTypes`;
export const createCustomCakeType = `${host}/cakes/customTypes`;
export const deleteCustomCakeTypeById = (id) =>
  `${host}/cakes/customTypes/${id}`;
export const updateCustomCakeTypeById = (id) =>
  `${host}/cakes/customTypes/${id}`;

// CakePortionSizes
export const getAllCakePortionSizes = `${host}/cakes/portionSize`;
export const createCakePortionSize = `${host}/cakes/portionSize`;
export const updateCakePortionSizeById = (id) =>
  `${host}/cakes/portionSize/${id}`;
export const deleteCakePortionSizeById = (id) =>
  `${host}/cakes/portionSize/${id}`;
export const getCakePortionSizeTree = `${host}/cakes/portionSize/tree`;

// IceCreamPortionSizes
export const getAllIceCreamPortionSizes = `${host}/icecreams/portions`;
export const createIceCreamPortionSize = `${host}/icecreams/portions`;
export const deleteIceCreamPortionSizeById = (id) =>
  `${host}/icecreams/portions/${id}`;
export const updateIceCreamPortionSizeById = (id) =>
  `${host}/icecreams/portions/${id}`;
export const getIceCreamPortionSizeTree = `${host}/icecreams/portions/tree`;

// IcecreamAddOns
export const getAllIcecreamAddOns = `${host}/icecreams/addons`;
export const createIceCreamAddOn = `${host}/icecreams/addons`;
export const updateIceCreamAddOnById = (id) => `${host}/icecreams/addons/${id}`;
export const deleteIceCreamAddonById = (id) => `${host}/icecreams/addons/${id}`;

// IceCreamBuckets
export const getAllIceCreamBuckets = `${host}/icecreams/buckets`;
export const createIceCreamBucket = `${host}/icecreams/buckets`;
export const deleteIceCreamBucketById = (id) =>
  `${host}/icecreams/buckets/${id}`;
export const updateIceCreamBucketById = (id) =>
  `${host}/icecreams/buckets/${id}`;

// CookieBoxSizes
export const getAllCookieBoxSizes = `${host}/cookies/sizes`;
export const createCookieBoxSize = `${host}/cookies/size`;
export const deleteCookieBoxSizeById = (id) => `${host}/cookies/size/${id}`;
export const updateCookieBoxSizeById = (id) => `${host}/cookies/size/${id}`;

// CookieBoxTypes
export const getAllCookieBoxTypes = `${host}/cookies/types`;
export const createCookieBoxType = `${host}/cookies/types`;
export const deleteCookieBoxTypeById = (id) => `${host}/cookies/types/${id}`;
export const updateCookieTypeById = (id) => `${host}/cookies/types/${id}`;

// Cookies
export const getAllCookies = `${host}/cookies`;
export const createCookie = `${host}/cookies/create`;
export const deleteCookieById = (id) => `${host}/cookies/delete/${id}`;
export const updateCookieById = (id) => `${host}/cookies/update/${id}`;

// Ocassions
export const getAllOcassions = `${host}/occasions/getAll`;
export const createOcassion = `${host}/occasions/create`;
export const updateOccasionById = (id) => `${host}/occasions/update/${id}`;
export const deleteOccasionById = (id) => `${host}/occasions/delete/${id}`;

// Genders
export const getAllGenders = `${host}/genders`;
export const createGender = `${host}/genders/create`;
export const deleteGenderById = (id) => `${host}/genders/delete/${id}`;
export const updateGenderById = (id) => `${host}/genders/update/${id}`;

// Products
export const createProductRoute = `${host}/products/create`;
export const getAllProductsRoute = `${host}/products/`;
export const getProductByIdRoute = (id) => `${host}/products/${id}`;
export const deleteProductByIdRoute = (id) => `${host}/products/delete/${id}`;
export const updateProductByIdRoute = (id) => `${host}/products/${id}`;

// Orders
export const getAllOrdersRoute = `${host}/orders`;
export const getOrderByIdRoute = (id) => `${host}/orders/${id}`;
export const createOrderRoute = `${host}/orders`;

// Coupons
export const getAllCouponsRoute = `${host}/coupons`;
export const createCouponRoute = `${host}/coupons`;
export const validateCouponRoute = `${host}/coupons/validate`;
export const updateCouponRoute = (id) => `${host}/coupons/${id}`;
export const deleteCouponRoute = (id) => `${host}/coupons/${id}`;
export const getAllCustomersRoute = `${host}/customers`;
export const deleteCustomerRoute = (id) => `${host}/customers/${id}`;

// Categories
export const getAllCategories = `${host}/categories`;
export const createCategory = `${host}/categories/create`;
export const UpdateCategoryById = (id) => `${host}/categories/update/${id}`;
export const deleteCategoryById = (id) => `${host}/categories/delete/${id}`;
export const getCategoryTree = `${host}/categories/tree`;
export const getCakeCategoryChildrens = `${host}/categories/children`;

// Branches
export const getAllBranches = `${host}/branches`;
export const createBranch = `${host}/branches/create`;
export const deleteBranchById = (id) => `${host}/branches/delete/${id}`;
export const updateBranchById = (id) => `${host}/branches/update/${id}`;

// CustomCakeSizes
export const getAllCustomCakeSizes = `${host}/cakes`;
export const deleteCustomCakeSizeById = (id) =>
  `${host}/cakes/customSize/${id}`;
export const updateCustomCakeSizeById = (id) =>
  `${host}/cakes/customSize/${id}`;
export const createCustomCakeSize = `${host}/cakes/customSize`;

// ProductTags
export const getAllTags = `${host}/tags/`;
export const deleteTagById = (id) => `${host}/tags/delete/${id}`;
export const updateTagById = (id) => `${host}/tags/update/${id}`;
export const createTag = `${host}/tags/create`;
