# FitApp API Endpoints Schema

## Base Configuration

**Base URL:** `https://api.fitapp.com/v1` (or your backend URL)  
**Authentication:** Bearer Token (JWT)  
**Content-Type:** `application/json`

All authenticated endpoints require the `Authorization` header:
```
Authorization: Bearer <access_token>
```

---

## 1. Authentication & Authorization

### 1.1 Sign Up
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "role": "user" | "creator" | "vendor",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "phone": "+1234567890",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### 1.2 Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```
OR
```json
{
  "phone": "+1234567890",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### 1.3 Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```
OR
```json
{
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset code sent to your email/phone"
}
```

### 1.4 Verify Reset Code
**POST** `/api/auth/verify-reset-code`

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "resetToken": "reset_token_here"
  }
}
```

### 1.5 Reset Password
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "resetToken": "reset_token_here",
  "newPassword": "NewSecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### 1.6 Refresh Token
**POST** `/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_here"
  }
}
```

### 1.7 Logout
**POST** `/api/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. User Profile

### 2.1 Get User Profile
**GET** `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "user@example.com",
    "phone": "+1234567890",
    "bio": "Fitness enthusiast",
    "birthdate": "1990-05-15",
    "gender": "Man" | "Woman" | "Rather not say",
    "role": "user" | "creator" | "vendor",
    "profileImage": "https://cdn.fitapp.com/profiles/user_123.jpg",
    "coverImage": "https://cdn.fitapp.com/covers/user_123.jpg",
    "socialLinks": {
      "tiktok": "@johndoe",
      "instagram": "@johndoe",
      "facebook": "johndoe",
      "snapchat": "johndoe"
    },
    "address": {
      "country": "Nigeria",
      "state": "Lagos",
      "city": "Lagos",
      "shopAddress": "123 Main St",
      "landmark": "Near Mall"
    },
    "bankDetails": {
      "accountType": "Savings",
      "bankName": "First Bank",
      "accountNumber": "1234567890",
      "accountName": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:22:00Z"
  }
}
```

### 2.2 Update User Profile
**PUT** `/api/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "birthdate": "1990-05-15",
  "gender": "Man",
  "profileImage": "base64_encoded_image_or_url",
  "coverImage": "base64_encoded_image_or_url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Updated bio",
    ...
  }
}
```

### 2.3 Update Social Links
**PUT** `/api/profile/social-links`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "tiktok": "@johndoe",
  "instagram": "@johndoe",
  "facebook": "johndoe",
  "snapchat": "johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "socialLinks": {
      "tiktok": "@johndoe",
      "instagram": "@johndoe",
      "facebook": "johndoe",
      "snapchat": "johndoe"
    }
  }
}
```

### 2.4 Update Address
**PUT** `/api/profile/address`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "country": "Nigeria",
  "state": "Lagos",
  "city": "Lagos",
  "shopAddress": "123 Main St",
  "landmark": "Near Mall"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": {
      "country": "Nigeria",
      "state": "Lagos",
      "city": "Lagos",
      "shopAddress": "123 Main St",
      "landmark": "Near Mall"
    }
  }
}
```

### 2.5 Update Bank Details (Creator/Vendor)
**PUT** `/api/profile/bank-details`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "accountType": "Savings",
  "bankName": "First Bank",
  "accountNumber": "1234567890",
  "accountName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bankDetails": {
      "accountType": "Savings",
      "bankName": "First Bank",
      "accountNumber": "1234567890",
      "accountName": "John Doe"
    }
  }
}
```

---

## 3. Onboarding

### 3.1 Get Activities List
**GET** `/api/activities`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "activity_1",
      "name": "Walk",
      "icon": "walk_icon_url"
    },
    {
      "id": "activity_2",
      "name": "Run",
      "icon": "run_icon_url"
    },
    {
      "id": "activity_3",
      "name": "Ride",
      "icon": "ride_icon_url"
    },
    {
      "id": "activity_4",
      "name": "Hike",
      "icon": "hike_icon_url"
    },
    {
      "id": "activity_5",
      "name": "Swim",
      "icon": "swim_icon_url"
    },
    {
      "id": "activity_6",
      "name": "Crossfit",
      "icon": "crossfit_icon_url"
    },
    {
      "id": "activity_7",
      "name": "Rock Climb",
      "icon": "rockclimb_icon_url"
    }
  ]
}
```

