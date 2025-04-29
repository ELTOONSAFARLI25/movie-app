import * as yup from "yup";
export const RegisterFromSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ad giriniz")
    .min(2, "Minimum 2 karakter olmalı")
    .max(50, "50 karakterden kısa isim giriniz")
    .matches(/^[A-Za-zÇŞĞÜİÖçşğüıö' -]+$/, "İsim sadece harf içerebilir."),
  surname: yup
    .string()
    .required("Soyad giriniz")
    .min(2, "Minimum 2 karakter olmalı")
    .max(50, "50 karakterden kısa isim giriniz")
    .matches(/^[A-Za-zÇŞĞÜİÖçşğüıö' -]+$/, "İsim sadece harf içerebilir."),
  email: yup
    .string()
    .required("Email adresi zorunlu")
    .email("Geçerli email adresi giriniz"),
  password: yup
    .string()
    .required("Şifre giriniz")
    .min(8, "Şifre en az 8 karakter içermelidir.")
    .matches(/[0-9]/, "Şifre en az bir rakam içermelidir."),
  confirmPassword: yup
    .string()
    .required("Şifreyi tekrar giriniz")
    .oneOf(
      [yup.ref("password", yup.password)],
      "Şifre tekrarını doğru giriniz"
    ),
  term: yup.boolean().required("Lütfen kutucuğu onaylayınız"),
});
