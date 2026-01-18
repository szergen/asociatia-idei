# Data Model: E-Commerce Shop Module

## Entities

### 1. Product (CMS - Builder.io)

**Model Name**: `product`
**Source**: Builder.io (Data Model)
**Sync Strategy**: SSG (Static Site Generation)

| Field           | Type         | Required | Description                                                |
| --------------- | ------------ | -------- | ---------------------------------------------------------- |
| `title`         | Text         | Yes      | Product name                                               |
| `description`   | Rich Text    | Yes      | Detailed product description                               |
| `image`         | File (Image) | Yes      | Main product image                                         |
| `gallery`       | List<File>   | No       | Additional images                                          |
| `price`         | Number       | Yes      | Display price (for UI only)                                |
| `stripePriceId` | Text         | Yes      | The ID of the Price object in Stripe (e.g., `price_1K...`) |
| `slug`          | Text         | Yes      | URL-friendly identifier                                    |

### 2. Cart (Client - LocalStorage)

**Storage Key**: `shop_cart_v1`
**Format**: JSON

```typescript
interface CartState {
  items: CartItem[];
  isOpen: boolean; // UI state, not persisted
}

interface CartItem {
  productId: string; // Builder.io entry ID or Slug
  stripePriceId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
```

### 3. Checkout Session (Stripe)

**Source**: Stripe API

| Field            | Type   | Description                  |
| ---------------- | ------ | ---------------------------- |
| `id`             | string | Session ID (`cs_test_...`)   |
| `line_items`     | list   | List of purchased items      |
| `metadata`       | map    | `{ source: 'website_shop' }` |
| `payment_status` | string | `paid` / `unpaid`            |

## Validation Rules

1. **Price Integrity**:

   - `CartItem.stripePriceId` MUST exist in Stripe.
   - During checkout creation, the backend API ignores client-sent prices and looks up the price amount from Stripe using `stripePriceId`.

2. **Quantity Limits**:

   - Minimum: 1
   - Maximum: 99 (arbitrary reasonable limit per line item)

3. **Data Consistency**:
   - Builder.io `stripePriceId` must match an Active price in Stripe Dashboard.