### 3.2 Save User Activities
**POST** `/api/profile/activities`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "activityIds": ["activity_1", "activity_2", "activity_3"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activities saved successfully"
}
```

---

## 4. Community & Posts

### 4.1 Get Community Feed
**GET** `/api/community/feed`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `tab`: `"Popular"` | `"My Post"` | `"Following"` | `"Challenges"` (default: "Popular")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "userId": "user_456",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "content": "Happy to be rated No1. on the World Top 100 Lifters. Thank you for your support!!",
        "image": "https://cdn.fitapp.com/posts/post_123.jpg",
        "video": null,
        "activityTag": "Challenges",
        "isSponsored": false,
        "isFollowing": false,
        "likesCount": 12,
        "commentsCount": 3,
        "isLiked": false,
        "isSaved": false,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### 4.2 Get Post Details
**GET** `/api/community/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "userId": "user_456",
    "userName": "John Doe",
    "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
    "content": "Post content here",
    "image": "https://cdn.fitapp.com/posts/post_123.jpg",
    "video": null,
    "activityTag": "Challenges",
    "isSponsored": false,
    "isFollowing": false,
    "likesCount": 12,
    "commentsCount": 3,
    "isLiked": false,
    "isSaved": false,
    "comments": [
      {
        "id": "comment_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "content": "Great post!",
        "createdAt": "2024-01-20T11:00:00Z"
      }
    ],
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 4.3 Create Post
**POST** `/api/community/posts`

**Headers:** `Authorization: Bearer <token>`

**Request Body (FormData for file upload):**
```json
{
  "content": "Post content text",
  "image": "base64_encoded_image_or_file",
  "video": "base64_encoded_video_or_file",
  "activityTag": "Challenges"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "userId": "user_456",
    "content": "Post content text",
    "image": "https://cdn.fitapp.com/posts/post_123.jpg",
    "activityTag": "Challenges",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 4.4 Like/Unlike Post
**POST** `/api/community/posts/:postId/like`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isLiked": true,
    "likesCount": 13
  }
}
```

### 4.5 Comment on Post
**POST** `/api/community/posts/:postId/comments`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is a comment"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "comment_1",
    "postId": "post_123",
    "userId": "user_456",
    "userName": "John Doe",
    "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
    "content": "This is a comment",
    "createdAt": "2024-01-20T11:00:00Z"
  }
}
```

### 4.6 Get Post Comments
**GET** `/api/community/posts/:postId/comments`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "comment_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "content": "Great post!",
        "createdAt": "2024-01-20T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 4.7 Share Post
**POST** `/api/community/posts/:postId/share`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "shareUrl": "https://fitapp.com/posts/post_123",
    "sharesCount": 5
  }
}
```

### 4.8 Follow/Unfollow User
**POST** `/api/community/users/:userId/follow`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user_456",
    "isFollowing": true,
    "followersCount": 1250
  }
}
```

---

## 5. Challenges

### 5.1 Get Challenges
**GET** `/api/challenges`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `tab`: `"Leaderboard"` | `"Challenges"` (default: "Challenges")
- `status`: `"ongoing"` | `"upcoming"` | `"completed"` (default: "ongoing")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "challenges": [
      {
        "id": "challenge_1",
        "title": "July Weekly Challenge",
        "description": "Run 15km this week",
        "targetDistance": 15.0,
        "currentDistance": 0.0,
        "unit": "km",
        "daysLeft": 4,
        "participantsCount": 20234,
        "icon": "flash_icon_url",
        "startDate": "2024-07-01T00:00:00Z",
        "endDate": "2024-07-07T23:59:59Z",
        "isJoined": false,
        "sponsor": {
          "name": "Jetter",
          "logo": "https://cdn.fitapp.com/sponsors/jetter.jpg",
          "reward": "1000 Lorem Coin"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  }
}
```

