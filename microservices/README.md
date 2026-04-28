# Wedding Dress Rental - Microservices Scaffold

This scaffold keeps each service in a separate Node.js app with a separate MongoDB database (same cluster, different DB names).

## Services

- `api-gateway`: Single public entrypoint for frontend/admin.
- `services/auth-service`: Signup/login and JWT issuing.
- `services/product-service`: Product catalog management.
- `services/cart-service`: Cart operations.
- `services/upload-service`: Image upload and static serving.

## Suggested DB names in the same Mongo cluster

- `wdr_auth_db`
- `wdr_product_db`
- `wdr_cart_db`
- `wdr_upload_db` (optional if upload metadata is added later)

## Quick start

Open a terminal for each service:

```powershell
cd "D:\cloud 04 25\wedding-dress-rental\microservices\services\auth-service"
npm install
npm run dev
```

```powershell
cd "D:\cloud 04 25\wedding-dress-rental\microservices\services\product-service"
npm install
npm run dev
```

```powershell
cd "D:\cloud 04 25\wedding-dress-rental\microservices\services\cart-service"
npm install
npm run dev
```

```powershell
cd "D:\cloud 04 25\wedding-dress-rental\microservices\services\upload-service"
npm install
npm run dev
```

```powershell
cd "D:\cloud 04 25\wedding-dress-rental\microservices\api-gateway"
npm install
npm run dev
```

Then call gateway routes:

- `http://localhost:4000/auth/*`
- `http://localhost:4000/products/*`
- `http://localhost:4000/cart/*`
- `http://localhost:4000/media/*`

## Migration mapping from current monolith

- `/signup`, `/login` -> `/auth/signup`, `/auth/login`
- `/addproduct`, `/removeproduct`, `/allproduct`, `/newcollection`, `/popularinwoman` -> `/products/...`
- `/addtocart`, `/removefromcart`, `/getcart` -> `/cart/...`
- `/upload`, `/images/*` -> `/media/upload`, `/media/images/*`
