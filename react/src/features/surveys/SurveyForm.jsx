import React, { useEffect, useState } from "react";
import { Checkbox } from "../../components/Checkbox";
import { PageWrapper } from "../../components/PageWrapper";
import { Textarea } from "../../components/Textarea";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Alert } from "../../components/Alert";
import axiosClient from "../../axios.js";
import SurveyQuestions from "./SurveyQuestions";
import { useNavigate, useParams } from "react-router-dom";
import { Notify, Confirm } from "notiflix";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";

const SurveyForm = () => {
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    description: "",
    status: false,
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const handleImageChoose = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      });

      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...survey };

    if (payload.image) {
      payload.image = payload.image_url;
    }

    delete payload.image_url;

    let result = null;

    if (id) {
      // update survey
      result = axiosClient.put(`/surveys/${id}`, payload);
    } else {
      // store survey
      result = axiosClient.post("/surveys", payload);
    }

    result
      .then((response) => {
        navigate("/surveys");
        if (response.config.method === "put") {
          Notify.success("Survey Updated!");
        } else if (response.config.method === "post") {
          Notify.success("Survey Created!");
        }
      })
      .catch((error) => {
        if (error && error.response) {
          const errors = Object.values(error.response.data.errors).reduce(
            (previous, current) => [...previous, ...current],
            []
          );
          setErrors(errors);
        }
        console.error(error.message);
      });
  };

  const onQuestionsUpdate = (questions) => {
    setSurvey({ ...survey, questions });
  };

  const deleteSurvey = (id) => {
    Confirm.show(
      "Delete", 
      "Do you want to delete this survey?", 
      "Yes", 
      "No",
      () => {
        axiosClient.delete(`/surveys/${id}`).then(() => {
          Notify.success('Survey Deleted!');
          navigate(-1);
        })
      }
      );
  };

  useEffect(() => {
    if (id) {
      axiosClient.get(`/surveys/${id}`).then((res) => {
        setSurvey(res.data.data);
      });
    }
  }, []);

  return (
    <PageWrapper
      title={id ? "Update Survey" : "Create New Survey"}
      buttons={
        <div className="space-x-3">
          <a target="_blank" href={`/survey/public/${survey.slug}`}>
            <Button color="green">
              <LinkIcon className="w-5 mr-2" />
              Public Link
            </Button>
          </a>
          <Button color="red" onClick={() => deleteSurvey(id)}>
            <TrashIcon className="w-5 mr-2" />
            Delete
          </Button>
        </div>
      }
    >
      <div className="md:grid md:grid-cols md:gap-6">
        <div className="mt-5 md:mt-0">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {errors.length > 0 && <Alert errors={errors} />}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center">
                    {survey.image_url ? (
                      <img
                        src={survey.image_url}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <span className="inline-block h-12 w-12 p-1 overflow-hidden rounded-full bg-gray-100">
                        <PhotoIcon className="h-full w-full text-gray-300" />
                      </span>
                    )}
                    <button
                      type="button"
                      className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <input
                        type="file"
                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                        onChange={handleImageChoose}
                      />
                      Browse Survey Image
                    </button>
                  </div>
                </div>

                <div>
                  <TextInput
                    label="Title"
                    id="title"
                    placeholder="Enter survey title"
                    value={survey.title}
                    onChange={(e) =>
                      setSurvey({ ...survey, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Textarea
                    label="Description"
                    placeholder="Enter survey description"
                    value={survey.description}
                    onChange={(e) =>
                      setSurvey({ ...survey, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <TextInput
                    type="date"
                    label="Expire Date"
                    id="expire_date"
                    value={survey.expire_date}
                    onChange={(e) =>
                      setSurvey({ ...survey, expire_date: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Checkbox
                    label="Active"
                    hint="Whether to make survey publicly available"
                    name="status"
                    id="status"
                    checked={survey.status}
                    onChange={(e) =>
                      setSurvey({ ...survey, status: e.target.checked })
                    }
                  />
                </div>
                <SurveyQuestions
                  onQuestionsUpdate={onQuestionsUpdate}
                  questions={survey.questions}
                />
                <div className="flex justify-end">
                  <Button type="submit" color="indigo">
                    {id ? "Update Survey" : "Create Survey"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SurveyForm;
