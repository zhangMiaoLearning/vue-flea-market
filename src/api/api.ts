import { request } from './http'

export const getEmailCaptcha = (email: string, type: string) => {
  return request
    .post('/userapi/user-service/verification', {
      email: email,
      type: type
    })
    .then((res: any) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

export const register = (username: string, password: string, email: string, code: string) => {
  return request
    .post('/userapi/user-service/users/register', {
      username: username,
      password: password,
      email: email,
      code: code
    })
    .then((res: any) => {
      return res
    })
    .catch((err) => {
      return err
    })
}

export const login = (username: string, password: string) => {
  return request
    .post('/userapi/user-service/users/login', {
      username: username,
      password: password
    })
    .then((res: any) => res)
    .catch((err) => err)
}

export const uploadPictures = (file: any) => {
  return request
    .post(
      'productapi/product-service/images',
      {
        images: file
      },
      {
        headers: { contentType: 'multipart/form-data' }
      }
    )
    .then((res: any) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
export const uploadGoods = (title: string,description:string, price: number, type: string, imagesId: number[]) => {
  return request
    .post('productapi/product-service/products/publish', {
      title: title,
      price: price,
      type: type,
      imagesId: imagesId
    })
    .then((res: any) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}
