# دليل ربط API - API Integration Guide

## نظرة عامة
هذا الملف يوضح كيفية ربط API مع التطبيق. جميع البيانات الثابتة تم إزالتها وتم إضافة تعليقات TODO في الأماكن المناسبة.

## الملفات المهمة

### 1. `services/api.ts`
هذا الملف يحتوي على جميع دوال API. كل دالة تحتوي على:
- مثال للـ endpoint
- مثال للـ request body
- مثال للـ response

**مثال على كيفية استخدام الدوال:**
```typescript
// في أي ملف React component:
import { getUsersAPI, createUserAPI } from '../services/api';

// تحميل البيانات
const loadUsers = async () => {
  try {
    const users = await getUsersAPI();
    setUsers(users); // استخدم setUsers من AppContext
  } catch (error) {
    console.error('Error:', error);
  }
};

// إنشاء مستخدم جديد
const handleCreateUser = async (userData) => {
  try {
    const newUser = await createUserAPI(userData);
    setUsers(prev => [...prev, newUser]);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
```

### 2. `context/AppContext.tsx`
هذا الملف يحتوي على:
- جميع حالات البيانات (states)
- دوال CRUD (Create, Read, Update, Delete)
- تعليقات TODO في كل دالة توضح أين يجب استدعاء API

**مثال على كيفية تحديث دالة:**
```typescript
// قبل (كود ثابت):
const addUser = (userData) => {
  const newUser = { ...userData, id: Date.now() };
  setUsers(prev => [...prev, newUser]);
};

// بعد (مع API):
const addUser = async (userData) => {
  try {
    const newUser = await createUserAPI(userData);
    setUsers(prev => [...prev, newUser]);
  } catch (error) {
    console.error('Error creating user:', error);
    // TODO: أظهر رسالة خطأ للمستخدم
  }
};
```

### 3. `pages/LoginPage.tsx`
**TODO موجود في:** `handleLogin` function
- استبدل الكود الحالي بـ `loginAPI(username, password)`
- احفظ token في `localStorage.setItem('authToken', token)`
- احفظ بيانات المستخدم والشركة

### 4. صفحات Inventory
كل صفحة تحتوي على `useEffect` مع TODO يوضح:
- متى يجب تحميل البيانات
- أي API يجب استدعاؤه
- كيفية تحديث state

## خطوات الربط

### الخطوة 1: إعداد BASE_URL
في `services/api.ts`:
```typescript
const BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-url.com/api';
```

أضف في ملف `.env.local`:
```
REACT_APP_API_URL=https://your-api-url.com/api
```

### الخطوة 2: إضافة Authentication
في `services/api.ts`، دالة `apiRequest`:
```typescript
const token = localStorage.getItem('authToken');
// Token سيتم إضافته تلقائياً في headers
```

### الخطوة 3: تحديث دوال CRUD
ابحث عن جميع التعليقات `// TODO:` في `context/AppContext.tsx` واستبدل الكود.

**مثال:**
```typescript
// TODO: استدعي createUserAPI(userData) هنا
const addUser = async (userData) => {
  const newUser = await createUserAPI(userData);
  setUsers(prev => [...prev, newUser]);
};
```

### الخطوة 4: تحديث صفحات التحميل
في كل صفحة، ابحث عن `useEffect` مع TODO واستبدل الكود.

**مثال في `pages/UsersPage.tsx`:**
```typescript
useEffect(() => {
  const loadUsers = async () => {
    try {
      const usersData = await getUsersAPI();
      // TODO: تحتاج لإضافة setUsers في AppContext
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };
  loadUsers();
}, []);
```

## ملاحظات مهمة

1. **كل شركة لها API خاص:**
   - عند ربط API، استخدم `currentUser.company.id` أو `currentUser.company.specialization` لتحديد الشركة
   - مثال: `/companies/${companyId}/users` بدلاً من `/users`

2. **Authentication:**
   - بعد تسجيل الدخول، احفظ token في `localStorage`
   - Token سيتم إرساله تلقائياً في جميع الطلبات

3. **Error Handling:**
   - أضف try/catch في جميع استدعاءات API
   - أظهر رسائل خطأ واضحة للمستخدم

4. **Loading States:**
   - استخدم `setLoading(false)` في `finally` block
   - أظهر Loader أثناء التحميل

5. **Data Updates:**
   - بعد أي عملية (create/update/delete)، حدث state فوراً
   - أو أعد تحميل البيانات من API

## قائمة TODO الكاملة

### Authentication
- [ ] `pages/LoginPage.tsx` - `handleLogin` function
- [ ] `context/AppContext.tsx` - `useEffect` عند تحميل التطبيق

### Users
- [ ] `context/AppContext.tsx` - `addUser`, `deleteUser`
- [ ] `pages/UsersPage.tsx` - `useEffect` لتحميل Users

### Leads
- [ ] `context/AppContext.tsx` - `addLead`
- [ ] `pages/LeadsPage.tsx` - `useEffect` لتحميل Leads

