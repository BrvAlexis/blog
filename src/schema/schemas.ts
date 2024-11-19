import * as yup from "yup";

export const articleSchema = yup.object({
  title: yup.string().required("Le titre est requis"),
  description: yup.string().required("La description est requise"),
  category: yup.string().required("La catégorie est requise"),
});