### 5.2 Get Challenge Details
**GET** `/api/challenges/:challengeId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "challenge_1",
    "title": "July Weekly Challenge",
    "description": "Run 15km this week",
    "targetDistance": 15.0,
    "currentDistance": 5.2,
    "unit": "km",
    "daysLeft": 4,
    "participantsCount": 20234,
    "icon": "flash_icon_url",
    "startDate": "2024-07-01T00:00:00Z",
    "endDate": "2024-07-07T23:59:59Z",
    "isJoined": true,
    "sponsor": {
      "name": "Jetter",
      "logo": "https://cdn.fitapp.com/sponsors/jetter.jpg",
      "reward": "1000 Lorem Coin"
    },
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_123",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_123.jpg",
        "distance": 14.8,
        "unit": "km"
      }
    ]
  }
}
```

### 5.3 Join Challenge
**POST** `/api/challenges/:challengeId/join`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "challengeId": "challenge_1",
    "isJoined": true,
    "message": "Successfully joined challenge"
  }
}
```

### 5.4 Get Challenge Leaderboard
**GET** `/api/challenges/:challengeId/leaderboard`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_123",
        "userName": "John Doe",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_123.jpg",
        "distance": 14.8,
        "unit": "km"
      },
      {
        "rank": 2,
        "userId": "user_456",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "distance": 14.5,
        "unit": "km"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 20234,
      "totalPages": 405
    }
  }
}
```

---

## 6. Products & Shop

### 6.1 Get Products
**GET** `/api/products`

**Query Parameters:**
- `category`: `"GEARS"` | `"SUPPLEMENTS"` | `"PLANS"` (optional)
- `vendorId`: string (optional, for vendor-specific products)
- `search`: string (optional, search query)
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `sortBy`: `"price_asc"` | `"price_desc"` | `"newest"` | `"popular"` (default: "newest")

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_123",
        "vendorId": "vendor_456",
        "vendorName": "Fitness Store",
        "name": "Premium Protein Powder",
        "description": "High-quality protein powder for muscle recovery",
        "price": "₦15,000",
        "discount": "₦2,000",
        "finalPrice": "₦13,000",
        "category": "SUPPLEMENTS",
        "images": [
          "https://cdn.fitapp.com/products/product_123_1.jpg"
        ],
        "availableSizes": ["500g", "1kg", "2kg"],
        "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
        "stock": 50,
        "rating": 4.5,
        "reviewsCount": 120,
        "isSaved": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 500,
      "totalPages": 25
    }
  }
}
```

### 6.2 Get Product Details
**GET** `/api/products/:productId`

**Headers:** `Authorization: Bearer <token>` (optional, for saved status)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    "vendorId": "vendor_456",
    "vendorName": "Fitness Store",
    "vendorAvatar": "https://cdn.fitapp.com/vendors/vendor_456.jpg",
    "name": "Premium Protein Powder",
    "description": "High-quality protein powder for muscle recovery. Contains 25g of protein per serving.",
    "price": "₦15,000",
    "discount": "₦2,000",
    "finalPrice": "₦13,000",
    "category": "SUPPLEMENTS",
    "images": [
      "https://cdn.fitapp.com/products/product_123_1.jpg",
      "https://cdn.fitapp.com/products/product_123_2.jpg"
    ],
    "availableSizes": ["500g", "1kg", "2kg"],
    "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
    "stock": 50,
    "rating": 4.5,
    "reviewsCount": 120,
    "isSaved": false,
    "specifications": {
      "protein": "25g per serving",
      "calories": "120 per serving",
      "flavors": "3"
    },
    "reviews": [
      {
        "id": "review_1",
        "userId": "user_789",
        "userName": "Jane Smith",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_789.jpg",
        "rating": 5,
        "comment": "Great product!",
        "createdAt": "2024-01-18T14:30:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### 6.3 Create Product (Vendor)
**POST** `/api/vendor/products`

**Headers:** `Authorization: Bearer <token>`

**Request Body (FormData for images):**
```json
{
  "name": "Premium Protein Powder",
  "description": "High-quality protein powder",
  "price": "15000",
  "discount": "2000",
  "category": "SUPPLEMENTS",
  "images": ["base64_encoded_image_1", "base64_encoded_image_2"],
  "availableSizes": ["500g", "1kg", "2kg"],
  "availableColors": ["Chocolate", "Vanilla", "Strawberry"],
  "stock": 50,
  "shippingDetails": {
    "weight": "1kg",
    "dimensions": "20x15x10cm",
    "shippingCost": "₦500"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    "name": "Premium Protein Powder",
    ...
  }
}
```

### 6.4 Update Product (Vendor)
**PUT** `/api/vendor/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as Create Product)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "product_123",
    ...
  }
}
```

### 6.5 Delete Product (Vendor)
**DELETE** `/api/vendor/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 6.6 Get Vendor Products
**GET** `/api/vendor/products`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: `"GEARS"` | `"SUPPLEMENTS"` | `"PLANS"` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {...}
  }
}
```

---

## 7. Shopping Cart

### 7.1 Get Cart
**GET** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_item_1",
        "productId": "product_123",
        "name": "Premium Protein Powder",
        "price": "₦13,000",
        "discount": "₦2,000",
        "size": "1kg",
        "color": "Chocolate",
        "quantity": 2,
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg",
        "availableSizes": ["500g", "1kg", "2kg"],
        "availableColors": ["Chocolate", "Vanilla", "Strawberry"]
      }
    ],
    "subtotal": "₦26,000",
    "shipping": "₦500",
    "total": "₦26,500"
  }
}
```

