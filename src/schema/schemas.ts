import * as Yup from "yup";

export const articleSchema = Yup.object().shape({
  title: Yup.string().trim().required("Titre est requis"),
  description: Yup.string().trim().required("Description est requise"),
  category: Yup.string().trim().required("Catégorie est requise"),
  image: Yup.string().trim().url("L'image doit être une URL valide"),
});
