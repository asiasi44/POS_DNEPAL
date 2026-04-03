"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CrudConfig } from "@/lib/clientSchema/crud/schema";
import { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const GenericForm = <TForm extends FieldValues, TRow>({
  config,
  editData,
  isEditMode,
}: {
  config: CrudConfig<TForm, TRow>;
  editData: TForm | null;
  isEditMode: boolean;
}) => {
  const form = useForm<TForm>({
    resolver: zodResolver(config.schema.create),
    defaultValues: config.defaultValues,
  });
  const updateMutation = config.hooks.useUpdate();
  const createMutation = config.hooks.useCreate();

  useEffect(() => {
    if (editData) {
      form.reset(editData);
    } else {
      form.reset(config.defaultValues);
    }
  }, [editData]);

  const onSubmit = (data: TForm) => {
    console.log(`Submitted ${config.entityName}:`, data);
    if (isEditMode) {
      updateMutation.mutate({ id: data?.id, data });
    } else {
      createMutation.mutate({ body: data });
    }
  };

  const FormView = config.FormView;

  return (
    <form id={config.formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FormView form={form} />
      <div className="flex gap-2 mt-4">
        <Button
          variant="secondary"
          type="button"
          onClick={() => form.reset(config.defaultValues)}
        >
          Reset
        </Button>
        <Button type="submit">{isEditMode ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
};

export default GenericForm;
  