### 7.2 Add to Cart
**POST** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "productId": "product_123",
  "size": "1kg",
  "color": "Chocolate",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_1",
    "productId": "product_123",
    "quantity": 2,
    ...
  }
}
```

### 7.3 Update Cart Item
**PUT** `/api/cart/:cartItemId`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "quantity": 3,
  "size": "2kg",
  "color": "Vanilla"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cart_item_1",
    "quantity": 3,
    ...
  }
}
```

### 7.4 Remove from Cart
**DELETE** `/api/cart/:cartItemId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 7.5 Clear Cart
**DELETE** `/api/cart`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 8. Orders

### 8.1 Create Order
**POST** `/api/orders`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_123",
      "quantity": 2,
      "size": "1kg",
      "color": "Chocolate",
      "price": "₦13,000"
    }
  ],
  "shippingAddress": {
    "country": "Nigeria",
    "state": "Lagos",
    "city": "Lagos",
    "address": "123 Main St",
    "landmark": "Near Mall"
  },
  "paymentMethodId": "payment_method_123",
  "shippingCost": "₦500"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "pending",
    "total": "₦26,500",
    "items": [...],
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

### 8.2 Get User Orders
**GET** `/api/orders`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: `"pending"` | `"processing"` | `"shipped"` | `"delivered"` | `"cancelled"` (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "status": "delivered",
        "total": "₦26,500",
        "itemsCount": 2,
        "createdAt": "2024-01-20T10:30:00Z",
        "deliveredAt": "2024-01-22T14:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 8.3 Get Order Details
**GET** `/api/orders/:orderId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "delivered",
    "total": "₦26,500",
    "subtotal": "₦26,000",
    "shipping": "₦500",
    "items": [
      {
        "productId": "product_123",
        "name": "Premium Protein Powder",
        "quantity": 2,
        "size": "1kg",
        "color": "Chocolate",
        "price": "₦13,000",
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg"
      }
    ],
    "shippingAddress": {...},
    "paymentMethod": {...},
    "createdAt": "2024-01-20T10:30:00Z",
    "deliveredAt": "2024-01-22T14:30:00Z"
  }
}
```

### 8.4 Get Vendor Orders
**GET** `/api/vendor/orders`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status`: string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "customerName": "John Doe",
        "status": "pending",
        "total": "₦26,500",
        "itemsCount": 2,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 8.5 Update Order Status (Vendor)
**PUT** `/api/vendor/orders/:orderId/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "shipped",
  "trackingNumber": "TRACK123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_123",
    "status": "shipped",
    "trackingNumber": "TRACK123456"
  }
}
```

---

## 9. Saved Items

### 9.1 Get Saved Posts
**GET** `/api/saved/posts`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "title": "Daily Exercise",
        "activityTag": "Challenges",
        "isSponsored": false,
        "image": "https://cdn.fitapp.com/posts/post_123.jpg",
        "savedAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 9.2 Save Post
