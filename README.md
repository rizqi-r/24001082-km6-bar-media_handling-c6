# Media Handling

## Usage

### Main Endpoint

```
https://km6-media-handling-rfn-production.up.railway.app
```

### Auth Endpoint

##### Sebelum menggunakan media handling, daftarkan email pada endpoint auth untuk mendapatkan token jwt

1. Register dengan body json name, email, password

```http
# Register Auth
POST https://km6-media-handling-rfn-production.up.railway.app/api/v1/register
Content-Type: application/json

{
    "name": "lorem",
    "email": "loremipsum@dolorsit.amet",
    "password": "loremipsum"
}
```

2. Login menggunakan email dan password untuk mendapatkan token jwt

```http
# Login Auth
POST https://km6-media-handling-rfn-production.up.railway.app/api/v1/login
Content-Type: application/json

{
    "email": "loremipsum@dolorsit.amet",
    "password": "loremipsum"
}
```

3. Validasi token yang telah didapat

```http
# Who Am I Auth
GET https://km6-media-handling-rfn-production.up.railway.app/api/v1/whoami
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
```

### Media Endpoint

##### Gunakan token jwt pada header `Authorization` untuk mengakses dan menggunakan endpoint media.

1. Mendapatkan Semua foto

```http
# Get All Photo
GET https://km6-media-handling-rfn-production.up.railway.app/api/v1/users/photo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
```

2. Mendapatkan foto melalui id foto

```http
# Get Photo
GET https://km6-media-handling-rfn-production.up.railway.app/api/v1/users/photo/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
```

3. Upload foto ke database (disarankan menggunakan REST client insomnia atau postman!)

```http
# Upload Photo [Use Insomnia REST Client!]
POST https://km6-media-handling-rfn-production.up.railway.app/api/v1/users/photo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="sample.png"
Content-Type: image/png

< ./sample.png
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

wallpaper windows 7 baru saya
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

ini wallpaper windows saya
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

4. Update foto melalui id foto (disarankan menggunakan REST client insomnia atau postman!)

```http
# Update Photo [Use Insomnia REST Client!]
PUT https://km6-media-handling-rfn-production.up.railway.app/api/v1/users/photo/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="sample.png"
Content-Type: image/png

< ./sample.png
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

ubah title
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="description"

ubah description
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

5. Hapus foto melalui id foto

```http
# Delete Photo
DELETE https://km6-media-handling-rfn-production.up.railway.app/api/v1/users/photo/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImxvcmVtIiwiZW1haWwiOiJsb3JlbWlwc3VtQGRvbG9yc2l0LmFtZXQiLCJpYXQiOjE3MTQ2ODc4MzB9.Dq2jqZCB9TFZl0zmJjRYmJZ0gfzCAddklWhRGSsg3WI
```
