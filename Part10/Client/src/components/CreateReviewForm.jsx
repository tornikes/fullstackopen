import { Formik } from "formik";
import { FormContainer } from "./formComponents/FormContainer";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import FormButton from "./formComponents/FormButton";

function CreateReview() {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  async function submitReview(review) {
    try {
      const repositoryId = await createReview({
        ...review,
        rating: parseInt(review.rating),
      });
      navigate(`/${repositoryId}`);
    } catch (err) {
      console.log(err);
    }
  }

  return <CreateReviewForm formSubmissionHandler={submitReview} />;
}

function CreateReviewForm({ formSubmissionHandler }) {
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
      .number()
      .integer("Rating must be an integer from 0 to 100")
      .min(0)
      .max(100)
      .required("Rating is required"),
    text: yup.string(),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{
          ownerName: "",
          repositoryName: "",
          rating: 0,
          text: "",
        }}
        onSubmit={formSubmissionHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput name="ownerName" placeholder="Owner Name" />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository Name"
            />
            <FormikTextInput
              inputMode="numeric"
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput multiline name="text" placeholder="Review" />
            <FormButton label="Create a review" handlePress={handleSubmit} />
          </View>
        )}
      </Formik>
    </FormContainer>
  );
}

export default CreateReview;