**POST** `/api/saved/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isSaved": true
  }
}
```

### 9.3 Unsave Post
**DELETE** `/api/saved/posts/:postId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_123",
    "isSaved": false
  }
}
```

### 9.4 Get Saved Products
**GET** `/api/saved/products`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "product_123",
        "name": "Premium Protein Powder",
        "price": "₦13,000",
        "image": "https://cdn.fitapp.com/products/product_123_1.jpg",
        "savedAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 9.5 Save Product
**POST** `/api/saved/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "product_123",
    "isSaved": true
  }
}
```

### 9.6 Unsave Product
**DELETE** `/api/saved/products/:productId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "product_123",
    "isSaved": false
  }
}
```

---

## 10. Payment Methods

### 10.1 Get Payment Methods
**GET** `/api/payment-methods`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "payment_method_123",
        "type": "card",
        "cardNumber": "**** **** **** 1234",
        "cardHolder": "John Doe",
        "expiryMonth": 12,
        "expiryYear": 2025,
        "isDefault": true
      },
      {
        "id": "payment_method_456",
        "type": "bank_transfer",
        "bankName": "First Bank",
        "accountNumber": "****7890",
        "accountName": "John Doe",
        "isDefault": false
      }
    ]
  }
}
```

### 10.2 Add Payment Method
**POST** `/api/payment-methods`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "card",
  "cardNumber": "1234567890123456",
  "cardHolder": "John Doe",
  "expiryMonth": 12,
  "expiryYear": 2025,
  "cvv": "123",
  "isDefault": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payment_method_123",
    "type": "card",
    "cardNumber": "**** **** **** 3456",
    "cardHolder": "John Doe",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "isDefault": false
  }
}
```

### 10.3 Delete Payment Method
**DELETE** `/api/payment-methods/:paymentMethodId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Payment method deleted"
}
```

### 10.4 Set Default Payment Method
**PUT** `/api/payment-methods/:paymentMethodId/default`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payment_method_123",
    "isDefault": true
  }
}
```

---

## 11. Notifications

### 11.1 Get Notifications
**GET** `/api/notifications`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)
- `unreadOnly`: boolean (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notification_123",
        "type": "like",
        "title": "John Doe liked your post",
        "message": "John Doe liked your post about fitness",
        "userId": "user_456",
        "userAvatar": "https://cdn.fitapp.com/avatars/user_456.jpg",
        "relatedId": "post_123",
        "relatedType": "post",
        "isRead": false,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "unreadCount": 5,
    "pagination": {...}
  }
}
```

### 11.2 Mark Notification as Read
**PUT** `/api/notifications/:notificationId/read`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "notification_123",
    "isRead": true
  }
}
```

### 11.3 Mark All Notifications as Read
**PUT** `/api/notifications/read-all`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 12. Search

### 12.1 Search
**GET** `/api/search`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `q`: string (search query)
- `type`: `"all"` | `"posts"` | `"products"` | `"users"` (default: "all")
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "products": [...],
    "users": [...],
    "pagination": {...}
  }
}
```

### 12.2 Get Search History
**GET** `/api/search/history`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "history": [
      "protein powder",
      "running shoes",
      "fitness challenge"
    ]
  }
}
```

### 12.3 Clear Search History
**DELETE** `/api/search/history`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Search history cleared"
}
```

---

## 13. Creator Dashboard & Analytics

### 13.1 Get Creator Dashboard
**GET** `/api/creator/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "id": "views",
        "title": "Total Video views",
        "value": "125,430",
        "icon": "eye_icon"
      },
      {
        "id": "earnings",
        "title": "Amount Accepted here",
        "value": "₦45,000",
        "icon": "money_icon"
      }
    ],
    "recentVideos": [...],
    "earningsChart": {
      "labels": ["Jan", "Feb", "Mar", "Apr"],
      "data": [10000, 15000, 12000, 18000]
    }
  }
}
```

