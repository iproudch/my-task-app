import * as yup from "yup";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ObjectSchema } from "yup";
import React, { useCallback, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

type AddTaskFormProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  formRef: React.RefObject<HTMLFormElement>;
};

export default function AddTaskFormProvider(
  props: AddTaskFormProviderProps
): JSX.Element | null {
  const { children, formRef } = props;

  const defaultValues: IAddTaskForm = useMemo(
    () => ({
      task: "",
      start: "",
    }),
    []
  );

  const resolver = useMemo(
    () => yupResolver(AddReleaseTagSchema, { abortEarly: false }),
    []
  );

  const formMethods = useForm<IAddTaskForm>({
    criteriaMode: "all",
    defaultValues,
    mode: "onSubmit",
    resolver,
  });

  const { reset, handleSubmit } = formMethods;

  const onReset = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<IAddTaskForm> = async (data) => {
    // const { email, password } = data;
    // try {
    //   clearContextError();
    // } catch (e) {
    //   handleError(e);
    // }
  };

  const onError: SubmitErrorHandler<IAddTaskForm> = (errors) => {
    console.error("IAttachmentsCreditNoteForm:onError", errors);
  };

  useEffect(() => {
    reset(defaultValues, { keepDirty: true });
  }, [defaultValues, reset]);

  return (
    <FormProvider {...formMethods}>
      <form
        ref={formRef}
        id={"add-task-form"}
        onReset={onReset}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export interface IAddTaskForm {
  task: string;
  start: string;
}

export const AddReleaseTagSchema = yup.object().shape({
  task: yup.string().required(),
  start: yup.string().required(),
});
