<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1kNC3VjfeWE4TkCRqrbEEBsJQBjeYayWT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## API Integration

تم ربط التطبيق مع API في مجلد `Deal-CRM-api-1`. 

### تشغيل API:

1. انتقل إلى مجلد API:
   ```bash
   cd ../Deal-CRM-api-1
   ```

2. قم بتفعيل البيئة الافتراضية (إذا كانت موجودة):
   ```bash
   # Windows
   .venv\Scripts\activate
   
   # Linux/Mac
   source .venv/bin/activate
   ```

3. قم بتثبيت المتطلبات:
   ```bash
   pip install -r requirements.txt
   ```

4. قم بتشغيل الـ migrations:
   ```bash
   python manage.py migrate
   ```

5. قم بإنشاء مستخدم superuser (اختياري):
   ```bash
   python manage.py createsuperuser
   ```

6. قم بتشغيل الخادم:
   ```bash
   python manage.py runserver
   ```

   API سيعمل على `http://localhost:8000`

### إعدادات API في Frontend:

- الـ API URL الافتراضي: `http://localhost:8000/api`
- يمكنك تغييره عبر متغير البيئة `REACT_APP_API_URL` في ملف `.env.local`

### الميزات المربوطة:

✅ **Authentication**: تسجيل الدخول باستخدام JWT tokens  
✅ **Users**: إدارة المستخدمين (عرض، إنشاء، حذف)  
✅ **Leads (Clients)**: إدارة العملاء (عرض، إنشاء، تحديث)  
✅ **Deals**: إدارة الصفقات (عرض، إنشاء، حذف)  
🔄 **Auto Token Refresh**: تحديث تلقائي للـ tokens عند انتهاء الصلاحية  

### ملاحظات:

- البيانات الحالية (Developers, Projects, Units, Owners, Services, Products, etc.) لا تزال تستخدم Mock data
- يجب إضافة endpoints في API لهذه البيانات لربطها
- Company specialization غير موجود في API حالياً - يجب إضافته لاحقاً