### 13.2 Get Creator Videos
**GET** `/api/creator/videos`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "video_123",
        "title": "Morning Workout Routine",
        "thumbnail": "https://cdn.fitapp.com/videos/video_123_thumb.jpg",
        "views": 1250,
        "likes": 45,
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 13.3 Get Creator Earnings
**GET** `/api/creator/earnings`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": "₦125,000",
    "pendingEarnings": "₦25,000",
    "paidEarnings": "₦100,000",
    "transactions": [
      {
        "id": "transaction_123",
        "amount": "₦15,000",
        "type": "video_views",
        "status": "paid",
        "createdAt": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 13.4 Request Payout (Creator)
**POST** `/api/creator/payouts/request`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": "25000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payout_123",
    "amount": "₦25,000",
    "status": "pending",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

---

## 14. Vendor Dashboard & Analytics

### 14.1 Get Vendor Dashboard
**GET** `/api/vendor/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalSales": "₦500,000",
      "totalOrders": 125,
      "pendingOrders": 5,
      "totalProducts": 45
    },
    "recentOrders": [...],
    "salesChart": {
      "labels": ["Jan", "Feb", "Mar", "Apr"],
      "data": [100000, 150000, 120000, 180000]
    }
  }
}
```

### 14.2 Get Vendor Earnings
**GET** `/api/vendor/earnings`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date, optional)
- `endDate`: string (ISO date, optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": "₦500,000",
    "pendingEarnings": "₦50,000",
    "paidEarnings": "₦450,000",
    "transactions": [...],
    "pagination": {...}
  }
}
```

### 14.3 Request Payout (Vendor)
**POST** `/api/vendor/payouts/request`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": "50000"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "payout_123",
    "amount": "₦50,000",
    "status": "pending",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

---

## 15. Workouts

### 15.1 Get Workouts
**GET** `/api/workouts`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `category`: string (optional)
- `page`: number (default: 1)
- `limit`: number (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "workouts": [
      {
        "id": "workout_123",
        "title": "Morning Cardio",
        "description": "30-minute cardio workout",
        "duration": 30,
        "difficulty": "beginner",
        "category": "Cardio",
        "thumbnail": "https://cdn.fitapp.com/workouts/workout_123.jpg",
        "video": "https://cdn.fitapp.com/workouts/workout_123.mp4",
        "isSaved": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### 15.2 Get Workout Details
**GET** `/api/workouts/:workoutId`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "workout_123",
    "title": "Morning Cardio",
    "description": "30-minute cardio workout",
    "duration": 30,
    "difficulty": "beginner",
    "category": "Cardio",
    "thumbnail": "https://cdn.fitapp.com/workouts/workout_123.jpg",
    "video": "https://cdn.fitapp.com/workouts/workout_123.mp4",
    "exercises": [
      {
        "name": "Jumping Jacks",
        "duration": 60,
        "reps": null
      }
    ],
    "isSaved": false
  }
}
```

### 15.3 Save Workout
**POST** `/api/workouts/:workoutId/save`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "workoutId": "workout_123",
    "isSaved": true
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Notes for Backend Developer

1. **Pagination**: All list endpoints should support pagination with `page` and `limit` query parameters. Default `limit` is 20.

2. **File Uploads**: For image/video uploads, use `multipart/form-data` with FormData. Accept base64 strings or file uploads.

3. **Authentication**: All endpoints except signup, login, and forgot password require Bearer token authentication.

4. **Role-Based Access**: 
   - Creator endpoints (`/api/creator/*`) should only be accessible to users with `role: "creator"`
   - Vendor endpoints (`/api/vendor/*`) should only be accessible to users with `role: "vendor"`
   - User endpoints are accessible to all authenticated users

5. **Currency**: All prices are in Nigerian Naira (₦). Store prices as strings to preserve formatting.

6. **Date Format**: Use ISO 8601 format for all dates (e.g., `2024-01-20T10:30:00Z`).

7. **Image URLs**: Return full CDN URLs for all images. Support multiple image sizes if needed.

8. **Real-time Updates**: Consider implementing WebSocket or Server-Sent Events for:
   - Real-time notifications
   - Live challenge leaderboard updates
   - Order status updates

9. **Rate Limiting**: Implement rate limiting for:
   - Authentication endpoints
   - Post creation
   - Search endpoints

10. **Caching**: Consider caching for:
    - Product listings
    - Activity lists
    - Challenge lists