### Deals
- [ ] `context/AppContext.tsx` - `addDeal`, `deleteDeal`
- [ ] `pages/DealsPage.tsx` - `useEffect` لتحميل Deals

### Campaigns
- [ ] `context/AppContext.tsx` - `addCampaign`, `deleteCampaign`
- [ ] `pages/CampaignsPage.tsx` - `useEffect` لتحميل Campaigns

### Real Estate (Properties)
- [ ] `context/AppContext.tsx` - `addDeveloper`, `updateDeveloper`, `deleteDeveloper`
- [ ] `context/AppContext.tsx` - `addProject`, `updateProject`, `deleteProject`
- [ ] `context/AppContext.tsx` - `addUnit`
- [ ] `context/AppContext.tsx` - `addOwner`, `updateOwner`, `deleteOwner`
- [ ] `pages/PropertiesPage.tsx` - `useEffect` لتحميل البيانات
- [ ] `pages/OwnersPage.tsx` - `useEffect` لتحميل Owners

### Services
- [ ] `context/AppContext.tsx` - `addService`, `updateService`, `deleteService`
- [ ] `context/AppContext.tsx` - `addServicePackage`, `updateServicePackage`, `deleteServicePackage`
- [ ] `context/AppContext.tsx` - `addServiceProvider`, `updateServiceProvider`, `deleteServiceProvider`
- [ ] `pages/ServicesPage.tsx` - `useEffect` لتحميل Services
- [ ] `pages/ServicePackagesPage.tsx` - `useEffect` لتحميل Packages
- [ ] `pages/ServiceProvidersPage.tsx` - `useEffect` لتحميل Providers

### Products
- [ ] `context/AppContext.tsx` - `addProduct`, `updateProduct`, `deleteProduct`
- [ ] `context/AppContext.tsx` - `addProductCategory`, `updateProductCategory`, `deleteProductCategory`
- [ ] `context/AppContext.tsx` - `addSupplier`, `updateSupplier`, `deleteSupplier`
- [ ] `pages/ProductsPage.tsx` - `useEffect` لتحميل Products
- [ ] `pages/ProductCategoriesPage.tsx` - `useEffect` لتحميل Categories
- [ ] `pages/SuppliersPage.tsx` - `useEffect` لتحميل Suppliers

### Integrations
- [ ] `pages/IntegrationsPage.tsx` - `useEffect` لتحميل Connected Accounts
- [ ] `pages/IntegrationsPage.tsx` - `handleDelete` function
- [ ] `components/modals/ManageIntegrationAccountModal.tsx` - `handleSubmit` function

### Dashboard
- [ ] `pages/DashboardPage.tsx` - `useEffect` لتحميل بيانات Dashboard

## أمثلة كاملة

### مثال 1: تسجيل الدخول
```typescript
// في pages/LoginPage.tsx
const handleLogin = async () => {
  setError('');
  if (!username.trim() || !password.trim()) {
    setError(t('pleaseEnterCredentials'));
    return;
  }
  
  setIsLoading(true);
  try {
    const { user, token, company } = await loginAPI(username, password);
    localStorage.setItem('authToken', token);
    setCurrentUser({ ...user, company });
    setIsLoggedIn(true);
  } catch (error) {
    setError(t('invalidCredentials'));
  } finally {
    setIsLoading(false);
  }
};
```

### مثال 2: تحميل البيانات
```typescript
// في أي صفحة
useEffect(() => {
  const loadData = async () => {
    try {
      const data = await getDataAPI();
      setData(data); // استخدم setter من AppContext
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);
```

### مثال 3: إنشاء عنصر جديد
```typescript
// في context/AppContext.tsx
const addItem = async (itemData) => {
  try {
    const newItem = await createItemAPI(itemData);
    setItems(prev => [...prev, newItem]);
  } catch (error) {
    console.error('Error creating item:', error);
    throw error; // لإظهار رسالة خطأ في المكون
  }
};
```

### مثال 4: تحديث عنصر
```typescript
const updateItem = async (itemId, itemData) => {
  try {
    const updatedItem = await updateItemAPI(itemId, itemData);
    setItems(prev => prev.map(item => 
      item.id === itemId ? updatedItem : item
    ));
  } catch (error) {
    console.error('Error updating item:', error);
  }
};
```

### مثال 5: حذف عنصر
```typescript
const deleteItem = async (itemId) => {
  try {
    await deleteItemAPI(itemId);
    setItems(prev => prev.filter(item => item.id !== itemId));
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
```

## نصائح إضافية

1. **استخدم async/await** بدلاً من `.then()`
2. **أضف error handling** في كل استدعاء
3. **حدث state فوراً** بعد نجاح العملية
4. **أظهر loading indicators** أثناء الانتظار
5. **اختبر كل endpoint** قبل ربطه

## ملاحظة نهائية
جميع التعليقات TODO موجودة في الكود. ابحث عن `// TODO:` في جميع الملفات لمعرفة أين يجب كتابة كود API.



