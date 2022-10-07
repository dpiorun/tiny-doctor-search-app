import { Field, Formik, Form as FormikForm } from "formik";
import { backend } from "../services/backend";
import { useState } from "react";
import { Doctor } from "../backendTypes";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const inputFields = [
  {
    id: "city",
    label: "City",
    placeholder: "Enter city",
  },
  {
    id: "facility",
    label: "Facility",
    placeholder: "Enter facility",
  },
  {
    id: "expertise",
    label: "Field of expertise",
    placeholder: "Enter field of expertise",
  },
];

interface FormValues {
  city: string;
  facility: string;
  expertise: string;
}

const initialValues: FormValues = {
  city: "",
  facility: "",
  expertise: "",
};

const parseSearchParams = (values: FormValues) => {
  const search = Object.values(values)
    .filter((value) => !!value)
    .join(",");
  if (!search) return;
  const searchParams = new URLSearchParams();
  searchParams.set("search", search);
  return searchParams;
};

const SearchForm = () => {
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setIsFetching(true);
    const params = parseSearchParams(values);
    try {
      const { results } = await backend.getDoctors(params);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
      setIsSearchPerformed(true);
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <Card className="p-4 mb-3">
        <Row>
          <Col>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {() => (
                <FormikForm>
                  {inputFields.map(({ id, label, placeholder }) => (
                    <Form.Group as={Row} className="mb-3" key={id}>
                      <Form.Label htmlFor={id}>{label}</Form.Label>
                      <Col>
                        <Field
                          as={Form.Control}
                          type="text"
                          placeholder={placeholder}
                          id={id}
                          name={id}
                        />
                      </Col>
                    </Form.Group>
                  ))}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isFetching}
                  >
                    Search
                  </Button>
                </FormikForm>
              )}
            </Formik>
            <Form></Form>
          </Col>
        </Row>
      </Card>
      {searchResults.length > 0 && (
        <Card>
          <Card.Header>Results:</Card.Header>
          <Card.Body>
            {searchResults.map((result) => (
              <Card className="m-4" key={result.id}>
                <Card.Header>
                  {result.firstName} {result.lastName}
                </Card.Header>
                <Card.Body>
                  <ul>
                    <li>email: {result.email}</li>
                    <li>city: {result.city}</li>
                    <li>facility: {result.facility}</li>
                    <li>field of expertise: {result.areaOfExpertise}</li>
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      )}
      {isSearchPerformed && searchResults.length === 0 && (
        <Card>
          <Card.Body>No results found...</Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SearchForm;
