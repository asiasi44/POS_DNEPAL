import { CrudConfig } from "@/lib/clientSchema/crud/schema";
import FormDialog from "@/components/crud/form/FormDialog";
import { FieldValues } from "react-hook-form";
import { GenericTableSection } from "@/components/crud/table/GenericTableSection";
import { useState } from "react";

// GenericCrudPage
const GenericCrudPage = <TForm extends FieldValues, TRow>({
  config,
}: {
  config: CrudConfig<TForm, TRow>;
}) => {
  const [editData, setEditData] = useState<TForm | null>(null);
  return (
    <div className="py-8 px-12 flex flex-col gap-12 w-full min-w-0 overflow-hidden">
      <div className="flex justify-between">
        <div className="text-3xl font-bold">{config.entityNamePlural}</div>
        <FormDialog
          config={config}
          editData={editData}
          setEditData={setEditData}
        />
      </div>
      <GenericTableSection config={config} setEditData={setEditData} />
    </div>
  );
};

export default GenericCrudPage;
