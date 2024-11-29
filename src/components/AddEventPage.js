import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const AddEventPage = ({ addEvent }) => {
  // Define form validation schema with Yup
  // https://www.youtube.com/watch?v=7Ophfq0lEAY&ab_channel=NikitaDev
  const validationSchema = Yup.object({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    sport: Yup.string().required('Sport is required'),
    homeTeam: Yup.string().required('Home Team is required'),
    awayTeam: Yup.string().required('Away Team is required'),
  });

  // Use Formik for form handling
  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      sport: '',
      homeTeam: '',
      awayTeam: '',
    },
    // Validation according to validationSchema
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addEvent(values);

      // Reset the form after submission
      formik.resetForm();
    },
  });

  // For the mapping
  const formFields = [
    {
      name: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      name: 'time',
      type: 'time',
      label: 'Time',
    },

    {
      name: 'sport',
      type: 'text',
      label: 'Sport',
    },
    {
      name: 'homeTeam',
      type: 'text',
      label: 'Home Team',
    },
    {
      name: 'awayTeam',
      type: 'text',
      label: 'Away Team',
    },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add New Event</h1>
      <form onSubmit={formik.handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className={`form-control ${
                formik.touched[field.name] && formik.errors[field.name]
                  ? 'is-invalid'
                  : ''
              }`}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="invalid-feedback">
                {formik.errors[field.name]}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-sm btn-dark">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
